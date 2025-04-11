
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageTransition from '../components/layout/PageTransition';
import { useToast } from '@/hooks/use-toast';
import ProductsHeader from '../components/products/ProductsHeader';
import ProductsFilter from '../components/products/ProductsFilter';
import ProductsSort from '../components/products/ProductsSort';
import ProductsGrid from '../components/products/ProductsGrid';
import ProductStats from '../components/products/ProductStats';
import ProductDetailDrawer from '../components/products/ProductDetailDrawer';
import ProductPagination from '../components/products/ProductPagination';
import LoadingIndicator from '../components/common/LoadingIndicator';
import ProductSearchInput from '../components/products/ProductSearchInput';
import { productCategories, initialProducts, generateProducts } from '../utils/productDataGenerator';

const PRODUCTS_PER_PAGE = 12;

const Products = () => {
  // Get route parameters and search parameters
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get page from URL or default to 1
  const pageFromUrl = parseInt(searchParams.get('page') || '1');
  // Get search term from URL if present
  const searchTermFromUrl = searchParams.get('search') || '';
  
  // State management
  const [allProducts, setAllProducts] = useState<any[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'All');
  const [currentPage, setCurrentPage] = useState<number>(pageFromUrl);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState<string>('default');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(searchTermFromUrl);
  const [availability, setAvailability] = useState<string>('all'); // 'all', 'in-stock', 'out-of-stock'

  // Generate more products when needed (simulating API call)
  const loadMoreProducts = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const moreProducts = generateProducts(500);
      setAllProducts(prev => [...prev, ...moreProducts]);
      setIsLoading(false);
    }, 500);
  };

  // Load initial data
  useEffect(() => {
    // This would be an API call in a real application
    if (allProducts.length < 1000) {
      loadMoreProducts();
    }
  }, []);

  // Update category from URL parameter
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('All');
    }
  }, [category]);

  // Update URL when page or search changes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', currentPage.toString());
    
    if (searchTerm) {
      newParams.set('search', searchTerm);
    } else {
      newParams.delete('search');
    }
    
    setSearchParams(newParams);
  }, [currentPage, searchTerm]);

  // Filter products based on selected category, price range, and search
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Category filter
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      
      // Price range filter
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      // Search filter (case insensitive)
      const searchMatch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
        
      // Availability filter
      const availabilityMatch = availability === 'all' || 
        (availability === 'in-stock' && product.stock > 0) ||
        (availability === 'out-of-stock' && product.stock <= 0);
      
      return categoryMatch && priceMatch && searchMatch && availabilityMatch;
    });
  }, [allProducts, selectedCategory, priceRange, searchTerm, availability]);

  // Sort products based on selected sort option
  const sortedProducts = useMemo(() => {
    switch (sortOption) {
      case 'price-asc':
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case 'name-asc':
        return [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
      case 'rating-desc':
        return [...filteredProducts].sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  }, [filteredProducts, sortOption]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle category selection
  const handleCategoryClick = (categoryName: string) => {
    setCurrentPage(1); // Reset to first page when changing category
    if (categoryName === 'All') {
      navigate('/products');
    } else {
      navigate(`/products/category/${categoryName}`);
    }
  };

  // Handle product click
  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  // Handle add to cart
  const handleAddToCart = (product: any, event: React.MouseEvent) => {
    event.stopPropagation();
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart`,
      duration: 3000,
    });
  };

  // Handle search term change
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle availability filter change
  const handleAvailabilityChange = (value: string) => {
    setAvailability(value);
    setCurrentPage(1); // Reset to first page when changing filter
  };

  // Find related products (same category)
  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return allProducts
      .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
      .slice(0, 6);
  }, [selectedProduct, allProducts]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <ProductsHeader selectedCategory={selectedCategory} />

          {/* Product Listing */}
          <div className="container mx-auto px-6 md:px-12 py-12">
            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-8">
              <ProductSearchInput 
                searchTerm={searchTerm}
                setSearchTerm={handleSearchChange}
                placeholder="Search for products by name, category, or description..."
              />
            </div>
            
            {/* Filters and Sort */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <ProductsFilter 
                selectedCategory={selectedCategory}
                productCategories={productCategories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                handleCategoryClick={handleCategoryClick}
                setCurrentPage={setCurrentPage}
                availability={availability}
                setAvailability={handleAvailabilityChange}
              />
              <ProductsSort 
                sortOption={sortOption}
                setSortOption={setSortOption}
              />
            </div>

            {/* Products Count & Current Page */}
            <ProductStats 
              currentCount={paginatedProducts.length}
              totalCount={sortedProducts.length}
              currentPage={currentPage}
              totalPages={totalPages}
            />

            {/* Loading Indicator */}
            <LoadingIndicator isLoading={isLoading} />

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <ProductsGrid 
                products={paginatedProducts}
                handleProductClick={handleProductClick}
                handleAddToCart={handleAddToCart}
              />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-penafort-text-secondary mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    setSearchTerm('');
                    setPriceRange([0, 1000]);
                    setAvailability('all');
                    setSelectedCategory('All');
                    navigate('/products');
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {sortedProducts.length > 0 && (
              <ProductPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </main>

        <Footer />
        
        {/* Product Detail Drawer */}
        <ProductDetailDrawer 
          product={selectedProduct} 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)}
          relatedProducts={relatedProducts}
        />
      </div>
    </PageTransition>
  );
};

export default Products;
