"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toTitleCase } from "@/lib/utils";

export default function Page() {
  const { data: session, isPending: loading } = authClient.useSession();

  return (
    <div>
      {session == null ? (
        <Button>
          <Link href={"/signin"}>SignIn / Sign Up</Link>
        </Button>
      ) : (
        <>
          <h1>welcome {toTitleCase(session.user.name)}</h1>
          <p>email {session.user.email} </p>
          <p>password:AT#I6N63uFr3</p>
          <Button
            size={"sm"}
            variant={"destructive"}
            onClick={() => authClient.signOut()}
          >
            Sign out
          </Button>
        </>
      )}
    </div>
  );
}
