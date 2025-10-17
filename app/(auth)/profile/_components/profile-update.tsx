"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LoadingSwap } from "@/components/ui/loading-swap";

const profileUpdateSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .min(3, { message: "First name is too short" })
    .max(20, { message: "First name is too long" })
    .regex(/^[A-Za-z ]+$/, { message: "First name can only contain letters" })
    .toUpperCase(),

  middleName: z
    .string()
    .trim()
    .regex(/^[A-Za-z ]*$/, { message: "Middle name can only contain letters" })
    .toUpperCase()
    .transform((val) => (val === "" ? null : val))
    .nullable(),

  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(20, { message: "Last name is too long" })
    .regex(/^[A-Za-z ]+$/, { message: "Last name can only contain letters" })
    .toUpperCase(),

  email: z.email({ message: "Invalid email address" }).trim().toLowerCase(),

  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: "Phone number is required" })
    .regex(/^[6-9]\d{9}$/, { message: "Invalid phone number" }),
});

type ProfileUpdateSchema = z.infer<typeof profileUpdateSchema>;

interface User {
  firstName: string;
  middleName?: string | null;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export function ProfileUpdateForm({ user }: { user: User }) {
  const form = useForm<ProfileUpdateSchema>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user.firstName,
      middleName: user.middleName ?? "",
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
  });

  const router = useRouter();

  const { isDirty, isSubmitting } = form.formState;

  const onSubmit = async (data: ProfileUpdateSchema) => {
    const verifiedData = profileUpdateSchema.safeParse(data);

    if (!verifiedData.success) {
      const firstIssue = verifiedData.error.issues[0];

      toast.error(firstIssue.message);

      return;
    }

    const promises = [
      authClient.updateUser({
        firstName: verifiedData.data.firstName,
        middleName: verifiedData.data.middleName,
        lastName: verifiedData.data.lastName,
        name: [
          verifiedData.data.firstName,
          verifiedData.data.middleName,
          verifiedData.data.lastName,
        ]
          .filter(Boolean)
          .join(" "),
        phoneNumber: verifiedData.data.phoneNumber,
      }),
    ];

    if (verifiedData.data.email != user.email) {
      authClient.changeEmail({
        newEmail: verifiedData.data.email,
        callbackURL: "/profile",
      });
    }

    const res = await Promise.all(promises);
    const updateUserResult = res[0];
    const emailResult = res[1] ?? { error: false };

    if (updateUserResult.error) {
      toast.error(updateUserResult.error.message || "Failed to update user");
    } else if (emailResult.error) {
      toast.error(emailResult.error.message || "Failed to update email");
    } else {
      if (verifiedData.data.email != user.email) {
        toast.success("Verify the new email address");
      } else {
        toast.success("Profile updated successfully");
      }
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {user.middleName !== undefined && (
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name (Optional)</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                {field.value !== user.email && (
                  <FormDescription>
                    You'll need to verify your new email address
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          {isDirty && (
            <>
              <Button
                disabled={isSubmitting}
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Cancel
              </Button>
              <Button disabled={isSubmitting} type="submit">
                <LoadingSwap isLoading={isSubmitting}>Save Changes</LoadingSwap>
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
