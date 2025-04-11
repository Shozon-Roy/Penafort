
import React from 'react';
import { motion } from 'framer-motion';

interface ProductsHeaderProps {
  selectedCategory: string;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ selectedCategory }) => {
  return (
    <motion.div 
      className="bg-penafort-green/10 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-penafort-text-primary mb-4">
            {selectedCategory === 'All' ? 'Our Products' : selectedCategory}
          </h1>
          <p className="text-penafort-text-secondary text-lg">
            Discover our wide range of fresh, quality products at competitive prices
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsHeader;
