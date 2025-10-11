import { Spinner } from "@/components/ui/spinner";

export function GenericLoader({ className }: React.ComponentProps<"div">) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner className={className} />
    </div>
  );
}
