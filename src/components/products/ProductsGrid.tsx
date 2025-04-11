
import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ProductsGridProps {
  products: any[];
  handleProductClick: (product: any) => void;
  handleAddToCart: (product: any, e: React.MouseEvent) => void;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ProductsGrid: React.FC<ProductsGridProps> = ({ 
  products, 
  handleProductClick, 
  handleAddToCart 
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <h3 className="fs-4 fw-medium mb-2">No products found</h3>
        <p className="text-muted">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <div className="col" key={product.id}>
          <ProductCard 
            product={product}
            onClick={() => handleProductClick(product)}
            onAddToCart={(e) => handleAddToCart(product, e)}
          />
        </div>
      ))}
    </motion.div>
  );
};

export default ProductsGrid;
