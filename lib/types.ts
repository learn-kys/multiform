import * as z from "zod";
export const formSchema = z.object({
  firstName: z.string().min(1, { message: "enter you name please" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  fatherFullName: z
    .string()
    .min(1, { message: "Father full name is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  email: z.string().email(),
  jobTitle: z.string().min(1, { message: "Job title is required" }),
  jobId: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;
