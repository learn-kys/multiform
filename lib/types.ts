import * as z from "zod";

export const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { error: "First name is required" })
    .min(3, { error: "First name is too short" })
    .max(20, { error: "First name is too long" })
    .regex(/^[A-Za-z ]+$/, { error: "First name can only contain letters" })
    .toUpperCase(),

  middleName: z
    .string()
    .trim()
    .regex(/^[A-Za-z ]*$/, { error: "Middle name can only contain letters" })
    .toUpperCase()
    .transform((val) => (val === "" ? null : val))
    .nullable(),

  lastName: z
    .string()
    .trim()
    .min(1, { error: "Last name is required" })
    .max(20, { error: "Last name is too long" })
    .regex(/^[A-Za-z ]+$/, { error: "Last name can only contain letters" })
    .toUpperCase(),

  fatherFullName: z
    .string()
    .trim()
    .min(1, { error: "Father's name is required" })
    .min(3, { error: "Father's name is too short" })
    .max(40, { error: "Father's name is too long" })
    .regex(/^[A-Za-z ]+$/, {
      error: "Father's name can only contain letters",
    })
    .toUpperCase(),

  dateOfBirth: z
    .string()
    .min(1, { error: "Date of birth is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      error: "Invalid date format",
    })
    .refine((val) => new Date(val) <= new Date(), {
      error: "Date of birth cannot be in the future",
    }),

  phoneNumber: z
    .string()
    .trim()
    .min(1, { error: "Phone number is required" })
    .regex(/^[6-9]\d{9}$/, { error: "Invalid phone number" }),

  email: z.email({ error: "Invalid email address" }).trim().toLowerCase(),

  jobTitle: z
    .string()
    .trim()
    .min(1, { error: "Job title is required" })
    .max(50, { error: "Job title must be at most 50 characters long" }),

  jobId: z.string().trim().min(1, { error: "Job ID is required" }),

  password: z
    .string()
    .min(1, { error: "Password is required" })
    .min(8, { error: "Password too short" }),
});

export const signInSchema = z.object({
  email: z.email({ error: "Invalid email address" }).trim().toLowerCase(),
  password: z.string().min(1, { error: "Password is required" }).min(8, {
    error: "Password too short",
  }),
});

export const forgetPasswordSchema = z.object({
  email: z.email({ error: "Invalid email address" }).trim().toLowerCase(),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { error: "Password is required" })
      .min(8, { error: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const candidatePersonalInfoSubmissionchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { error: "First name is required" })
    .min(3, { error: "First name is too short" })
    .max(20, { error: "First name is too long" })
    .regex(/^[A-Za-z ]+$/, { error: "First name can only contain letters" })
    .toUpperCase(),

  middleName: z
    .string()
    .trim()
    .regex(/^[A-Za-z ]*$/, { error: "Middle name can only contain letters" })
    .toUpperCase()
    .transform((val) => (val === "" ? null : val))
    .nullable(),

  lastName: z
    .string()
    .trim()
    .min(1, { error: "Last name is required" })
    .max(20, { error: "Last name is too long" })
    .regex(/^[A-Za-z ]+$/, { error: "Last name can only contain letters" })
    .toUpperCase(),

  fatherFullName: z
    .string()
    .trim()
    .min(1, { error: "Father's name is required" })
    .min(3, { error: "Father's name is too short" })
    .max(40, { error: "Father's name is too long" })
    .regex(/^[A-Za-z ]+$/, {
      error: "Father's name can only contain letters",
    })
    .toUpperCase(),

  motherFullName: z
    .string()
    .trim()
    .min(1, { error: "Mother's name is required" })
    .min(3, { error: "Mother's name is too short" })
    .max(40, { error: "Mother's name is too long" })
    .regex(/^[A-Za-z ]+$/, {
      error: "Mother's name can only contain letters",
    })
    .toUpperCase(),

  dateOfBirth: z
    .string()
    .min(1, { error: "Date of birth is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      error: "Invalid date format",
    })
    .refine((val) => new Date(val) <= new Date(), {
      error: "Date of birth cannot be in the future",
    }),

  gender: z.enum(["Male", "Female", "Other"], {
    error: "Please select a valid gender.",
  }),

  isMarried: z.boolean({
    error: "Marital status is required",
  }),

  nationality: z.string({
    error: "Nationality is required",
  }),
});

export type CandidatePersonalInfoSubmissionSchema = z.infer<
  typeof candidatePersonalInfoSubmissionchema
>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type FormData = z.infer<typeof formSchema>;
