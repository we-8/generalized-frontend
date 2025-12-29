"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, Shield, RefreshCw } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import QuantitySelector from "@/components/cart/QuantitySelector";
import StarRating from "@/components/StarRating";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductImage from "@/components/ProductImg/ProducImage";

interface Rating {
  id: string;
  product: string;
  user: string;
  rating: number;
  title: string;
  comment: string;
  created_at: string;
}

interface Product {
  product_id: string;
  product_name: string;
  product_description: string;
  product_features: string;
  product_price: string;
  availability_status: string;
  product_image: string;
  category: string;
}

const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const { addToCart, cart } = useCart();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Fetch product by ID and its ratings
  useEffect(() => {
    if (!id) {
      router.push("/product");
      return;
    }

    const fetchProductAndRatings = async () => {
      try {
        setLoading(true);

        // Fetch all products
        const productsRes = await fetch(
          "https://ceylonrichproducts.lk/v1/products/"
        );
        if (!productsRes.ok) throw new Error("Failed to fetch products");

        const products: Product[] = await productsRes.json();
        const found = products.find((p) => p.product_id === id);

        if (found) {
          setProduct(found);

          // Fetch ratings for this specific product
          try {
            const ratingsRes = await fetch(
              `https://ceylonrichproducts.lk/v1/products/${id}/ratings/`
            );
            if (ratingsRes.ok) {
              const ratingsData: Rating[] = await ratingsRes.json();
              setRatings(ratingsData);
            }
          } catch (err) {
            console.error("Failed to fetch ratings:", err);
            // Continue without ratings if fetch fails
          }

          // Recommendations: same category, excluding current product
          const relatedProducts = products
            .filter(
              (p) =>
                p.category === found.category &&
                p.product_id !== found.product_id
            )
            .slice(0, 8);
          setRecommendations(relatedProducts);
        } else {
          toast({
            title: "Product not found",
            description: "The product you're looking for doesn't exist.",
            variant: "destructive",
          });
          router.push("/product");
        }
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to load product details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRatings();
  }, [id, router, toast]);

  // Sync quantity with cart
  useEffect(() => {
    if (product && cart) {
      const cartItem = cart.items.find(
        (item) => item.product_id === product.product_id
      );
      if (cartItem) setQuantity(cartItem.quantity);
    }
  }, [product, cart]);

  const handleAddToCart = () => {
    if (!product) return;

    const isAvailable =
      product.availability_status.toLowerCase() !== "out of stock";

    if (!isAvailable) {
      toast({
        title: "Out of Stock",
        description: "This product is currently unavailable.",
        variant: "destructive",
      });
      return;
    }

    addToCart(
      product.product_id,
      product.product_name,
      product.product_description,
      product.product_price,
      product.product_image,
      quantity
    );

    toast({
      title: "Added to Cart",
      description: `${product.product_name} (x${quantity}) has been added to your cart.`,
    });
  };

  // Calculate average rating
  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const isAvailable =
    product.availability_status.toLowerCase() !== "out of stock";
  const totalPrice = parseFloat(product.product_price) * quantity;

  let badgeClasses = "";
  if (product.availability_status.toLowerCase() === "in stock")
    badgeClasses = "bg-green-600 text-white";
  else if (product.availability_status.toLowerCase() === "limited stock")
    badgeClasses = "bg-yellow-500 text-black";
  else badgeClasses = "bg-red-600 text-white";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/product")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Product Image */}
          <Card className="overflow-hidden">
            <ProductImage
              src={`https://ceylonrichproducts.lk/${product.product_image}`}
              alt={product.product_name}
              className="h-[600px] w-full"
            />
          </Card>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className={`${badgeClasses} mb-4`}>
                {product.availability_status}
              </Badge>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {product.product_name}
              </h1>
              <div className="flex items-center gap-2">
                <StarRating rating={averageRating} />
                <span className="text-sm text-muted-foreground">
                  ({ratings.length}{" "}
                  {ratings.length === 1 ? "review" : "reviews"})
                </span>
              </div>
            </div>

            <div className="border-y border-border py-6">
              <div className="text-4xl font-bold text-primary mb-2">
                Rs.{totalPrice.toFixed(2)}
              </div>
              {quantity > 1 && (
                <div className="text-sm text-muted-foreground">
                  Rs.{product.product_price} x {quantity}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.product_description}
              </p>
            </div>

            {product.product_features && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Features</h3>
                <div className="bg-secondary/30 rounded-lg p-4 border border-border/30">
                  <p className="text-muted-foreground">
                    {product.product_features}
                  </p>
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={10}
                />
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isAvailable ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Secure Payment</p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {ratings.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Customer Reviews
            </h2>
            <div className="grid gap-4">
              {ratings.map((rating) => (
                <Card key={rating.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-lg">
                          {rating.title}
                        </h4>
                        <StarRating rating={rating.rating} />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(rating.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{rating.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              You May Also Like
            </h2>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {recommendations.map((rec) => (
                  <CarouselItem
                    key={rec.product_id}
                    className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <Card
                      className="group cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => router.push(`/product/${rec.product_id}`)}
                    >
                      <ProductImage
                        src={`https://ceylonrichproducts.lk/${rec.product_image}`}
                        alt={rec.product_name}
                        className="h-66"
                      />
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
                          {rec.product_name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-primary">
                            Rs.{rec.product_price}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
