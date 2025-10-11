"use client";

import { Mail, Timer } from "lucide-react";
import Link from "next/link";

import { BetterAuthActionButton } from "@/components/better-auth-action-button";
import { authClient } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCountdown from "@/lib/hooks/useCountdown";
import { formatTime } from "@/lib/utils";

const COOLDOWN_KEY = "email_verification_cooldown";
const COOLDOWN_DURATION = 120;

export function VerifyView({ email }: { email: string }) {
  const { countdown, startCountdown } = useCountdown(
    COOLDOWN_KEY,
    COOLDOWN_DURATION,
    email,
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification link to your email address
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email Display */}
          <div className="rounded-lg border bg-muted/50 p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">
              Verification email sent to
            </p>
            <p className="font-semibold text-foreground break-all">{email}</p>
          </div>

          {/* Instructions */}
          {/* <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Check your inbox</AlertTitle>
            <AlertDescription className="space-y-2 mt-2">
              <p>
                Click the verification link in the email to activate your
                account.
              </p>
              <p className="text-xs">
                The link will expire in 24 hours for security reasons.
              </p>
            </AlertDescription>
          </Alert> */}

          {/* Resend Button with Countdown */}
          <div className="space-y-2">
            <BetterAuthActionButton
              action={async () => {
                const result = await authClient.sendVerificationEmail({
                  email,
                  callbackURL: "/",
                });

                startCountdown();

                return result;
              }}
              className="w-full"
              disabled={countdown > 0}
              successMessage="Verification email sent!"
              variant="outline"
            >
              {countdown > 0 ? (
                <>
                  <Timer className="mr-2 h-4 w-4" />
                  Resend in {formatTime(countdown)}
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Resend Verification Email
                </>
              )}
            </BetterAuthActionButton>
          </div>

          {/* Tips */}
          {/* <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="text-sm space-y-1">
                <p className="font-medium text-foreground">
                  Waiting for the email?
                </p>
                <ul className="text-muted-foreground space-y-1 text-xs">
                  <li>• Check your spam or junk folder</li>
                  <li>• Make sure {email} is correct</li>
                  <li>• Wait a few minutes for delivery</li>
                  <li>• Try resending if it doesn't arrive</li>
                </ul>
              </div>
            </div>
          </div> */}
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <div className="w-full h-px bg-border" />
          <p className="text-xs text-center text-muted-foreground pt-2">
            Already verified?{" "}
            <Link
              className="font-medium text-primary hover:underline"
              href="/signin"
            >
              Sign in here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
