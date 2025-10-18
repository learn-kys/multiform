import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { useEffect } from "react";

import { CandidatePersonalInfoSubmissionSchema } from "@/lib/types";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { getStates } from "@/lib/utils";
import { useDistricts } from "@/lib/hooks/use-districts";

export function CrosspondedAddress({
  control,
  setValue,
}: {
  control: Control<CandidatePersonalInfoSubmissionSchema>;
  setValue: UseFormSetValue<CandidatePersonalInfoSubmissionSchema>;
}) {
  const states = getStates();
  const selectedState = useWatch({
    control,
    name: "crosspondedState",
  });
  const districts = useDistricts(selectedState);

  const sameAsPermanent = useWatch({
    control,
    name: "sameAsPermanent",
  });

  useEffect(() => {
    // if selectedState is changed, and we are not in the process of copying, reset the district
    if (!sameAsPermanent) {
      setValue("crosspondedCityOrDistrict", "");
    }
  }, [selectedState, sameAsPermanent, setValue]);

  const permanentAddress = useWatch({
    control,
    name: [
      "permanentAddressLine1",
      "permanentAddressLine2",
      "permanentCountry",
      "permanentState",
      "permanentCityOrDistrict",
      "permanentPincode",
    ],
  });

  useEffect(() => {
    // This useEffect handles the copying of the permanent address to the corresponding address.
    // It copies all fields except for the district to avoid a timing issue.
    // If we were to set the district here at the same time as the state, the `districts`
    // array for the new state might not be populated yet, which would prevent the
    // district from being selected correctly.
    if (sameAsPermanent) {
      setValue("crosspondedAddressLine1", permanentAddress[0]);
      setValue("crosspondedAddressLine2", permanentAddress[1]);
      setValue("crosspondedCountry", permanentAddress[2]);
      setValue("crosspondedState", permanentAddress[3]);
      setValue("crosspondedPincode", permanentAddress[5]);
    } else {
      setValue("crosspondedAddressLine1", "");
      setValue("crosspondedAddressLine2", "");
      setValue("crosspondedCountry", "");
      setValue("crosspondedState", "");
      setValue("crosspondedPincode", "");
    }
  }, [
    sameAsPermanent,
    permanentAddress[0],
    permanentAddress[1],
    permanentAddress[2],
    permanentAddress[3],
    permanentAddress[5],
    setValue,
  ]);

  useEffect(() => {
    // This useEffect is responsible for setting the district of the corresponding address.
    // It runs after the `districts` array has been updated (because `districts` is in the dependency array).
    // This solves the timing issue by ensuring that the list of districts for the new state is
    // available before we try to set the district value.
    if (sameAsPermanent && districts.includes(permanentAddress[4])) {
      setValue("crosspondedCityOrDistrict", permanentAddress[4]);
    }
  }, [sameAsPermanent, districts, permanentAddress[4], setValue]);

  return (
    <>
      <div className="md:col-span-2 lg:col-span-3">
        <FormField
          control={control}
          name="sameAsPermanent"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 mt-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Same as permanent address</FormLabel>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="crosspondedAddressLine1"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address Line 1</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="crosspondedAddressLine2"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address Line 2</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="crosspondedCountry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="crosspondedState"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="crosspondedCityOrDistrict"
        render={({ field }) => (
          <FormItem>
            <FormLabel>District</FormLabel>
            <Select
              value={field.value}
              disabled={!selectedState}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a district" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="crosspondedPincode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pincode</FormLabel>
            <FormControl>
              <Input
                inputMode="numeric"
                maxLength={6}
                pattern="^[0-9]{6}$"
                type="text"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
