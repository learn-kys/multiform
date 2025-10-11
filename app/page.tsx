"use client";

import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toTitleCase } from "@/lib/utils";

export default function Page() {
  const { data: session, isPending: loading } = authClient.useSession();

  return (
    <div>
      {session == null ? (
        <>
          <Button>
            <Link href={"/signin"}>SignIn / Sign Up</Link>
          </Button>
          <Button onClick={() => toast.success("this is sucess message how ?")}>
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
          <p className="font-monomakh">lore sdflaf Tljsdfla Ssdflaj Tsdfaf</p>
        </>
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
