import { Cashew } from "@/assets";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src?: string;
  alt: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(src || Cashew);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={500}
      height={500}
      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      onError={() => setImgSrc(Cashew)}
      unoptimized
    />
  );
};

export default ProductImage;
