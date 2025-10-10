"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Page() {
  const { data: session, isPending: loading } = authClient.useSession();

  return (
    <div>
      {session == null ? (
        <Button>
          <Link href={"/auth/login"}>SignIn / Sign Up</Link>
        </Button>
      ) : (
        <>
          <h1>welcome {session.user.name.toLocaleLowerCase()}</h1>
          <Button onClick={() => authClient.signOut()}>Sign out</Button>
        </>
      )}
    </div>
  );
}
