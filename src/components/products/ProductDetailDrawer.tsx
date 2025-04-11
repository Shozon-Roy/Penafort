
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ProductDetailDrawerProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  relatedProducts: any[];
}

const ProductDetailDrawer: React.FC<ProductDetailDrawerProps> = ({ 
  product, 
  isOpen, 
  onClose,
  relatedProducts
}) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${product.name} (${quantity}) has been added to your cart`,
      duration: 3000,
    });
    onClose();
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  if (!isOpen || !product) return null;
  
  return (
    <div className="position-fixed top-0 start-0 end-0 bottom-0 bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="bg-white position-absolute start-50 bottom-0 translate-middle-x w-100"
        style={{ maxWidth: '42rem', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div className="position-relative">
          <button 
            onClick={onClose}
            className="btn btn-light position-absolute end-0 top-0 m-3 rounded-circle"
            style={{ zIndex: 10 }}
          >
            <X size={20} />
          </button>
          
          <div style={{ height: '20rem', overflow: 'hidden' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
          
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h2 className="fs-3 fw-bold">{product.name}</h2>
                <p className="text-muted small">{product.category}</p>
              </div>
              <div className="text-end">
                {product.discount ? (
                  <>
                    <span className="fs-3 fw-bold text-success">
                      ₦{(product.price * (1 - product.discount/100)).toLocaleString()}
                    </span>
                    <p className="small text-muted text-decoration-line-through">
                      ₦{product.price.toLocaleString()}
                    </p>
                  </>
                ) : (
                  <span className="fs-3 fw-bold text-success">₦{product.price.toLocaleString()}</span>
                )}
              </div>
            </div>
            
            <p className="text-muted mb-4">{product.description}</p>
            
            <div className="d-flex flex-wrap gap-3 mb-4">
              <div className="d-flex align-items-center">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={decreaseQuantity}
                  style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                >
                  -
                </button>
                <span className="px-3 py-2 border-top border-bottom">
                  {quantity}
                </span>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={increaseQuantity}
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                >
                  +
                </button>
              </div>
              
              <button 
                className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </button>
            </div>
            
            <div className="border-top pt-4">
              <h3 className="fw-medium mb-3">You might also like</h3>
              <div className="row row-cols-3 g-3">
                {relatedProducts.slice(0, 3).map(relatedProduct => (
                  <div key={relatedProduct.id} className="col text-center">
                    <div className="mb-2" style={{ aspectRatio: '1', overflow: 'hidden', borderRadius: '0.5rem' }}>
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <p className="small text-truncate">{relatedProduct.name}</p>
                    <p className="small fw-medium text-success">₦{relatedProduct.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailDrawer;
