"use client";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CheckOutProps {
  total: number;
}

const CheckOut = ({ total }: CheckOutProps) => {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);

  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");

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
    // Step 1 → Expand
    if (!showForm) {
      setShowForm(true);
      return;
    }

    // Step 2 → Validate & submit
    if (!phone || !address) {
      toast({
        title: "Missing Information",
        description: "Please enter phone number and address.",
      });
      return;
    }

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
      // 1️⃣ Create order
      const orderResponse = await fetch("http://139.59.65.41/v1/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          total_price: Number(total.toFixed(2)),
          status: "pending",
          address,
          number: phone,
          user_id: userId,
        }),
      });

      if (!orderResponse.ok) throw new Error("Failed to create order");

      const orderData = await orderResponse.json();
      const orderId = orderData.order_id;

      // 2️⃣ Order items
      await Promise.all(
        cart.items.map((item) =>
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
        )
      );

      await clearCart();

      // 3️⃣ WhatsApp
      const cartItems = cart.items
        .map((item) => `${item.product_name} x${item.quantity}`)
        .join("\n");

      openWhatsApp(
        "94702182114",
        `Hello! I'd like to place an order (Order ID: ${orderId}):\n${cartItems}`
      );

      toast({
        title: "Order Successful",
        description: "Your order has been placed!",
      });

      router.push("/");
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };
  const isFormInvalid = showForm && (!phone.trim() || !address.trim());


  return (
    <div className="space-y-4">
      {showForm && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
          <div>
            <Label>Phone Number</Label>
            <Input
              required
              placeholder="07XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <Label>Delivery Address</Label>
            <Input
              required
              placeholder="Enter delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
      )}

      <Button
        onClick={handleCheckout}
        disabled={loading || isFormInvalid}
        className={`w-full font-semibold py-3 px-6 transition-all duration-200 shadow-md flex items-center justify-center gap-2
    ${isFormInvalid ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
    bg-primary hover:bg-primary/90 text-primary-foreground`}
      >
        <CreditCard className="h-5 w-5" />
        {loading ? "Processing..." : showForm ? "Checkout" : "Proceed"}
      </Button>
    </div>
  );
};

export default CheckOut;
