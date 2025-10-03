"use server";
import { Prisma } from "@prisma/client";

import prisma from "./db";
import { formSchema, FormData } from "./types";
import { generatePassword } from "./utils";

export async function userRegistration(formData: FormData) {
  const result = formSchema.safeParse(formData);

  if (!result.success) {
    const firstIssue = result.error.issues[0];

    return {
      success: false,
      error: {
        path: firstIssue.path, // array showing the field's path, e.g. ['fatherFullName']
        message: firstIssue.message, // the custom or default error message
        code: firstIssue.code, // the error code (e.g., 'too_small', 'invalid_type')
      },
    };
  }
  try {
    const newUser = await prisma.user.create({
      data: {
        ...result.data,
        dateOfBirth: new Date(result.data.dateOfBirth),
        password: generatePassword(),
      },
    });

    return { success: true, userId: newUser.id, userPassword: newUser };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          error: {
            message: "User with this email already exists",
          },
        };
      }
    }

    return { success: false, error: { message: "Something went wrong" } };
  }
}
