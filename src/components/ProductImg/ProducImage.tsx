import { Cashew } from "@/assets";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string; // allow custom styling
  width?: number;
  height?: number;
  fit?: "cover" | "contain"; // optional control over object-fit
}

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = "w-full h-48", // default size
  width = 500,
  height = 500,
  fit = "cover",
}) => {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(src || Cashew);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={`${className} object-${fit} transition-transform duration-300 group-hover:scale-110`}
     
      unoptimized
    />
  );
};

export default ProductImage;
