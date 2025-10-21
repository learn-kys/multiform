import { Control } from "react-hook-form";

import { CandidatePersonalInfoInput } from "@/lib/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getStates } from "@/lib/utils";

export function AdditionalInformation({
  control,
}: {
  control: Control<CandidatePersonalInfoInput>;
}) {
  const states = getStates();

  return (
    <>
      <FormField
        control={control}
        name="domicileOfState"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Domicile of State</FormLabel>
            <Select
              defaultValue={field.value}
              value={field.value}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Domicile of State" />
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
    </>
  );
}
