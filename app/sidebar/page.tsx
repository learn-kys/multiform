import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <ContentLayout title="Test">
      <div className="flex min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]  items-center justify-center">
        <p className="text-2xl font-bold">This is sidebar</p>
        <Input />
      </div>
    </ContentLayout>
  );
}
