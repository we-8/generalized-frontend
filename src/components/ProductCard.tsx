import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import StarRating from "./StarRating";
import AddToCartButton from "./AddToCartButton";
import ProductImage from "./ProductImg/ProducImage";

export interface Product {
  product_id: string;
  product_name: string;
  product_description: string;
  product_features: string;
  product_price: string;
  availability_status: string;
  product_image: string;
  category: string;
  ratings: Array<{ rating_count: number }>;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const isAvailable = product.availability_status.toLowerCase() === "in stock";
  
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 bg-card border-border">
      <div className="relative overflow-hidden">
        <ProductImage src={product.product_image} alt={product.product_name} />
        <div className="absolute top-2 right-2">
          <Badge
            variant={isAvailable ? "default" : "destructive"}
            className={`
              ${
                isAvailable
                  ? "bg-success text-success-foreground"
                  : "bg-destructive text-destructive-foreground"
              }
            `}
          >
            {product.availability_status}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-card-foreground line-clamp-1">
            {product.product_name}
          </h3>

          <StarRating ratings={product.ratings} />

          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.product_description}
          </p>

          {product.product_features && (
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Features: </span>
              {product.product_features}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">
            ₹{product.product_price}
          </div>
        </div>

        <AddToCartButton
          isAvailable={isAvailable}
          onClick={() => onAddToCart?.(product.product_id)}
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;