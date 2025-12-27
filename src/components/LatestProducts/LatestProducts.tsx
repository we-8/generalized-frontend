"use client";
import React, { useRef, useState, useEffect } from "react";
import "../../styles/components-css/LatestProducts.css";
import { test3 } from "@/assets";
import { TitleL } from "../Title/Title";
import { OrderNow2 } from "../CommonButtons/CommonButtons";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRouter } from "next/navigation";


// Type definitions
interface BackendProduct {
  product_id: string;
  product_name: string;
  product_description: string;
  product_features: string;
  product_price: string;
  availability_status: string;
  product_image: string;
  category: string;
  special_offers: boolean;
  whats_new: boolean;
}

interface TransformedLatestProduct {
  id?: string;
  productName: string;
  new_price: string;
  description: string;
  image: any;
  features: string;
  availability: string;
}

const LatestProducts = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [products, setProducts] = useState<TransformedLatestProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch products with whats_new: true
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://ceylonrichproducts.lk/v1/products/");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: BackendProduct[] = await response.json();

        // DEBUG: Log the actual response to see what fields are coming from backend
        console.log("Latest Products - Backend response:", data);
        console.log("Latest Products - First product:", data[0]);
        console.log(
          "Latest Products - Fields in first product:",
          Object.keys(data[0] || {})
        );

        // Check if whats_new field exists in the response
        if (data.length > 0) {
          const hasWhatsNewField = "whats_new" in data[0];
          console.log("Has whats_new field:", hasWhatsNewField);

          if (!hasWhatsNewField) {
            console.warn("whats_new field is missing from API response!");
            // TEMPORARY FIX: Since backend doesn't return whats_new field,
            // we'll show first 5 products as latest products for now

            const latestProducts = data.slice(0, 5);

            const transformedProducts: TransformedLatestProduct[] =
              latestProducts.map((product: BackendProduct) => ({
                id: product.product_id,
                productName: product.product_name,
                new_price: `Rs ${product.product_price}`,
                description: product.product_description,
                image: product.product_image
                  ? `https://ceylonrichproducts.lk/${product.product_image}`
                  : test3,
                features: product.product_features,
                availability: product.availability_status,
              }));

            setProducts(transformedProducts);
            return;
          }
        }

        // Filter products that have whats_new: true (original logic)
        const latestProducts = data.filter((product: BackendProduct) => {
          console.log(
            `Product: ${product.product_name}, whats_new: ${product.whats_new}`
          );
          return product.whats_new === true;
        });

        console.log("Filtered latest products:", latestProducts);

        // Transform the data to match your component structure
        const transformedProducts: TransformedLatestProduct[] =
          latestProducts.map((product: BackendProduct) => ({
            id: product.product_id,
            productName: product.product_name,
            new_price: `Rs ${product.product_price}`,
            description: product.product_description,
            // Use correct server path for product images
            image: product.product_image
              ? `https://ceylonrichproducts.lk/${product.product_image}`
              : test3,
            features: product.product_features,
            availability: product.availability_status,
          }));

        setProducts(transformedProducts);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        console.error("Error fetching latest products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  const settings = {
    infinite: products.length > 1, // Only infinite if more than 1 product
    speed: 500,
    arrows: false,
    slidesToShow: Math.min(3, products.length), // Don't show more slides than products
    slidesToScroll: 1, // Changed to 1 for better control
    pauseOnHover: true,
    autoplay: false, // Disable autoplay to prevent issues
    swipeToSlide: true,
    variableWidth: false, // Ensure consistent width
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: Math.min(2, products.length),
          slidesToScroll: 1,
          infinite: products.length > 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, products.length),
          slidesToScroll: 1,
          infinite: products.length > 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, products.length),
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  // Loading state
  if (loading) {
    return (
      <div className="app__latestProducts--main-div">
        <TitleL title="What's New" />
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading latest products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="app__latestProducts--main-div">
        <TitleL title="What's New" />
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          <p>Error loading latest products: {error}</p>
        </div>
      </div>
    );
  }

  // No products state
  if (products.length === 0) {
    return (
      <div className="app__latestProducts--main-div">
        <TitleL title="What's New" />
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>No new products available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-background">
      <div className="w-full px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
          What&apos;s New
        </h2>

        <div className="relative">
          {products.length > 2 && (
            <>
              <button
                className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 items-center justify-center rounded-full bg-card border-2 border-border hover:bg-accent hover:border-accent transition-all duration-300 shadow-lg"
                onClick={() => sliderRef.current?.slickPrev()}
                aria-label="Previous product"
              >
                <IoIosArrowBack className="text-2xl text-foreground" />
              </button>

              <button
                className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 items-center justify-center rounded-full bg-card border-2 border-border hover:bg-accent hover:border-accent transition-all duration-300 shadow-lg"
                onClick={() => sliderRef.current?.slickNext()}
                aria-label="Next product"
              >
                <IoIosArrowForward className="text-2xl text-foreground" />
              </button>
            </>
          )}

          <Slider ref={sliderRef} {...settings}>
            {products.map((product) => (
              <div
                key={product.id}
                className="px-4 py-2"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                <div className="group relative bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border h-[320px]">
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Image Section - Fixed width and height */}
                    <div className="md:w-2.5/5 relative overflow-hidden bg-muted h-48 md:h-full flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content Section - Flexible */}
                    <div className="md:w-2.5/5 p-6 md:p-8 flex flex-col justify-center relative overflow-hidden flex-grow">
                      {/* Default State */}
                      <div className="transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-4">
                        <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-2 line-clamp-3">
                          {product.productName}
                        </h3>
                        <div className="flex items-center gap-2 mt-4">
                          <span className="inline-block px-3 py-1 bg-accent/10 text-accent-foreground text-sm font-medium rounded-full">
                            {product.availability}
                          </span>
                        </div>
                      </div>

                      {/* Hover State */}
                      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center bg-primary/95 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-full group-hover:translate-y-0">
                        <h3 className="text-lg md:text-xl font-bold text-primary-foreground mb-3 line-clamp-2">
                          {product.productName}
                        </h3>
                        <p className="text-primary-foreground/90 text-sm leading-relaxed mb-4 line-clamp-3">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-2xl md:text-3xl font-bold text-accent">
                            {product.new_price}
                          </span>
                          <span className="px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-xs font-semibold">
                            {product.availability}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
