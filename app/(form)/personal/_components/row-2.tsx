import { Control } from "react-hook-form";

import { CandidatePersonalInfoSubmissionSchema } from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function Row2({
  control,
}: {
  control: Control<CandidatePersonalInfoSubmissionSchema>;
}) {
  return (
    <>
      <FormField
        control={control}
        name="fatherFullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel requiredLable>Father's Full Name</FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="motherFullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mother's Full Name</FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel requiredLable>Date of Birth</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
