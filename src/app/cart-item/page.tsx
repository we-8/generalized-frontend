"use client";
import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import TitleL from "@/components/cart/TitleL";
import RemoveButton from "@/components/cart/RemoveButton";
import CheckOut from "@/components/cart/CheckOut";
import BackToShop from "@/components/cart/BackToShop";
import QuantitySelector from "@/components/cart/QuantitySelector";
import { useCurrency } from "@/hooks/useCurrency";

const Cart = () => {
  const {
    cart: cartFromContext,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCart();
  const cart = cartFromContext ?? { items: [] };
  const [selectedCurrency, setSelectedCurrency] = useState("LKR");
  const { formatPrice } = useCurrency(selectedCurrency);

  const radioButtons = [
    { htmlfor: "LKR", label: "LKR", value: "LKR" },
    { htmlfor: "EUR", label: "EUR", value: "EUR" },
    { htmlfor: "USD", label: "USD", value: "USD" },
    { htmlfor: "AUD", label: "AUD", value: "AUD" },
  ];

  const handleOptionChange = (value: string) => {
    setSelectedCurrency(value);
  };

  const calculateItemTotal = (price: string, quantity: number) => {
    const lkrTotal = parseFloat(price) * quantity;
    return formatPrice(lkrTotal).replace(/[^0-9.]/g, "");
  };

  // All calculations remain in LKR for checkout
  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        <TitleL title="Your shopping cart" />

        {cart.items.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Add some products to get started!
            </p>
            <BackToShop title="Start Shopping" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="bg-card border-border shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {cart.items.map((item, index) => (
                      <div key={item.cart_item_id}>
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              src={`http://139.59.65.41/${item.product_image}`}
                              alt={item.product_name}
                              className="w-20 h-20 object-cover rounded-lg border border-border"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-card-foreground line-clamp-1">
                              {item.product_name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {item.product_description}
                            </p>
                          </div>

                          <div className="flex items-center space-x-4">
                            <QuantitySelector
                              value={item.quantity}
                              onChange={(quantity) =>
                                updateQuantity(item.cart_item_id, quantity)
                              }
                            />

                            <div className="text-right min-w-0">
                              <p className="text-lg font-bold text-primary">
                                {formatPrice(
                                  parseFloat(item.product_price) * item.quantity
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatPrice(parseFloat(item.product_price))} /
                                per item
                              </p>
                            </div>

                            <RemoveButton
                              title="Remove"
                              onClick={() => removeFromCart(item.cart_item_id)}
                            />
                          </div>
                        </div>

                        {index < cart.items.length - 1 && (
                          <Separator className="mt-6" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary & Currency */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card className="bg-card border-border shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-card-foreground mb-4">
                    Order Summary
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="font-medium">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Shipping cost:
                      </span>
                      <span className="font-medium">
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <CheckOut title="Proceed to Checkout" total={total} />
                    <BackToShop title="Continue Shopping" />
                  </div>
                </CardContent>
              </Card>

              {/* Currency Selection */}
              <Card className="bg-card border-border shadow-lg">
                <CardContent className="p-6">
                  <TitleL title="Currency" />
                  <RadioGroup
                    value={selectedCurrency}
                    onValueChange={handleOptionChange}
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {radioButtons.map((item) => (
                        <div
                          key={item.value}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={item.value}
                            id={item.htmlfor}
                            className="border-primary text-primary"
                          />
                          <Label
                            htmlFor={item.htmlfor}
                            className="text-sm font-medium text-foreground cursor-pointer"
                          >
                            {item.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
