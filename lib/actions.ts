"use server";
import prisma from "./db";
import { formSchema, FormData } from "./types";

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

  const newUser = await prisma.user.create({
    data: {
      dateof,
    },
  });

  // console.log("Converted Date for Prisma:", dateOfBirth);

  return { success: true };
}
