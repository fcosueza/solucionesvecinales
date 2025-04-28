"user server";

import prisma from "@/lib/prisma";
import logInSchema from "@/schemas/auth/login.schema";

const logIn = async (prevState: any, formData: FormData): Promise<unknown> => {
  const fieldData = Object.entries(formData);
  const validatedData = logInSchema.safeParse(fieldData);

  // Si los datos no son validos devolvemos los errores
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors
    };
  }

  // Intentamos crear el mensaje en la base de datos
  const res = await prisma.contacto.create({
    data: {
      nombre: validatedData.data.name,
      correo: validatedData.data.email,
      mensaje: validatedData.data.msg
    }
  });

  // Si no se puede crear un mensaje, revolvemos un error.
  if (!res) {
    throw new Error("No se ha podido crear el mensaje de contacto");
  }

  return {
    message: "Mensaje creado correctamente."
  };
};

export default logIn;
