"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Row1 } from "@/components/registration/Row1";
import { Row2 } from "@/components/registration/Row2";
import { Row3 } from "@/components/registration/Row3";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormData } from "@/lib/types";
import { formSchema } from "@/lib/types";
import { authClient } from "@/lib/auth-client";

export default function Page() {
  // const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  // const [credentials, setCredentials] = React.useState<{
  //   // userId?: string;
  //   // password?: string;
  // }>({});
  const router = useRouter();

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
      password: "",
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
    // data parsing to ensure correct data
    const verifiedData = formSchema.safeParse(data);

    if (!verifiedData.success) {
      const firstIssue = verifiedData.error.issues[0];

      toast.error(firstIssue.message);

      return;
    }
    await authClient.signUp.email(
      {
        ...data,
        name: [data.firstName, data.middleName, data.lastName]
          .filter(Boolean)
          .join(" "),
        dateOfBirth: new Date(data.dateOfBirth),
        callbackURL: `/verify?email=${encodeURIComponent(data.email)}`,
      },
      {
        onSuccess: () => {
          // Redirect to verify page with email
          router.push(`/verify?email=${encodeURIComponent(data.email)}`);
          toast.success("Signup Successful");
        },
        onError: (error) => {
          toast.error(error.error.message || "Something went wrong");
        },
      },
    );
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8 space-y-2">
            <h3>Registration Form</h3>
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
      {/* <RegistrationDialog
        isOpen={isAlertOpen}
        password={credentials.password}
        userId={credentials.userId}
        onClose={() => setIsAlertOpen(false)}
      /> */}
    </>
  );
}
