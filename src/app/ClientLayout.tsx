'use client';

import { Navbar, Footer } from "@/layouts";
import { usePathname } from "next/navigation";
import React from "react";
import { Providers } from "@/utils/providers"; // Add this import

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname() || "";
  const noLayoutRoutes = ['/sign-in', '/sign-up'];
  const showLayout = !noLayoutRoutes.includes(pathname);

  return (
    <Providers>
      {showLayout && <Navbar />}
      {children}
      {showLayout && <Footer />}
    </Providers>
  );
}