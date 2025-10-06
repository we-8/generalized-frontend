"use client";

import { useRef, useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface BackendProduct {
  id?: string;
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

interface TransformedSpecialProduct {
  id?: string;
  productName: string;
  new_price: string;
  old_price: string;
  description: string;
  image: string;
  features: string;
  availability: string;
}

const SpecialOffers = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [products, setProducts] = useState<TransformedSpecialProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const calculateOldPrice = (currentPrice: string): string => {
    const price = parseFloat(currentPrice);
    const discountPercentage = 0.2;
    const oldPrice = price / (1 - discountPercentage);
    return Math.round(oldPrice).toString();
  };

  useEffect(() => {
    const fetchSpecialOfferProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://139.59.65.41/v1/products/");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: BackendProduct[] = await response.json();

        if (data.length > 0) {
          const hasSpecialOffersField = "special_offers" in data[0];

          if (!hasSpecialOffersField) {
            const specialProducts = data.slice(0, 5);
            const transformedProducts: TransformedSpecialProduct[] =
              specialProducts.map((product: BackendProduct) => ({
                id: product.id,
                productName: product.product_name,
                new_price: product.product_price,
                old_price: calculateOldPrice(product.product_price),
                description: product.product_description,
                image: product.product_image
                  ? `http://139.59.65.41/${product.product_image}`
                  : "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=400&fit=crop",
                features: product.product_features,
                availability: product.availability_status,
              }));

            setProducts(transformedProducts);
            return;
          }
        }

        const specialProducts = data.filter(
          (product: BackendProduct) => product.special_offers === true
        );

        const transformedProducts: TransformedSpecialProduct[] =
          specialProducts.map((product: BackendProduct) => ({
            id: product.id,
            productName: product.product_name,
            new_price: product.product_price,
            old_price: calculateOldPrice(product.product_price),
            description: product.product_description,
            image: product.product_image
              ? `http://139.59.65.41/${product.product_image}`
              : "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=400&fit=crop",
            features: product.product_features,
            availability: product.availability_status,
          }));

        setProducts(transformedProducts);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        console.error("Error fetching special offer products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialOfferProducts();
  }, []);

  const settings = {
    infinite: products.length > 1,
    speed: 500,
    arrows: false,
    slidesToShow: Math.min(3, products.length),
    slidesToScroll: 1,
    pauseOnHover: true,
    autoplay: false,
    swipeToSlide: true,
    variableWidth: false,
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

  if (loading) {
    return (
      <section className="py-16 px-4 bg-background">
        <div className="w-full px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
            Special Offers
          </h2>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading special offers...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-background">
        <div className="w-full px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
            Special Offers
          </h2>
          <div className="text-center py-8">
            <p className="text-destructive">
              Error loading special offers: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-16 px-4 bg-background">
        <div className="w-full px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
            Special Offers
          </h2>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No special offers available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-background">
      <div className="w-full px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
          Special Offers
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
              <div key={product.id} className="px-4 py-2">
                <div className="relative bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border h-[320px]">
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Image Section */}
                    <div className="md:w-2.5/5 relative overflow-hidden bg-muted h-48 md:h-full flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="md:w-2.5/5 p-6 md:p-8 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-3 line-clamp-2">
                          {product.productName}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 ">
                          {product.description}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-baseline gap-3">
                          <span className="text-sm text-price-old line-through">
                            Rs {product.old_price}
                          </span>
                          <span className="text-3xl font-bold text-price-new">
                            Rs {product.new_price}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-3 py-1.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
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

export default SpecialOffers;
