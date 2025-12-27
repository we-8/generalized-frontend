import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface AddToCartButtonProps {
  isAvailable: boolean;
  productId: string;
  productName: string;
  productDescription: string;
  productPrice: string;
  productImage: string;
  quantity: number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AddToCartButton = ({
  isAvailable,
  productId,
  productName,
  productDescription,
  productPrice,
  productImage,
  quantity,
  onClick,
}: AddToCartButtonProps) => {
  const { addToCart } = useCart();
  // ✅ Use LOCAL loading state instead of global one
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isAvailable && !isLoading) {
      setIsLoading(true);
      try {
        await addToCart(
          productId,
          productName,
          productDescription,
          productPrice,
          productImage,
          quantity
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      } finally {
        setIsLoading(false);
      }
    }

    onClick?.(event);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={!isAvailable || isLoading}
      variant={isAvailable ? "default" : "outline"}
      className={`
        w-full transition-all duration-200 flex items-center gap-2
        ${
          isAvailable
            ? "bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 shadow-md"
            : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed hover:scale-100"
        }
      `}
    >
      <ShoppingCart className="h-4 w-4" />
      {isLoading ? "Adding..." : isAvailable ? "Add to Cart" : "Out of Stock"}
    </Button>
  );
};

export default AddToCartButton;