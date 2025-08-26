"use client";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation"; // Next.js router
import { useToast } from "@/hooks/use-toast";
import React from "react";

interface CheckOutProps {
  title: string;
  
}

const CheckOut = ({ title }: CheckOutProps) => {
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const { cart, getCartTotal } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const handleCheckout = async () => {
    if (!userId) {
      toast({
        title: "Login Required",
        description: "Please login to proceed.",
      });
      router.push("/sign-in");
      return;
    }

    if (!cart || cart.items.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Add items to your cart first.",
      });
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create the order
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          total_price: getCartTotal().toString(),
          status: "pending",
          address: "User address here", // replace with actual address
          number: "User number here", // replace with actual number
          user_id: userId,
        }),
      });

      if (!orderResponse.ok) throw new Error("Failed to create order");

      const orderData = await orderResponse.json();
      const orderId = orderData.id || orderData.order_id; // depending on API

      // 2️⃣ Create order items
      const itemsPromises = cart.items.map((item) =>
        fetch("/api/order-items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            quantity: item.quantity,
            price: item.product_price,
            product_id: item.product_id,
            order_id: orderId,
          }),
        })
      );

      await Promise.all(itemsPromises);

      toast({
        title: "Order Successful",
        description: "Your order has been placed!",
      });
      // Optionally redirect to order confirmation page
      router.push("/orders");//////
    } catch (error: unknown) {
      let message = "Something went wrong";
      if (error instanceof Error) {
        message = error.message;
      }
      toast({ title: "Error", description: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 transition-all duration-200 hover:scale-105 shadow-md flex items-center justify-center gap-2"
    >
      <CreditCard className="h-5 w-5" />
      {loading ? "Processing..." : title}
    </Button>
  );
};

export default CheckOut;
