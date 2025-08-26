"use client";

import { CartProvider } from "@/contexts/CartContext";
import Navbar from "./Navbar";

const WrappedNavbar = () => {
  return (
    <CartProvider>
      <Navbar />
    </CartProvider>
  );
};

export default WrappedNavbar;
