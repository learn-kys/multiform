import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { IconShieldHalfFilled, IconUserFilled } from "@tabler/icons-react";

import { ProfileUpdateForm } from "./_components/profile-update";

import { auth } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session == null) {
    redirect("/signin");
  }

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar className="h-24 w-24 ring-4 ring-background shadow-lg">
            <AvatarImage
              alt={session.user.name ?? "User avatar"}
              src={session.user.image ?? "/globe.svg"}
            />
            <AvatarFallback className="text-2xl font-semibold">
              {getInitials(session.user.name ?? "U")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {session.user.name}
            </h1>
            <p className="text-muted-foreground text-lg">
              {session.user.email}
            </p>
          </div>
        </div>

        <Separator className="mt-8" />
      </div>

      {/* Tabs Section */}
      <Tabs className="space-y-6" defaultValue="profile">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger className="flex items-center gap-2" value="profile">
            <IconUserFilled className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger className="flex items-center gap-2" value="security">
            <IconShieldHalfFilled className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent className="space-y-6" value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileUpdateForm user={session.user} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security tab - currently under construction */}
        {/* <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Security settings coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
