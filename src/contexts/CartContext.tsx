"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
  cart_item_id: string;
  product_id: string;
  quantity: number;
  cart_id: string;
  // Additional product info for display
  product_name: string;
  product_description: string;
  product_price: string;
  product_image: string;
}

export interface Cart {
  cart_id: string;
  user_id: string;
  items: CartItem[];
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (
    productId: string,
    productName: string,
    productDescription: string,
    productPrice: string,
    productImage: string
  ) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Mock API functions - replace with your actual API calls
const mockApiCall = (fn: () => any, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fn()), delay);
  });
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Initialize cart
  useEffect(() => {
    const initializeCart = async () => {
      setLoading(true);
      try {
        // Mock: Create or fetch existing cart
        const mockCart: Cart = {
          cart_id: generateId(),
          user_id: "mock-user-id",
          items: [],
        };
        setCart(mockCart);
      } catch (error) {
        console.error("Error initializing cart:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeCart();
  }, []);

  const addToCart = async (
    productId: string,
    productName: string,
    productDescription: string,
    productPrice: string,
    productImage: string
  ) => {
    if (!cart) return;

    setLoading(true);
    try {
      await mockApiCall(() => {
        // Check if item already exists
        const existingItem = cart.items.find(
          (item) => item.product_id === productId
        );

        if (existingItem) {
          // Update quantity
          const updatedItems = cart.items.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          setCart({ ...cart, items: updatedItems });
        } else {
          // Add new item
          const newItem: CartItem = {
            cart_item_id: generateId(),
            product_id: productId,
            quantity: 1,
            cart_id: cart.cart_id,
            product_name: productName,
            product_description: productDescription,
            product_price: productPrice,
            product_image: productImage,
          };
          setCart({ ...cart, items: [...cart.items, newItem] });
        }
      });

      toast({
        title: "Added to Cart",
        description: `${productName} has been added to your cart.`,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    if (!cart) return;

    setLoading(true);
    try {
      await mockApiCall(() => {
        const updatedItems = cart.items.filter(
          (item) => item.cart_item_id !== cartItemId
        );
        setCart({ ...cart, items: updatedItems });
      });

      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart.",
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (!cart || quantity < 1) return;

    setLoading(true);
    try {
      await mockApiCall(() => {
        const updatedItems = cart.items.map((item) =>
          item.cart_item_id === cartItemId ? { ...item, quantity } : item
        );
        setCart({ ...cart, items: updatedItems });
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!cart) return;

    setLoading(true);
    try {
      await mockApiCall(() => {
        setCart({ ...cart, items: [] });
      });

      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart.",
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast({
        title: "Error",
        description: "Failed to clear cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    if (!cart) return 0;
    return cart.items.reduce((total, item) => {
      return total + parseFloat(item.product_price) * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    if (!cart) return 0;
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
