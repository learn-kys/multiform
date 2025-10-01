import prisma from "@/lib/db";
export default async function Page() {
  const user = await prisma.user.findFirst({
    where: { name: "John Doe" },
  });

  return <div>{user?.name}</div>;
}
