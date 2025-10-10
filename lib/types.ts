import * as z from "zod";

export const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .min(3, { message: "First name is too short" })
    .max(20, { message: "First name is too long" })
    .regex(/^[A-Za-z ]+$/, { message: "First name can only contain letters" })
    .toUpperCase(),

  middleName: z
    .string()
    .trim()
    .regex(/^[A-Za-z ]*$/, { message: "Middle name can only contain letters" })
    .toUpperCase()
    .transform((val) => (val === "" ? null : val))
    .nullable(),

  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(20, { message: "Last name is too long" })
    .regex(/^[A-Za-z ]+$/, { message: "Last name can only contain letters" })
    .toUpperCase(),

  fatherFullName: z
    .string()
    .trim()
    .min(1, { message: "Father's name is required" })
    .min(3, { message: "Father's name is too short" })
    .max(40, { message: "Father's name is too long" })
    .regex(/^[A-Za-z ]+$/, {
      message: "Father's name can only contain letters",
    })
    .toUpperCase(),

  dateOfBirth: z
    .string()
    .min(1, { message: "Date of birth is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .refine((val) => new Date(val) <= new Date(), {
      message: "Date of birth cannot be in the future",
    }),

  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: "Phone number is required" })
    .regex(/^[6-9]\d{9}$/, { message: "Invalid phone number" }),

  email: z.email({ message: "Invalid email address" }).trim().toLowerCase(),

  jobTitle: z
    .string()
    .trim()
    .min(1, { message: "Job title is required" })
    .max(50, { message: "Job title must be at most 50 characters long" }),

  jobId: z.string().trim().min(1, { message: "Job ID is required" }),
});

export type FormData = z.infer<typeof formSchema>;

export const signInSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim().toLowerCase(),
  password: z.string().min(1, { message: "Password is required" }),
});

export type SignInFormData = z.infer<typeof signInSchema>;
