
import React from 'react';

interface ProductStatsProps {
  currentCount: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

const ProductStats: React.FC<ProductStatsProps> = ({ 
  currentCount, 
  totalCount, 
  currentPage, 
  totalPages 
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <p className="text-penafort-text-secondary">
        Showing {currentCount} of {totalCount} products
      </p>
      <p className="text-penafort-text-secondary">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default ProductStats;
