"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormDescription,
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

// enums
const genderEnum = z.enum(["male", "female", "other"], {
  error: "Invalid gender",
});

// ✅ Define the input schema (what the form receives)
const userSchemaInput = z.object({
  gender: genderEnum.nullable(),
  isMarried: z.union([z.boolean(), z.string()]), // Accept both boolean and string
});

// ✅ Define the output schema (what you want after transformation)
const userSchema = z.object({
  gender: genderEnum.nullable(),
  isMarried: z.coerce.boolean<boolean>(),
});

// Use the output type for your form
type UserFormValues = z.infer<typeof userSchema>;

export default function UserPage() {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      gender: null,
      isMarried: undefined,
    },
  });

  function onSubmit(data: UserFormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Gender select */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  {genderEnum.options.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select your gender.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Marital status select that coerces to boolean */}
        <FormField
          control={form.control}
          name="isMarried"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marital Status</FormLabel>
              <Select
                value={String(field.value)}
                onValueChange={(val) => field.onChange(val === "true")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Married</SelectItem>
                  <SelectItem value="false">Unmarried</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Are you married?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          type="submit"
        >
          Submit
        </button>
      </form>
    </Form>
  );
}
