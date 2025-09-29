"use client";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import React from "react";

interface CheckOutProps {
  title: string;
  total: number;
}

const CheckOut = ({ title, total }: CheckOutProps) => {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
    setToken(localStorage.getItem("token"));
  }, []);

  const openWhatsApp = (businessPhone: string, message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `https://wa.me/${businessPhone}?text=${encodedMessage}`;
    } else {
      window.open(
        `https://web.whatsapp.com/send?phone=${businessPhone}&text=${encodedMessage}`,
        "_blank"
      );
    }
  };

  const handleCheckout = async () => {
    if (!userId || !token) {
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
      const orderResponse = await fetch("http://139.59.65.41/v1/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          total_price: Number(total.toFixed(2)),
          status: "pending",
          address: "User address here",
          number: "User number here",
          user_id: userId,
        }),
      });

    

      if (!orderResponse.ok) throw new Error("Failed to create order");
  
      const orderData = await orderResponse.json();
      console.log("Order Response:", orderData);

      const orderId = orderData.order_id;

      // 2️⃣ Create order items
      const itemsPromises = cart.items.map((item) =>
        fetch("http://139.59.65.41/v1/order_items/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
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
      await clearCart();

      // 3️⃣ Open WhatsApp with message (order ID + product name + quantity)
      const cartItems = cart.items
        .map((item) => `${item.product_name} x${item.quantity}`)
        .join("\n");

      const whatsappMessage = `Hello! I'd like to place an order (Order ID: ${orderId}):\n${cartItems}`;
      const businessPhone = "94702182114";

      openWhatsApp(businessPhone, whatsappMessage);

      toast({
        title: "Order Successful",
        description: "Your order has been placed!",
      });

      router.push("/");
    } catch (error: unknown) {
      let message = "Something went wrong";
      if (error instanceof Error) message = error.message;
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
