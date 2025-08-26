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
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AddToCartButton = ({
  isAvailable,
  productId,
  productName,
  productDescription,
  productPrice,
  productImage,
  onClick,
}: AddToCartButtonProps) => {
  const { addToCart, loading } = useCart();

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isAvailable && !loading) {
      await addToCart(
        productId,
        productName,
        productDescription,
        productPrice,
        productImage
      );
    }

    onClick?.(event);
  };
  return (
    <Button
      onClick={handleClick}
      disabled={!isAvailable || loading}
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
      {loading ? "Adding..." : isAvailable ? "Add to Cart" : "Out of Stock"}
    </Button>
  );
};

export default AddToCartButton;
