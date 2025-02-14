import { Star } from "lucide-react";
import React from "react";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 20,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={`${
            i < Math.floor(rating)
              ? "text-yellow-500 fill-yellow-500"
              : "text-gray-300"
          } transition-colors`}
        />
      ))}
    </div>
  );
};
