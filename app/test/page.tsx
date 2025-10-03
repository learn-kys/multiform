"use client";
import { toast } from "sonner";
export default function Page() {
  return (
    <button
      onClick={() =>
        toast.success("Something went wrong", {
          // duration: Infinity,
          // cancel: {
          //   label: "Close",
          //   onClick: () => {},
          // },
        })
      }
    >
      Test
    </button>
  );
}
