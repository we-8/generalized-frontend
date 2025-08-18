import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  isAvailable: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}


const AddToCartButton = ({ isAvailable, onClick }: AddToCartButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={!isAvailable}
      variant={isAvailable ? "default" : "outline"}
      className={`
        w-full transition-all duration-200 flex items-center gap-2
        ${
          isAvailable
            ? "bg-primary hover:bg-primary-hover text-primary-foreground hover:scale-105 shadow-md"
            : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed hover:scale-100"
        }
      `}
    >
      <ShoppingCart className="h-4 w-4" />
      {isAvailable ? "Add to Cart" : "Out of Stock"}
    </Button>
  );
};

export default AddToCartButton;
