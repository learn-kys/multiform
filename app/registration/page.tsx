"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Loader2 } from "lucide-react";

import { Row1 } from "@/components/registration/Row1";
import { Row2 } from "@/components/registration/Row2";
import { Row3 } from "@/components/registration/Row3";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormData } from "@/lib/types";
import { formSchema } from "@/lib/types";
import { RegistrationDialog } from "@/components/registration/RegistrationDialog";

export default function Page() {
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [credentials, setCredentials] = React.useState<{
    userId?: string;
    password?: string;
  }>({});
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

  const onSubmit = async (data: FormData) => {
    /*
    try {
      const result = await userRegistration(data);

      if (result) {
        setCredentials({
          userId: result.userId,
          password: result.password,
        });
        setIsAlertOpen(true);
        // toast.success("Registration successful");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unexpected error", {
        duration: Infinity,
        cancel: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
      */

    await authClient.emailAndPassword.register(data);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Registration Form
            </h1>
          </div>

          {/* Form Card */}
          <div className="border rounded-lg shadow-sm bg-card">
            <div className="p-6 sm:p-8 lg:p-10">
              <Form {...form}>
                <form
                  className="space-y-8"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Row1 control={form.control} />
                    <Row2 control={form.control} />
                    <Row3 control={form.control} />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-2">
                    <Button
                      className="w-full sm:w-auto sm:min-w-[200px]"
                      disabled={form.formState.isSubmitting}
                      size="lg"
                      type="submit"
                    >
                      {form.formState.isSubmitting ? (
                        <div className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </div>
                      ) : (
                        "Submit Registration"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            All fields marked with an asterisk (*) are required
          </p>
        </div>
      </div>
      <RegistrationDialog
        isOpen={isAlertOpen}
        password={credentials.password}
        userId={credentials.userId}
        onClose={() => setIsAlertOpen(false)}
      />
    </>
  );
}
