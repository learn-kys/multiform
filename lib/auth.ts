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
      mobileNumber: {
        type: "string",
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
    },
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  // session: {
  //   cookieCache: {
  //     enabled: true,
  //     maxAge: 60 * 5, // 5 minutes
  //   },
  // },
  plugins: [nextCookies()],
});
