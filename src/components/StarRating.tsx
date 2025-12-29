import React from "react";
import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating?: number; // Average rating value (0-5), optional with default
  size?: number; // Icon size
  showValue?: boolean; // Show numeric value
}

const StarRating: React.FC<StarRatingProps> = ({
  rating = 0, // Default to 0 if undefined
  size = 20,
  showValue = false,
}) => {
  // Ensure rating is a valid number and between 0 and 5
  const validRating = typeof rating === "number" && !isNaN(rating) ? rating : 0;
  const clampedRating = Math.max(0, Math.min(5, validRating));

  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          size={size}
          className="fill-yellow-400 text-yellow-400"
        />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <StarHalf size={size} className="fill-yellow-400 text-yellow-400" />
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={size} className="text-gray-300" />
      ))}

      {/* Optional rating value */}
      {showValue && (
        <span className="ml-2 text-sm font-medium text-muted-foreground">
          {clampedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
