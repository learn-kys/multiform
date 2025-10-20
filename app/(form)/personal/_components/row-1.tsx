import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CandidatePersonalInfoInput } from "@/lib/types";

export function Row1({
  control,
}: {
  control: Control<CandidatePersonalInfoInput>;
}) {
  return (
    <>
      <FormField
        control={control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel requiredLable>First Name</FormLabel>
            <FormControl>
              <Input type="text" {...field} disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="middleName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Middle Name</FormLabel>
            <FormControl>
              <Input {...field} disabled value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel requiredLable>Last Name</FormLabel>
            <FormControl>
              <Input type="text" {...field} disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
