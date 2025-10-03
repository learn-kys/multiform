"use client";

import { Control } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Row2Props {
  control: Control<any>;
}

export function Row2({ control }: Row2Props) {
  return (
    <>
      <FormField
        control={control}
        name="fatherFullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Father Full Name</FormLabel>
            <FormControl>
              <Input className="uppercase" type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* 
      <FormField
        control={control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                    variant={"outline"}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, "dd/MM/yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    captionLayout="dropdown"
                    disabled={{
                      after: new Date(),
                      before: new Date(1900, 0),
                    }}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}

      <FormField
        control={control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <FormControl>
              <Input placeholder="select date" type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
