"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const profileUpdateSchema = z.object({
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

  email: z.email({ message: "Invalid email address" }).trim().toLowerCase(),

  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: "Phone number is required" })
    .regex(/^[6-9]\d{9}$/, { message: "Invalid phone number" }),
});

type ProfileUpdateSchema = z.infer<typeof profileUpdateSchema>;

interface User {
  firstName: string;
  middleName?: string | null;
  lastName: string;
  email: string;
  phoneNumber: string;
}
export function ProfileUpdateForm({ user }: { user: User }) {
  const form = useForm<ProfileUpdateSchema>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user.firstName,
      middleName: user.middleName ?? "",
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
  });

  const onSubmit = (data: ProfileUpdateSchema) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}