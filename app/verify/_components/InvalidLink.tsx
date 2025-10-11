import { AlertCircle } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function InvalidLink() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Invalid Verification Link</CardTitle>
          <CardDescription>
            We couldn't find your email verification details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Email Provided</AlertTitle>
            <AlertDescription>
              The verification link appears to be incomplete or invalid. Please
              try registering again.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/registration">Go to Registration</Link>
          </Button>
          <Button asChild className="w-full" variant="outline">
            <Link href="/signin">Back to Sign In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
