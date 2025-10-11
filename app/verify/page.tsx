"use client";

import { BetterAuthActionButton } from "@/components/better-auth-action-button";
import { authClient } from "@/lib/auth-client";

export default function Page() {
  return (
    <div>
      <BetterAuthActionButton
        action={() => {
          return authClient.sendVerificationEmail({ email, callbackURL: "/" });
        }}
        className="w-full"
        successMessage="Verification email sent!"
        variant={"outline"}
      >
        Resend Verification Email
      </BetterAuthActionButton>
    </div>
  );
}
