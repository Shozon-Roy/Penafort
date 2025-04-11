
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, ShoppingBag, Share2, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageTransition from '../components/layout/PageTransition';
import RatingStars from '../components/common/RatingStars';
import LoadingIndicator from '../components/common/LoadingIndicator';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { generateProducts } from '../utils/productDataGenerator';
import ProductsGrid from '../components/products/ProductsGrid';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { toast } = useToast();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // Simulate fetching product data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      // Generate sample products
      const products = generateProducts(50);
      const foundProduct = products.find(p => p.id.toString() === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        // Get related products (same category)
        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setIsLoading(false);
    }, 800);
  }, [productId]);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${product.name} (${quantity}) has been added to your cart`,
      duration: 3000,
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites!",
      description: isFavorite 
        ? `${product?.name} has been removed from your favorites` 
        : `${product?.name} has been added to your favorites`,
      duration: 3000,
    });
  };

  const handleShareProduct = () => {
    // In a real application, this would copy a link or open a share dialog
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Product link copied to clipboard",
      duration: 3000,
    });
  };

  const handleRelatedProductClick = (product: any) => {
    // This would normally navigate to the product
    // but we'll handle this in the ProductsGrid component
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
          <LoadingIndicator isLoading={true} />
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products">
            <Button>Return to Products</Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 md:px-12">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link to="/products" className="flex items-center text-penafort-text-secondary hover:text-penafort-green">
                <ChevronLeft size={16} className="mr-1" />
                <span>Back to Products</span>
              </Link>
            </div>
            
            {/* Product Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
              {/* Product Images */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-penafort-gray-100 rounded-2xl overflow-hidden aspect-square"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Product Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-penafort-text-primary mb-2">
                      {product.name}
                    </h1>
                    <p className="text-penafort-text-secondary mb-4">{product.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleShareProduct}
                      className="p-2 rounded-full bg-penafort-gray-100 text-penafort-text-secondary hover:bg-penafort-green/10 hover:text-penafort-green transition-colors"
                    >
                      <Share2 size={20} />
                    </button>
                    <button 
                      onClick={handleToggleFavorite}
                      className={`p-2 rounded-full ${isFavorite ? 'bg-red-100 text-red-500' : 'bg-penafort-gray-100 text-penafort-text-secondary hover:bg-penafort-green/10 hover:text-penafort-green'} transition-colors`}
                    >
                      <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                  <RatingStars rating={product.rating} />
                  <span className="text-penafort-text-secondary">({Math.floor(Math.random() * 100) + 1} reviews)</span>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-penafort-green mb-2">
                    ${product.price.toFixed(2)}
                  </h2>
                  {product.discount && (
                    <p className="flex items-center gap-2">
                      <span className="line-through text-penafort-text-secondary">
                        ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                      </span>
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {product.discount}% OFF
                      </span>
                    </p>
                  )}
                </div>
                
                <div className="mb-8">
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-penafort-text-secondary">
                    {product.description || "This premium quality product is sourced directly from local producers. Perfect for everyday use, this product guarantees satisfaction and exceptional value."}
                  </p>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-medium mb-4">Select Size</h3>
                  <div className="flex gap-3">
                    {['small', 'medium', 'large'].map((size) => (
                      <button
                        key={size}
                        className={`px-4 py-2 rounded-full border text-sm capitalize ${
                          selectedSize === size
                            ? 'border-penafort-green bg-penafort-green/10 text-penafort-green'
                            : 'border-penafort-gray-200 text-penafort-text-secondary hover:border-penafort-green hover:text-penafort-green'
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center">
                    <button 
                      className="w-10 h-10 rounded-l-lg border border-penafort-gray-200 flex items-center justify-center hover:bg-penafort-gray-100"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      -
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center border-t border-b border-penafort-gray-200">
                      {quantity}
                    </span>
                    <button 
                      className="w-10 h-10 rounded-r-lg border border-penafort-gray-200 flex items-center justify-center hover:bg-penafort-gray-100"
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag size={18} />
                    <span>Add to Cart</span>
                  </button>
                </div>
                
                <div className="border-t border-penafort-gray-200 pt-6">
                  <div className="flex items-center gap-2 text-penafort-text-secondary">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                    <span>In Stock</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Product Tabs */}
            <div className="mb-16">
              <Tabs defaultValue="details">
                <TabsList className="mb-8">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="text-penafort-text-secondary">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-penafort-text-primary mb-4">Product Features</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Premium quality materials</li>
                        <li>Ethically sourced ingredients</li>
                        <li>Produced using sustainable methods</li>
                        <li>Certified organic (where applicable)</li>
                        <li>Minimal packaging to reduce waste</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-penafort-text-primary mb-4">Benefits</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Excellent nutritional value</li>
                        <li>Fresh and flavorful</li>
                        <li>Supports local economy</li>
                        <li>Reduces carbon footprint</li>
                        <li>Promotes healthier lifestyle</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="specifications" className="text-penafort-text-secondary">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-penafort-text-primary mb-4">Product Specifications</h3>
                      <div className="space-y-3">
                        <div className="flex border-b border-penafort-gray-200 pb-2">
                          <span className="font-medium w-1/3">Category:</span>
                          <span className="w-2/3">{product.category}</span>
                        </div>
                        <div className="flex border-b border-penafort-gray-200 pb-2">
                          <span className="font-medium w-1/3">Origin:</span>
                          <span className="w-2/3">Local Farms</span>
                        </div>
                        <div className="flex border-b border-penafort-gray-200 pb-2">
                          <span className="font-medium w-1/3">Packaging:</span>
                          <span className="w-2/3">Eco-friendly</span>
                        </div>
                        <div className="flex border-b border-penafort-gray-200 pb-2">
                          <span className="font-medium w-1/3">Weight:</span>
                          <span className="w-2/3">Varies by size selection</span>
                        </div>
                        <div className="flex border-b border-penafort-gray-200 pb-2">
                          <span className="font-medium w-1/3">Shelf Life:</span>
                          <span className="w-2/3">7-14 days when properly stored</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-penafort-text-primary mb-4">Storage Instructions</h3>
                      <p className="mb-4">
                        For optimal freshness and quality, please follow these storage instructions:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Store in a cool, dry place away from direct sunlight</li>
                        <li>Refrigerate after opening (where applicable)</li>
                        <li>Keep sealed in original packaging until use</li>
                        <li>Consume within recommended shelf life</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews">
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold text-penafort-text-primary">Customer Reviews</h3>
                      <Button>Write a Review</Button>
                    </div>
                    <div className="space-y-6">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="border-b border-penafort-gray-200 pb-6">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">Customer {i+1}</h4>
                              <p className="text-sm text-penafort-text-secondary">2 weeks ago</p>
                            </div>
                            <RatingStars rating={4 + (i % 2)} />
                          </div>
                          <p className="text-penafort-text-secondary">
                            {i === 0 
                              ? "Excellent product! Fresh and tasty, exactly as described. Will definitely purchase again." 
                              : i === 1 
                                ? "Good quality and value for money. Arrived well packaged and fresh."
                                : "Consistently good quality. I buy these regularly and have never been disappointed."
                            }
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Related Products */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
              <ProductsGrid 
                products={relatedProducts} 
                handleProductClick={handleRelatedProductClick}
                handleAddToCart={(product, e) => {
                  e.stopPropagation();
                  toast({
                    title: "Added to cart!",
                    description: `${product.name} has been added to your cart`,
                    duration: 3000,
                  });
                }}
              />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ProductDetail;
