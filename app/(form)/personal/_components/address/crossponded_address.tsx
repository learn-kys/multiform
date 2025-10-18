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
    name: "crosspondedState",
  });

  useEffect(() => {
    setSelectedState(selectedState);
  }, [selectedState, setSelectedState]);

  useEffect(() => {
    // if selectedState is changed, reset the district
    setValue("crosspondedCityOrDistrict", "");
  }, [selectedState, setValue]);

  return (
    <>
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
        name="crosspondedCityOrDistrict"
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
