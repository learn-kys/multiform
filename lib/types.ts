import * as z from "zod";

import {
  basicPersonalInfo,
  emailField,
  extendedPersonalInfo,
  indianPhoneField,
  passwordField,
} from "./zodTypes";

export const formSchema = z.object({
  ...basicPersonalInfo,
  phoneNumber: indianPhoneField,
  email: emailField,
  jobTitle: z
    .string()
    .trim()
    .min(1, { error: "Job title is required" })
    .max(50, { error: "Job title must be at most 50 characters long" }),
  jobId: z.string().trim().min(1, { error: "Job ID is required" }),
  password: passwordField(),
});

export const signInSchema = z.object({
  email: emailField,
  password: passwordField(),
});

export const forgetPasswordSchema = z.object({
  email: emailField,
});

export const resetPasswordSchema = z
  .object({
    password: passwordField(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const candidatePersonalInfoSubmissionSchema =
  z.object(extendedPersonalInfo);

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CandidatePersonalInfoSubmissionSchema = z.infer<
  typeof candidatePersonalInfoSubmissionSchema
>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type FormData = z.infer<typeof formSchema>;
