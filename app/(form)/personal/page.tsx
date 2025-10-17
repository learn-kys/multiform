import { headers } from "next/headers";
import { redirect } from "next/navigation";

import PersonalForm from "./_components/personal-form";

import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session == null) {
    redirect("/signin");
  }

  return (
    <div>
      <PersonalForm user={session.user} />
    </div>
  );
}
