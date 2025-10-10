"use client";

import { authClient } from "@/lib/auth-client";

export default function Page() {
  const handleSignup = async () => {
    const data = {
      name: "amitkys",
      email: "amitkys@gmail.com",
      password: "123456sdfsdfadflasf",
    };

    await authClient.signUp.email(
      {
        ...data,
      },
      {
        onSuccess: () => {
          alert("success");
        },
      },
    );
  };

  return <button onClick={handleSignup}>signup</button>;
}
