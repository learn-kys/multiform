import { useState, useEffect } from "react";

export function useDeviceSize() {
  const [deviceSize, setDeviceSize] = useState({
    isSmall: false,
    isMedium: false,
    isLarge: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setDeviceSize({
        isSmall: width < 768,
        isMedium: width >= 768 && width < 1024,
        isLarge: width >= 1024,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceSize;
}
