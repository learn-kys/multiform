import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { IconUserFilled } from "@tabler/icons-react";

import { ProfileUpdateForm } from "./_components/profile-update";

import { auth } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session == null) {
    redirect("/signin");
  }

  return (
    <div>
      <Image
        alt="user avatar"
        height={64}
        src={session.user.image ?? "/globe.svg"}
        width={64}
      />
      <h1>{session.user.name}</h1>
      <p>{session.user.email}</p>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">
            <IconUserFilled stroke={2} />
            <span>Profile</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileUpdateForm user={session.user} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
