"use client";
import type { auth } from "@/lib/auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Row1 } from "./row-1";
import { Row2 } from "./row-2";
import { Row3 } from "./row-3";
import { CrosspondedAddress } from "./address/crossponded_address";

import {
  CandidatePersonalInfoSubmissionSchema,
  candidatePersonalInfoSubmissionchema,
} from "@/lib/types";
import { formatDateForInput } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import { FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";

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
      dateOfBirth: formatDateForInput(user.dateOfBirth),
      gender: "" as any,
      maritalStatus: "" as any,
      nationality: "" as any,
      motherFullName: "",
      // crossponded address
      crosspondedAddressLine1: "",
      crosspondedAddressLine2: "",
      crosspondedCountry: "",
      crosspondedCityOrDistrict: "",
      crosspondedState: "",
      crosspondedPincode: "",
      // permanent address
      permanentAddressLine1: "",
      permanentAddressLine2: "",
      permanentCountry: "",
      permanentCityOrDistrict: "",
      permanentState: "",
      permanentPincode: "",
    },
  });

  function onSubmit(data: CandidatePersonalInfoSubmissionSchema) {
    console.log(data);
  }

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <div className="">
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldSet>
                <FieldLegend>Personal Information</FieldLegend>
                <FieldDescription>
                  Fill in your personal information.
                </FieldDescription>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Row1 control={form.control} />
                  <Row2 control={form.control} />
                  <Row3 control={form.control} />
                </div>
              </FieldSet>

              <FieldSet>
                <FieldLegend>Address</FieldLegend>
                <FieldDescription>Fill in your address.</FieldDescription>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <CrosspondedAddress
                    control={form.control}
                    setValue={form.setValue}
                  />
                </div>
              </FieldSet>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
