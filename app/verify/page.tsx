"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

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

  useEffect(() => {
    if (session?.user.emailVerified) {
      router.push("/");
    }
  }, [session, router]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPage />
    </Suspense>
  );
}
