"use client";

import { Download, CheckCircle2, Copy } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  password?: string;
}

export function RegistrationDialog({
  isOpen,
  onClose,
  userId,
  password,
}: RegistrationDialogProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleDownload = () => {
    if (userId && password) {
      const element = document.createElement("a");
      const file = new Blob(
        [
          `User_ID: ${userId}
Password: ${password}

⚠️ Important: Keep these credentials safe and secure.
Do not share them with anyone.`,
        ],
        {
          type: "text/plain",
        },
      );

      element.href = URL.createObjectURL(file);
      element.download = "credentials.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      URL.revokeObjectURL(element.href);
    }
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleGoToLogin = () => {
    // onClose();
        window.open("/login", "_self");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <DialogTitle className="text-center text-2xl">
            Registration Successful!
          </DialogTitle>
          <DialogDescription className="text-center">
            Please save your credentials securely before proceeding.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              User ID
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-lg border bg-muted/50 p-2 font-mono text-sm">
                {userId}
              </div>
              <button
                aria-label="Copy User ID"
                className="rounded-lg border p-3 hover:bg-accent transition-colors"
                onClick={() => handleCopy(userId || "", "userId")}
              >
                {copiedField === "userId" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Password
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-lg border bg-muted/50 p-2  font-mono text-sm">
                {password}
              </div>
              <button
                aria-label="Copy Password"
                className="rounded-lg border p-3 hover:bg-accent transition-colors"
                onClick={() => handleCopy(password || "", "password")}
              >
                {copiedField === "password" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button className="w-full sm:w-auto" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            Download Credentials
          </Button>
          {/* <DialogClose asChild> */}
          <Button
            className="w-full sm:w-auto"
            variant={"outline"}
            onClick={handleGoToLogin}
          >
            Go to Login
          </Button>
          {/* </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
