"use client";
import type { auth } from "@/lib/auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  candidatePersonalInfoSubmissionchema,
  CandidatePersonalInfoSubmissionSchema,
} from "@/lib/types";
import { formatDateForInput } from "@/lib/utils";
import { Form } from "@/components/ui/form";

// Automatically infers all your custom fields (ref to ~/prg/src/advance-type-extraction.ts) file
export type AuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;
export type AuthUser = NonNullable<AuthSession>["user"]; // it simply remove null

export function CandidatePersonalInfoSubmissionForm({
  user,
}: {
  user: AuthUser;
}) {
  console.log(user.dateOfBirth);
  const form = useForm<CandidatePersonalInfoSubmissionSchema>({
    resolver: zodResolver(candidatePersonalInfoSubmissionchema),
    defaultValues: {
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      fatherFullName: user.fatherFullName,
      dateOfBirth: formatDateForInput(user.dateOfBirth),
      gender: "" as any,
      isMarried: undefined,
      nationality: "",
    },
  });

  function onSubmit(data: CandidatePersonalInfoSubmissionSchema) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Row1 control={form.control} />
          <Row2 control={form.control} />
          <Row3 control={form.control} />
        </div>
      </form>
    </Form>
  );
}
