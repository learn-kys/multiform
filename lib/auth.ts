import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

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
      firstName: {
        type: "string",
        required: true,
      },
      middleName: {
        type: "string",
        required: false,
      },
      lastName: {
        type: "string",
        required: true,
      },
      fatherFullName: {
        type: "string",
        required: true,
      },
      dateOfBirth: {
        type: "date",
        required: true,
      },
      phoneNumber: {
        type: "string",
        required: true,
        // unique: true,
      },
      jobTitle: {
        type: "string",
        required: true,
      },
      jobId: {
        type: "string",
        required: true,
      },
    },
  },
  // databaseHooks: {
  //   user: {
  //     create: {
  //       before: async (user) => {
  //         // Check if phone number already exists
  //         if (user.phoneNumber) {
  //           const existingUser = await prisma.user.findFirst({
  //             where: {
  //               phoneNumber: user.phoneNumber,
  //             },
  //           });

  //           if (existingUser) {
  //             throw new APIError("BAD_REQUEST", {
  //               message: "User with this phone number already exists.",
  //             });
  //           }
  //         }

  //         return {
  //           data: user,
  //         };
  //       },
  //     },
  //     update: {
  //       before: async (user) => {
  //         // Check if phone number already exists (excluding the current user)
  //         if (user.phoneNumber) {
  //           const existingUser = await prisma.user.findFirst({
  //             where: {
  //               phoneNumber: user.phoneNumber,
  //               id: { not: user.id },
  //             },
  //           });

  //           if (existingUser) {
  //             throw new APIError("BAD_REQUEST", {
  //               message: "User with this phone number already exists.",
  //             });
  //           }
  //         }

  //         return {
  //           data: user,
  //         };
  //       },
  //     },
  //   },
  // },
  secret: process.env.BETTER_AUTH_SECRET!,
  plugins: [nextCookies()],
});
