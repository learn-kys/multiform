import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-sidebar/60 shadow backdrop-blur supports-[backdrop-filter]:bg-sidebar/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          Built on top of{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://ui.shadcn.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            shadcn/ui
          </Link>
          . The source code is available on{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://github.com/salimi-my/shadcn-ui-sidebar"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
