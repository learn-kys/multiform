import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "@/lib/db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      fatherName: {
        type: "string",
        required: true,
      },
      firstName: {
        type: "string",
        required: true,
      },
      middleName: {
        type: "string",
        required: false,
      },
      dateOfBirth: {
        type: "date",
        required: true,
      },
      jobTitle: {
        type: "string",
        required: true,
      },
      jobId: {
        type: "string",
        required: true,
      },
      phoneNumber: {
        type: "string",
        required: true,
      },
    },
  },
});
