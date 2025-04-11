
import React from 'react';

interface LoadingIndicatorProps {
  isLoading?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isLoading = true }) => {
  if (!isLoading) return null;
  
  return (
    <div className="flex justify-center my-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-penafort-green"></div>
    </div>
  );
};

export default LoadingIndicator;
