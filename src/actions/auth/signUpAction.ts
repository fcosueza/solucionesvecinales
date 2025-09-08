"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { FormActionState } from "@/types";
import signUpSchema from "@/schemas/auth/signup.schema";

const signUpAction = async (prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const rawData = Object.fromEntries(formData);
  const validatedData = signUpSchema.safeParse(rawData);

  // If data is not valid
  if (!validatedData.success) {
    return {
      state: "error",
      message: "Incorrect form data",
      errors: validatedData.error.flatten().fieldErrors,
      payload: formData
    };
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(validatedData.data.password, saltRounds);

  // Try to create the user and credentials
  try {
    await prisma.user.create({
      data: {
        email: validatedData.data.email,
        role: validatedData.data.role,
        name: validatedData.data.name,
        surname: validatedData.data.surname,
        credentials: {
          create: {
            password: hashedPassword
          }
        }
      }
    });
  } catch (e: any) {
    return {
      state: "error",
      message: "User can't be created",
      errors: {
        prisma: e.message
      },
      payload: formData
    };
  }

  // User created correctly
  return {
    state: "success",
    message: "User created",
    payload: formData
  };
};

export default signUpAction;
