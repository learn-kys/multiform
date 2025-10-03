import * as z from "zod";
export const formSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .min(3, { message: "First name must be at least 3 characters long" })
    .max(20, { message: "First name must be at most 20 characters long" }),
  middleName: z
    .string()
    .transform((val) => (val.trim() === "" ? null : val))
    .nullable(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  fatherFullName: z
    .string()
    .min(1, { message: "Father name is required" })
    .min(3, {
      message: "Father name must be at least 3 characters long",
    })
    .max(20, {
      message: "Father name must be at most 20 characters long",
    }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  email: z.string().email(),
  jobTitle: z.string().min(1, { message: "Job title is required" }),
  jobId: z.string(),
});

export type FormData = z.infer<typeof formSchema>;
