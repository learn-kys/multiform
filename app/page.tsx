"use client";

import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toTitleCase } from "@/lib/utils";
import { GenericLoader } from "@/components/genericLoader";

export default function Page() {
  const { data: session, isPending: loading } = authClient.useSession();

  if (loading) {
    return <GenericLoader className="size-8" />;
  }

  return (
    <div>
      {session == null ? (
        <>
          <Button>
            <Link href={"/signin"}>SignIn / Sign Up</Link>
          </Button>
          <Button onClick={() => toast.success("This is sucess message")}>
            success
          </Button>
          <Button onClick={() => toast.info("this is info message how ?")}>
            info
          </Button>
          <Button
            onClick={() => toast.warning("this is warning message how ?")}
          >
            warning
          </Button>
          <Button onClick={() => toast.error("this is error message how ?")}>
            error
          </Button>
          <p className="font-serif">User registration sucessful</p>
        </>
      ) : (
        <>
          <h1>welcome {toTitleCase(session.user.name)}</h1>
          <p>email {session.user.email} </p>
          <Button
            size={"sm"}
            variant={"destructive"}
            onClick={() => authClient.signOut()}
          >
            Sign out
          </Button>
          <Button>
            <Link href={"/profile"}>Profile</Link>
          </Button>
        </>
      )}
    </div>
  );
}
