import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session == null) {
    redirect("/signin");
  }

  return (
    <div>
      <Image
        alt="user avatar"
        height={64}
        src={session.user.image ?? "/globe.svg"}
        width={64}
      />
      <h1>{session.user.name}</h1>
      <p>{session.user.email}</p>
    </div>
  );
}
