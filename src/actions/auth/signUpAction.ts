"use server";

import prisma from "@/lib/prisma";
import { FormActionState } from "@/types";
import signUpSchema from "@/schemas/auth/signup.schema";

const signUpAction = async (prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const fieldData = Object.fromEntries(formData);
  const validatedData = signUpSchema.safeParse(fieldData);

  // If data is not valid
  if (!validatedData.success) {
    return {
      state: "error",
      message: "Incorrect form data",
      errors: validatedData.error.flatten().fieldErrors,
      payload: formData
    };
  }

  // Try to create the user
  try {
    await prisma.user.create({
      data: {
        email: validatedData.data.email,
        role: validatedData.data.role,
        name: validatedData.data.name,
        surname: validatedData.data.surname
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

  // Try to create credentials
  try {
    await prisma.credentials.create({
      data: {
        user: validatedData.data.email,
        password: validatedData.data.password
      }
    });
  } catch (e: any) {
    return {
      state: "error",
      message: "Credentials can`t be created",
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
