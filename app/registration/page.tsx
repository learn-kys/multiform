"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";

import { Row1 } from "@/components/registration/Row1";
import { Row2 } from "@/components/registration/Row2";
import { Row3 } from "@/components/registration/Row3";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
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

type FormData = z.infer<typeof formSchema>;

export default function Page() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      fatherFullName: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      jobTitle: "",
      jobId: "",
    },
  });

  const jobTitle = form.watch("jobTitle");

  React.useEffect(() => {
    if (jobTitle) {
      const map: Record<string, string> = {
        developer: "1",
        designer: "2",
        marketer: "3",
      };

      form.setValue("jobId", map[jobTitle] ?? "");
    }
  }, [jobTitle, form]);

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <Form {...form}>
        <form
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full rounded-2xl"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Row1 control={form.control} />
          <Row2 control={form.control} />
          <Row3 control={form.control} />

          <Button className="" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
