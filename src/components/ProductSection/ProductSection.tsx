"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { ProductFilter } from "../CommonButtons/CommonButtons";
import "../../styles/components-css/ProductSection.css";

import ProductCard, { Product } from "../ProductCard";
// import ProductDetailsModal from "../ProductDialog/ProductDialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


const ProductSection = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ category_name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://ceylonrichproducts.lk/v1/categories/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const apiCategories: { category_name: string }[] =
          await response.json();
        console.log("api data", apiCategories);

        setCategories([{ category_name: "All" }, ...apiCategories]);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast({
          title: "Error",
          description: "Failed to load categories. Please try again.",
          variant: "destructive",
        });
        setCategories([{ category_name: "All" }]); // Fallback
      }
    };

    fetchCategories();
  }, [toast]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch("https://ceylonrichproducts.lk/v1/products/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiData: Product[] = await response.json();
        console.log("Fetched Products:", apiData);

        setProducts(apiData);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  // 🔹 Filter products by category_name instead of category_id
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.product_name
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        product.product_description
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const aAvailable = a.availability_status.toLowerCase() === "in stock";
      const bAvailable = b.availability_status.toLowerCase() === "in stock";
      return aAvailable === bAvailable ? 0 : aAvailable ? -1 : 1;
    });

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.product_id === productId);
    if (product) {
      toast({
        title: "Added to Cart",
        description: `${product.product_name} has been added to your cart.`,
      });
    }
  };

  // const handleProductClick = (product: Product) => {
  //   setSelectedProduct(product);
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedProduct(null);
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Discover premium products from across the galaxy
          </h1>
        </div>

        {/* Filters Section */}
        <div className="bg-card rounded-xl shadow-md p-6 mb-8 border border-border">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="flex-1 w-full lg:w-auto justify-center lg:justify-start">
              <SearchBar
                value={searchInput}
                onChange={setSearchInput}
                placeholder="Search for products..."
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map((category) => (
                <ProductFilter
                  key={category.category_name}
                  title={category.category_name}
                  isSelected={selectedCategory === category.category_name}
                  onClick={() => handleCategoryClick(category.category_name)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.product_id}
                product={product}
                onAddToCart={handleAddToCart}
                onClick={() => router.push(`/product/${product.product_id}`)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-muted-foreground">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      /> */}
    </div>
  );
};

export default ProductSection;
