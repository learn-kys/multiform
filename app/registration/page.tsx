"use client";
import { useForm, Controller } from "react-hook-form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormData = {
  firstName: string;
  middleName?: string;
  lastName: string;
  fatherFullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  jobTitle: "developer" | "designer" | "marketer";
  jobId: string;
};

export default function Page() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      jobTitle: undefined,
      jobId: "",
    },
  });

  // auto-update jobId when jobTitle changes
  const jobTitle = watch("jobTitle");

  if (jobTitle) {
    const map: Record<string, string> = {
      developer: "1",
      designer: "2",
      marketer: "3",
    };

    setValue("jobId", map[jobTitle] ?? "");
  }

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <form
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full rounded-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="middleName">Middle Name</Label>
          <Input id="middleName" type="text" {...register("middleName")} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="fatherFullName">Father Full Name</Label>
          <Input
            id="fatherFullName"
            type="text"
            {...register("fatherFullName", { required: true })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            {...register("dateOfBirth", { required: true })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="number"
            {...register("phoneNumber", { required: true })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: true })}
          />
        </div>

        {/* Controlled Select */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Controller
            control={control}
            name="jobTitle"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a job title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="marketer">Marketer</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="jobId">Job ID</Label>
          <Input disabled id="jobId" type="text" {...register("jobId")} />
        </div>

        <button
          className="col-span-full bg-blue-600 text-white rounded-lg px-4 py-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
