import React from "react";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className="flex items-center justify-center min-h-screen">
      {children}
      <Toaster />
    </main>
  );
}
