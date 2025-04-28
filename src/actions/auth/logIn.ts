"use server";

import prisma from "@/lib/prisma";
import logInSchema from "@/schemas/auth/login.schema";

const logIn = async (prevState: any, formData: FormData): Promise<unknown> => {
  const fieldData = Object.fromEntries(formData);
  const validatedData = logInSchema.safeParse(fieldData);

  // Si los datos no son validos devolvemos los errores
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors
    };
  }

  // Intentamos crear el mensaje en la base de datos
  const user = await prisma.credenciales.findUnique({
    where: {
      correoUsuario: validatedData.data.email
    }
  });

  // Si no existe el usuario
  if (!user) {
    return {
      message: "No existe ningún usuario con ese correo."
    };
  }

  // Si la contraseña no es correcta.
  if (user.password !== validatedData.data.password)
    return {
      message: "La contraseña no es correcta para este usuario."
    };

  return {
    message: "Usuario encontrado!!"
  };
};

export default logIn;
