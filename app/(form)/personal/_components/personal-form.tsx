"use client";
import type { auth } from "@/lib/auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  candidatePersonalInfoSubmissionchema,
  CandidatePersonalInfoSubmissionSchema,
} from "@/lib/types";

// Automatically infers all your custom fields (ref to ~/prg/src/advance-type-extraction.ts) file
export type AuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;
export type AuthUser = NonNullable<AuthSession>["user"]; // it simply remove null

export function CandidatePersonalInfoSubmissionForm({
  user,
}: {
  user: AuthUser;
}) {
  const form = useForm<CandidatePersonalInfoSubmissionSchema>({
    resolver: zodResolver(candidatePersonalInfoSubmissionchema),
    defaultValues: {
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      fatherFullName: user.fatherFullName,
      dateOfBirth: user.dateOfBirth.toDateString(),
    },
  });

  return <div>{user.dateOfBirth.toDateString()}</div>;
}
