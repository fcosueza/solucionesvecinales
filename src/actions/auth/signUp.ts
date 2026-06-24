"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import signUpSchema from "@/schemas/auth/signup.schema";
import { FormActionState } from "@/types";
import { SafeParseReturnType } from "zod";
import z from "zod";

type RecordFields = z.infer<typeof signUpSchema>;

// Doesn't include password and repeat fields in the payload to avoid sending sensitive information back to the client
const safePayload = (formData: FormData): FormData => {
  const safe = new FormData();

  for (const [key, value] of formData.entries()) {
    if (key === "password" || key === "repeat") continue;
    safe.append(key, value);
  }

  return safe;
};

const signUp = async (_prevState: FormActionState, formData: FormData): Promise<FormActionState> => {
  const rawData: object = Object.fromEntries(formData);
  const validatedData: SafeParseReturnType<object, RecordFields> = signUpSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      state: "error",
      message: "Form data validation failed",
      errors: validatedData.error.flatten().fieldErrors,
      payload: safePayload(formData)
    };
  }

  const saltRounds: number = 10;
  const hashedPassword: string = await bcrypt.hash(validatedData.data.password, saltRounds);

  try {
    await prisma.user.create({
      data: {
        email: validatedData.data.email,
        role: validatedData.data.role,
        name: validatedData.data.name,
        lastName: validatedData.data.surname,
        credentials: {
          create: {
            password: hashedPassword
          }
        }
      }
    });
  } catch (error: any) {
    return {
      state: "error",
      message: "Failed to create user",
      errors: {
        prisma: error.message
      },
      payload: safePayload(formData)
    };
  }

  // Successfully created user
  return {
    state: "success",
    message: "User created successfully"
  };
};

export default signUp;
