"use client";
import React from "react";
import { Product } from "../ProductCard";
import ProductImage from "../ProductImg/ProducImage";

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: string) => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Modal Content */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        {/* Product Image */}
        <div className="w-full h-80 flex items-center justify-center overflow-hidden rounded-xl">
          <ProductImage
            src={`http://139.59.65.41/${product.product_image}`}
            alt={product.product_name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <h2 className="text-2xl font-bold mb-2">{product.product_name}</h2>
        <p className="text-gray-800 dark:text-gray-500 mb-4">
          {product.product_description}
        </p>

        {product.product_features && (
          <div className="mb-4">
            <h4 className="font-semibold">Features:</h4>
            <p className="text-sm text-gray-700 dark:text-gray-500">
              {product.product_features}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <span className="text-2xl font-bold text-primary">
            Rs.{product.product_price}
          </span>
          <span
            className={`text-sm px-3 py-1 rounded-full ${
              product.availability_status.toLowerCase() === "in stock"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.availability_status}
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Close
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
