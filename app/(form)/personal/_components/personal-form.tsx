import type { auth } from "@/lib/auth";

// Automatically infers all your custom fields (ref to ~/prg/src/advance-type-extraction.ts) file
export type AuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;
export type AuthUser = NonNullable<AuthSession>["user"];

export default function PersonalForm({ user }: { user: AuthUser }) {
  return <div>{user.jobTitle}</div>;
}
