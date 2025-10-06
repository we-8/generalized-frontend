"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// Update the import path below if the actual location or filename is different
import { Input } from "@/components/ui/input";
import { Herobanner } from "@/components";
import { home_banner } from "@/assets";
import { Textarea } from "@/components/ui/textarea";

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
      const response = await fetch("http://139.59.65.41/v1/products/", {
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

      const response = await fetch("http://139.59.65.41/v1/ratings/", {
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
        className={`text-5xl transition-colors ${
          state.rating && state.rating >= value
            ? "text-price-special"
            : "text-muted hover:text-price-special/50"
        }`}
        onClick={() => handleRatingSelect(value)}
        type="button"
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

      {/* Review Form */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        {isCheckingAuth ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Loading...</h2>
            <p className="text-muted-foreground">Checking authentication...</p>
          </div>
        ) : !isAuthenticated ? (
          <div className="text-center bg-card rounded-lg p-8 shadow-lg border border-border">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-muted-foreground mb-6">
              Please log in to submit a review
            </p>
            <Button
              onClick={() => {
                window.location.href = "/sign-in";
              }}
            >
              Go to Login
            </Button>
          </div>
        ) : (
          <div className="bg-card rounded-lg p-8 shadow-lg border border-border">
            <h2 className="text-3xl font-bold mb-2 text-center">
              How do you feel about this product?
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Your input is valuable in helping us better understand your needs
              and tailor our services accordingly
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div className="flex justify-center gap-2">{renderStars()}</div>

              {/* Product Name Input */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter product name..."
                  value={state.header}
                  onChange={handleHeaderChange}
                  maxLength={100}
                  required
                />
              </div>

              {/* Comment textarea */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Review
                </label>
                <Textarea
                  placeholder="Add a comment..."
                  value={state.comment}
                  onChange={handleCommentChange}
                  maxLength={500}
                  rows={6}
                />
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isSubmitting || !state.rating}
                className="mx-auto block w-[150px] border border-gray-400 text-black hover:bg-color-gray-500 transition-all duration-300"
                size="lg"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default Review;
