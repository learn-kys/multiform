"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

import { useDeviceSize } from "@/components/hooks/use-device-size";

export default function ToasterWrapper() {
  const { theme, systemTheme } = useTheme();

  // Determine the *active* theme
  const activeTheme = theme === "system" ? systemTheme : theme;

  // Determine the *opposite* theme
  const oppositeTheme =
    activeTheme === "dark"
      ? "light"
      : activeTheme === "light"
        ? "dark"
        : "system";

  const { isSmall, isMedium } = useDeviceSize();

  return (
    <Toaster
      // icons={{
      //   error: (
      //     <IconAlertHexagon
      //       // Background color for the error icon should be 'destructive'
      //       className="text-destructive-foreground rounded-full"
      //       size={17}
      //       stroke={3}
      //     />
      //   ),
      //   info: <IconInfoHexagon size={17} stroke={3} />,
      // }}
      richColors
      position={isSmall || isMedium ? "top-center" : "bottom-center"}
      swipeDirections={["right", "left"]}
      theme={oppositeTheme}
      toastOptions={{
        className: "font-serif",
      }}
    />
  );
}
