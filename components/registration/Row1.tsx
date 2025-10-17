"use client";
import { Control } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { FormData } from "@/lib/types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Row1Props {
  control: Control<FormData>;
}

export function Row1({ control }: Row1Props) {
  return (
    <>
      <FormField
        control={control}
        name="firstName"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel requiredLable>First Name</FormLabel>
            <FormControl>
              <Input className="uppercase" type="text" {...field} />
            </FormControl>
            {/* we do not want to show description if there is an error */}
            {!fieldState.error && (
              <FormDescription>Same as your Aadhar Name</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="middleName"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Middle Name</FormLabel>
            <FormControl>
              <Input
                className="uppercase"
                type="text"
                {...field}
                value={field.value ?? ""} // input field can have null
              />
            </FormControl>
            {/* we do not want to show description(empty space) if there is an error */}
            {!fieldState.error && (
              <FormDescription className="hidden lg:block">
                &nbsp;
              </FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="lastName"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel requiredLable>Last Name</FormLabel>
            <FormControl>
              <Input className="uppercase" type="text" {...field} />
            </FormControl>
            {/* we do not want to show description(empty space) if there is an error */}
            {!fieldState.error && (
              <FormDescription className="hidden lg:block">
                &nbsp;
              </FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
