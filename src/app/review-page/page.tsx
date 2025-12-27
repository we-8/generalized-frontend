"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Herobanner } from "@/components";
import { home_banner } from "@/assets";

interface AppState {
  rating: number | null;
  header: string;
  comment: string;
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
  ratings: Array<{ rating_count: number }>;
}

const Review: React.FC = () => {
  const [state, setState] = useState<AppState>({
    rating: null,
    header: "",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("token") ||
      sessionStorage.getItem("authToken") ||
      sessionStorage.getItem("access_token");

    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setIsCheckingAuth(false);
  }, []);

  const getAuthHeaders = () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (authToken) {
      headers.Authorization = `Token ${authToken}`;
    }

    return headers;
  };

  const handleRatingSelect = (value: number) => {
    setState((prevState) => ({ ...prevState, rating: value }));
  };

  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, header: e.target.value }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState((prevState) => ({ ...prevState, comment: e.target.value }));
  };

  const fetchProducts = async (): Promise<Product[]> => {
    try {
      const response = await fetch("https://ceylonrichproducts.lk/v1/products/", {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const productsData = await response.json();
          return productsData;
        } else {
          throw new Error("Server returned non-JSON response");
        }
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("authToken");
        setIsAuthenticated(false);
        throw new Error("Session expired. Please log in again.");
      } else {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const findProductByTitle = (
    products: Product[],
    title: string
  ): Product | null => {
    return (
      products.find(
        (product) =>
          product.product_name &&
          title &&
          product.product_name.toLowerCase().trim() ===
            title.toLowerCase().trim()
      ) || null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !authToken) {
      alert("Please log in to submit a review");
      return;
    }

    if (!state.rating) {
      alert("Please select a rating");
      return;
    }

    if (!state.header.trim()) {
      alert("Please enter a product title");
      return;
    }

    setIsSubmitting(true);

    try {
      const productsData = await fetchProducts();
      setProducts(productsData);

      const matchedProduct = findProductByTitle(
        productsData,
        state.header.trim()
      );

      if (!matchedProduct) {
        alert(
          `Product "${state.header}" not found. Please check the product name.`
        );
        setIsSubmitting(false);
        return;
      }

      const payload = {
        product: matchedProduct.product_id,
        rating: state.rating,
        title: state.header,
        comment: state.comment,
      };

      const response = await fetch("https://ceylonrichproducts.lk/v1/ratings/", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          await response.json();
        }

        setState({
          rating: null,
          header: "",
          comment: "",
        });

        alert("Thank you for your review!");
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("authToken");
        setIsAuthenticated(false);
        alert("Session expired. Please log in again.");
      } else {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      if (error instanceof Error) {
        alert(`Failed to submit review: ${error.message}`);
      } else {
        alert("Failed to submit review. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((value) => (
      <button
        key={value}
        className={`text-5xl transition-all duration-300 ${
          state.rating && state.rating >= value
            ? "text-accent scale-110"
            : "text-muted hover:text-accent/60 hover:scale-110"
        }`}
        onClick={() => handleRatingSelect(value)}
        type="button"
        aria-label={`Rate ${value} stars`}
      >
        ★
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Herobanner
        backgroundImage={home_banner}
        title="Review Products"
        description="The real taste of Sri Lanka, delivered fresh to your doorstep."
      />

      <section className="max-w-4xl mx-auto px-8 py-16 md:py-24">
        {isCheckingAuth ? (
          <div className="text-center bg-card rounded-2xl p-16 shadow-strong border border-border">
            <h2 className="font-heading text-2xl font-bold mb-4 text-foreground">
              Loading...
            </h2>
            <p className="font-body text-muted-foreground">
              Checking authentication...
            </p>
          </div>
        ) : !isAuthenticated ? (
          <div className="text-center bg-card rounded-2xl p-16 shadow-strong border border-border">
            <h2 className="font-heading text-3xl font-bold mb-6 text-foreground">
              Authentication Required
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8">
              Please log in to submit a review
            </p>
            <Button
              className="mx-auto block w-[150px] border border-gray-400 text-black hover:bg-color-gray-500 transition-all duration-300"
              onClick={() => {
                window.location.href = "/sign-in";
              }}
            >
              Go to Login
            </Button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-brand-cream to-background rounded-2xl p-12 md:p-16 shadow-strong border border-border/50">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-center text-brand-warm">
              How do you feel about this product?
            </h2>
            <p className="font-body text-lg text-muted-foreground text-center mb-12 leading-relaxed">
              Your input is valuable in helping us better understand your needs
              and tailor our services accordingly
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Star Rating */}
              <div className="flex justify-center gap-3 py-4">
                {renderStars()}
              </div>

              {/* Product Name Input */}
              <div>
                <label className="block font-body text-base font-semibold mb-3 text-foreground">
                  Product Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter product name..."
                  value={state.header}
                  onChange={handleHeaderChange}
                  maxLength={100}
                  required
                  className="w-full text-base"
                />
              </div>

              {/* Comment textarea */}
              <div>
                <label className="block font-body text-base font-semibold mb-3 text-foreground">
                  Your Review
                </label>
                <Textarea
                  placeholder="Add a comment..."
                  value={state.comment}
                  onChange={handleCommentChange}
                  maxLength={500}
                  rows={6}
                  className="w-full text-base resize-none"
                />
              </div>

              {/* Submit button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !state.rating}
                  className="mx-auto block w-[150px] border border-gray-400 text-black hover:bg-color-gray-500 transition-all duration-300"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default Review;
