import { Control, useWatch, UseFormSetValue } from "react-hook-form";
import { useEffect } from "react";

import { CandidatePersonalInfoSubmissionSchema } from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getStates } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/lib/store";
import { Checkbox } from "@/components/ui/checkbox";

export function CrosspondedAddress({
  control,
  setValue,
}: {
  control: Control<CandidatePersonalInfoSubmissionSchema>;
  setValue: UseFormSetValue<CandidatePersonalInfoSubmissionSchema>;
}) {
  const states = getStates();
  const { districts, setSelectedState } = useStore();
  const selectedState = useWatch({
    control,
    name: "permanentState",
  });

  useEffect(() => {
    setSelectedState(selectedState);
  }, [selectedState, setSelectedState]);

  useEffect(() => {
    // if selectedState is changed, reset the district
    setValue("permanentCityOrDistrict", "");
  }, [selectedState, setValue]);

  return (
    <>
      <FormField
        control={control}
        name="permanentAddressLine1"
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
        name="permanentAddressLine2"
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
        name="permanentCountry"
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
        name="permanentState"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <Select defaultValue={field.value} onValueChange={field.onChange}>
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
        name="permanentCityOrDistrict"
        render={({ field }) => (
          <FormItem>
            <FormLabel>District</FormLabel>
            <Select
              defaultValue={field.value}
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
        name="permanentPincode"
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

      <div className="flex items-center gap-2 mt-2">
        <Checkbox />
        <FormLabel>Same as permanent address</FormLabel>
      </div>
    </>
  );
}
