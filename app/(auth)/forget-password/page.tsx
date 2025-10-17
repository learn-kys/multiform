"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forgetPasswordSchema, ForgetPasswordSchema } from "@/lib/types";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";

export default function ForgetPasswordPage() {
  const form = useForm<ForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgetPasswordSchema) {
    const verifiedData = forgetPasswordSchema.safeParse(data);

    if (!verifiedData.success) {
      const firstIssue = verifiedData.error.issues[0];

      toast.error(firstIssue.message);

      return;
    }

    await authClient.requestPasswordReset(
      {
        email: verifiedData.data.email,
        redirectTo: "/reset-password",
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Something went wrong");
        },
        onSuccess: () => {
          toast.success("If email exists, reset link sent.");
        },
      },
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to receive a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col space-y-3">
                <Button className="w-full" type="submit">
                  Send Reset Link
                </Button>
                <Button
                  className="w-full"
                  type="button"
                  variant="ghost"
                  onClick={() => window.history.back()}
                >
                  Back to Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
