import { Control } from "react-hook-form";

import { genderEnum, maritalStatusEnum, nationalityEnum } from "@/lib/types";
import {
  FormControl,
  FormMessage,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CandidatePersonalInfoInput } from "@/lib/types";

export function Row3({
  control,
}: {
  control: Control<CandidatePersonalInfoInput>;
}) {
  return (
    <>
      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a gender" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {genderEnum.options.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
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
        name="maritalStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Martial Status</FormLabel>
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a martial status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {maritalStatusEnum.options.map((maritalStatus) => (
                  <SelectItem key={maritalStatus} value={maritalStatus}>
                    {maritalStatus}
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
        name="nationality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nationality</FormLabel>
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Your nationality" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {nationalityEnum.options.map((nationality) => (
                  <SelectItem key={nationality} value={nationality}>
                    {nationality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
