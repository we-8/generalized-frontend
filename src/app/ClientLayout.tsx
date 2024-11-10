'use client';

import { Navbar, Footer } from "@/layouts";
import { usePathname } from "next/navigation";
import React from "react";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname() || ""; // Fallback for null
  const noLayoutRoutes = ['/sign-in', '/sign-up'];
  const showLayout = !noLayoutRoutes.includes(pathname);

  return (
    <>
      {showLayout && <Navbar />}
      {children}
      {showLayout && <Footer />}
    </>
  );
}
