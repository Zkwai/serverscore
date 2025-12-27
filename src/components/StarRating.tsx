import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
}

const StarRating = ({ rating, maxRating = 5, size = "md", showNumber = false }: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="star-rating">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < rating ? "fill-primary text-primary" : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm font-semibold text-foreground ml-1">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};

export default StarRating;
