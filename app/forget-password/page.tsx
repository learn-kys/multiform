"use client";

import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export default function Page() {
  const handleResetlink = async () => {
    const email = "amitk995ys@gmail.com";

    await authClient.requestPasswordReset(
      {
        email,
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
  };

  return <button onClick={handleResetlink}>send reset password request</button>;
}
