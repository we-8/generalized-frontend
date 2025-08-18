import { Star } from "lucide-react";

interface StarRatingProps {
  ratings: Array<{ rating_count: number }>;
}

const StarRating = ({ ratings }: StarRatingProps) => {
  // Calculate average rating from ratings array (index + 1 = star value)
  const calculateAverageRating = () => {
    if (!ratings || ratings.length === 0) return 0;
    
    const totalRatings = ratings.reduce((sum, rating) => sum + rating.rating_count, 0);
    if (totalRatings === 0) return 0;
    
    const weightedSum = ratings.reduce((sum, rating, index) => {
      return sum + (rating.rating_count * (index + 1));
    }, 0);
    
    return weightedSum / totalRatings;
  };

  const averageRating = calculateAverageRating();
  const totalReviews = ratings?.reduce((sum, rating) => sum + rating.rating_count, 0) || 0;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= averageRating 
              ? "fill-accent text-accent" 
              : "text-muted-foreground"
          }`}
        />
      ))}
      {totalReviews > 0 && (
        <span className="text-sm text-muted-foreground ml-1">
          ({totalReviews} reviews)
        </span>
      )}
    </div>
  );
};

export default StarRating;