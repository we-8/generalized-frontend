import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import StarRating from "./StarRating";
import ProductImage from "./ProductImg/ProducImage";
import QuantitySelector from "./cart/QuantitySelector";
import AddToCartButton from "./AddToCartButton";

export interface Product {
  product_id: string;
  product_name: string;
  product_description: string;
  product_features: string;
  product_price: string;
  availability_status: string;
  product_image: string;
  category: string;
  ratings: { rating_count: number }[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onClick?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onClick }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const isAvailable = product.availability_status.toLowerCase() === "in stock";

  // Calculate total price based on quantity
  const totalPrice = parseFloat(product.product_price) * quantity;

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 bg-white from-card via-card to-card/95 border border-border/50 backdrop-blur-sm cursor-pointer"
      onClick={() => onClick?.(product)}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-secondary/30 to-accent/10">
        <ProductImage
          src={`http://139.59.65.41/${product.product_image}`}
          alt={product.product_name}
          className="h-64"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <Badge
            variant={isAvailable ? "default" : "destructive"}
            className={`
              shadow-lg backdrop-blur-sm font-medium px-3 py-1 text-xs
              ${
                isAvailable
                  ? "bg-green-600 text-white border-green-500"
                  : "bg-red-600 text-white border-red-500"
              }
            `}
          >
            {product.availability_status}
          </Badge>
        </div>
        <div className="absolute inset-0 ring-1 ring-border/20 rounded-t-lg" />
      </div>
      <CardContent className="p-6 space-y-4 relative">
        <div className="space-y-3">
          <h3 className="font-bold text-xl text-card-foreground line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {product.product_name}
          </h3>

          <div className="flex items-center gap-2">
            <StarRating ratings={product.ratings} />
            <span className="text-xs text-muted-foreground/80"></span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {product.product_description}
          </p>

          {product.product_features && (
            <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
              <div className="text-xs text-foreground/90">
                <span className="font-semibold text-primary">Features: </span>
                <span className="text-muted-foreground">
                  {product.product_features}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-border/30">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">
                Rs.{totalPrice.toFixed(2)}
              </div>
              {quantity > 1 && (
                <div className="text-xs text-muted-foreground">
                  Rs.{product.product_price} x {quantity}
                </div>
              )}
              <div className="text-xs text-muted-foreground">Best Price</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-success font-medium">
                ✓ Fast Delivery
              </div>
              <div className="text-xs text-muted-foreground">Free Shipping</div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-foreground">
              Quantity:
            </span>
            <div onClick={(e) => e.stopPropagation()}>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                size="sm"
                min={1}
                max={10}
              />
            </div>
          </div>

          <AddToCartButton
            isAvailable={isAvailable}
            productId={product.product_id}
            productName={product.product_name}
            productDescription={product.product_description}
            productPrice={product.product_price}
            productImage={product.product_image}
            quantity={quantity}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
