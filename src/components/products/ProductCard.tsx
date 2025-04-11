
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
    rating: number;
    discount: number | null;
  };
  onClick: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  return (
    <Link to={`/products/detail/${product.id}`} className="text-decoration-none">
      <motion.div 
        className="card h-100 product-card"
        whileHover={{ y: -5 }}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="position-relative">
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top"
            style={{ height: '250px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
            loading="lazy"
          />
          {product.discount && (
            <span className="position-absolute top-0 end-0 badge bg-danger m-2">
              {product.discount}% OFF
            </span>
          )}
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h5 className="card-title text-truncate mb-1">{product.name}</h5>
              <p className="card-text text-muted small">{product.category}</p>
            </div>
            <p className="fw-bold text-success">₦{product.price.toLocaleString()}</p>
          </div>
          <motion.button 
            className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 mt-3"
            whileTap={{ scale: 0.95 }}
            onClick={onAddToCart}
          >
            <ShoppingBag size={18} />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
