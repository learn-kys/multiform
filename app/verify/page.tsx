"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { InvalidLink } from "./_components/InvalidLink";
import { VerifyView } from "./_components/VerifyView";

import { authClient } from "@/lib/auth-client";

function VerifyPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  if (!email) {
    return <InvalidLink />;
  }

  return <VerifyView email={email} />;
}

export default function Page() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    <div>Loading...</div>;
  }

  if (session?.user.emailVerified) {
    // router.push("/");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPage />
    </Suspense>
  );
}
