"use client";
import { useState, useEffect, useCallback } from "react";

const useCountdown = (
  storageKey: string,
  initialCountdown: number,
  email: string,
) => {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const storedData = localStorage.getItem(storageKey);

    if (storedData) {
      try {
        const { expiresAt, email: storedEmail } = JSON.parse(storedData);

        if (storedEmail === email) {
          const remaining = Math.max(
            0,
            Math.floor((expiresAt - Date.now()) / 1000),
          );

          if (remaining > 0) {
            setCountdown(remaining);
          } else {
            localStorage.removeItem(storageKey);
          }
        }
      } catch (e) {
        localStorage.removeItem(storageKey);
      }
    }
  }, [email, storageKey]);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        const newValue = prev - 1;

        if (newValue <= 0) {
          localStorage.removeItem(storageKey);

          return 0;
        }

        return newValue;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, storageKey]);

  const startCountdown = useCallback(() => {
    const expiresAt = Date.now() + initialCountdown * 1000;

    localStorage.setItem(storageKey, JSON.stringify({ expiresAt, email }));
    setCountdown(initialCountdown);
  }, [initialCountdown, storageKey, email]);

  return { countdown, startCountdown };
};

export default useCountdown;
