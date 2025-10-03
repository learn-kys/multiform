"use server";
import { Prisma } from "@prisma/client";

import prisma from "./db";
import { formSchema, FormData } from "./types";
import { generatePassword } from "./utils";

export async function userRegistration(formData: FormData) {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  const result = formSchema.safeParse(formData);

  if (!result.success) {
    const firstIssue = result.error.issues[0];

    throw new Error(firstIssue.message);
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        ...result.data,
        dateOfBirth: new Date(result.data.dateOfBirth),
        password: generatePassword(),
      },
    });

    return { userId: newUser.id, userPassword: newUser.password };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = (error.meta?.target as string[]) || [];

        if (target.includes("email")) {
          throw new Error("This email Id already in use");
        }

        if (target.includes("phoneNumber")) {
          throw new Error("This phone number already exists");
        }
      }
    }

    throw new Error("Something went wrong");
  }
}
