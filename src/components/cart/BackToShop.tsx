"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ use Next.js router

interface BackToShopProps {
  title: string;
}

const BackToShop = ({ title }: BackToShopProps) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => router.push("/product")} // ✅ navigate with Next.js
      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      {title}
    </Button>
  );
};

export default BackToShop;
