import { Spinner } from "@/components/ui/spinner";

// use size 8 on normal (blank) page
export function GenericLoader({ className }: React.ComponentProps<"div">) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner className={className} />
    </div>
  );
}
