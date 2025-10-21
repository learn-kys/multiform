"use client";
import type { auth } from "@/lib/auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Row1 } from "./row-1";
import { Row2 } from "./row-2";
import { Row3 } from "./row-3";
import { PermanentAddress } from "./address/permanent_address";
import { CrosspondedAddress } from "./address/crossponded_address";
import { AdditionalInformation } from "./additionalInfo/additional-information";

import {
  CandidatePersonalInfoInput,
  candidatePersonalInfoSubmissionSchema,
  CandidatePersonalInfoSubmissionSchema,
} from "@/lib/types";
import { formatDateForInput } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import { FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Automatically infers all your custom fields (ref to ~/prg/src/advance-type-extraction.ts) file
export type AuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;
export type AuthUser = NonNullable<AuthSession>["user"]; // it simply remove null

export function CandidatePersonalInfoSubmissionForm({
  user,
}: {
  user: AuthUser; // Assuming AuthUser matches the base schema for default values
}) {
  const form = useForm<
    CandidatePersonalInfoInput,
    any,
    CandidatePersonalInfoSubmissionSchema
  >({
    resolver: zodResolver(candidatePersonalInfoSubmissionSchema),
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
      sameAsPermanent: false,
      // additional information
      domicileOfState: "",
      domicileCertificateIssuingAuthority: "",
      domicileCertificateNumber: "",
      domicileCertificateIssueDate: "",
      haveDisability: undefined,
      disabilityType: null,
      markOfVisibleIdentification: "",
      documentToUpload: "" as any,
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
              {/* Display all form errors for debugging */}
              {/* {Object.keys(form.formState.errors).length > 0 && (
                <div className="bg-destructive/10 border border-destructive/50 text-destructive p-4 rounded-md">
                  <h3 className="font-medium">
                    Please fix the following errors:
                  </h3>
                  <ul className="list-disc list-inside mt-2">
                    {Object.entries(form.formState.errors).map(
                      ([fieldName, error]) => (
                        <li key={fieldName}>
                          {fieldName}: {error.message}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )} */}
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
                <FieldLegend>Permanent Address</FieldLegend>
                <FieldDescription>
                  Fill in your permanent address.
                </FieldDescription>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <PermanentAddress
                    control={form.control}
                    setValue={form.setValue}
                  />
                </div>
              </FieldSet>

              <FieldSet>
                <FieldLegend>Crossponded Address</FieldLegend>
                <FieldDescription>
                  Fill in your crossponded address.
                </FieldDescription>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <CrosspondedAddress
                    control={form.control}
                    setValue={form.setValue}
                  />
                </div>
              </FieldSet>

              <FieldSet>
                <FieldLegend>Additional Information</FieldLegend>
                <FieldDescription>
                  Fill in your additional information.
                </FieldDescription>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AdditionalInformation control={form.control} />
                </div>
              </FieldSet>

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
