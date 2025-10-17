"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
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
import { PasswordInput } from "@/components/ui/password-input";
import { resetPasswordSchema, ResetPasswordSchema } from "@/lib/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { authClient } from "@/lib/auth-client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const hasError = token == null || error != null;

  async function onSubmit(data: ResetPasswordSchema) {
    if (!token) {
      toast.error("Invalid or expired reset link.");

      return;
    }
    const verifiedData = resetPasswordSchema.safeParse(data);

    if (!verifiedData.success) {
      const firstIssue = verifiedData.error.issues[0];

      toast.error(firstIssue.message);

      return;
    }
    await authClient.resetPassword(
      {
        token,
        newPassword: verifiedData.data.password,
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Something went wrong");
        },
        onSuccess: () => {
          toast.success("Password has been reset successfully.");
          router.push("/signin");
        },
      },
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            {hasError
              ? "There was a problem with your reset link"
              : "Enter your new password below"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {hasError ? (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error ||
                    "Invalid or expired reset link. Please request a new one."}
                </AlertDescription>
              </Alert>
              <div className="flex flex-col space-y-3">
                <Button
                  className="w-full"
                  onClick={() => router.push("/forget-password")}
                >
                  Request New Reset Link
                </Button>
                <Button
                  className="w-full"
                  variant="ghost"
                  onClick={() => router.push("/login")}
                >
                  Back to Login
                </Button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col space-y-3">
                  <Button className="w-full" type="submit">
                    Reset Password
                  </Button>
                  <Button
                    className="w-full"
                    type="button"
                    variant="ghost"
                    onClick={() => router.push("/login")}
                  >
                    Back to Login
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
