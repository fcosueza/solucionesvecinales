import { z } from "zod";

const communitySchema = z.object({
  name: z
    .string({ message: "El nombre no es válido" })
    .min(2, { message: "El nombre debe tener más de 1 carácter." })
    .trim(),
  street: z
    .string({ message: "La calle no es válida" })
    .min(2, { message: "La calle debe tener más de 1 carácter." })
    .trim(),
  number: z.coerce.number().int({ message: "El número debe ser un entero" }).min(1, {
    message: "El número debe ser mayor que 0"
  }),
  city: z
    .string({ message: "La ciudad no es válida" })
    .min(2, { message: "La ciudad debe tener más de 1 carácter." })
    .trim(),
  province: z
    .string({ message: "La provincia no es válida" })
    .min(2, { message: "La provincia debe tener más de 1 carácter." })
    .trim(),
  country: z
    .string({ message: "El país no es válido" })
    .min(2, { message: "El país debe tener más de 1 carácter." })
    .trim()
});

export default communitySchema;
