import type { auth } from "@/lib/auth";

// Automatically infers all your custom fields (ref to ~/prg/src/advance-type-extraction.ts) file
export type AuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;
export type AuthUser = NonNullable<AuthSession>["user"]; // it simply remove null

export function CandidatePersonalInfoSubmissionForm({
  user,
}: {
  user: AuthUser;
}) {
  return <div>{user.dateOfBirth.toDateString()}</div>;
}
