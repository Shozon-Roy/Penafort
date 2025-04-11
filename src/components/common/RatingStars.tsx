
import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={16} 
          className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} mr-0.5`} 
        />
      ))}
      <span className="ml-1 text-sm text-penafort-text-secondary">{rating.toFixed(1)}</span>
    </div>
  );
};

export default RatingStars;
