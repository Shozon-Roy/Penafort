
import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Check } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ProductsFilterProps {
  selectedCategory: string;
  productCategories: string[];
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  handleCategoryClick: (category: string) => void;
  setCurrentPage: (page: number) => void;
  availability: string;
  setAvailability: (value: string) => void;
}

const ProductsFilter: React.FC<ProductsFilterProps> = ({
  selectedCategory,
  productCategories,
  priceRange,
  setPriceRange,
  handleCategoryClick,
  setCurrentPage,
  availability,
  setAvailability
}) => {
  return (
    <motion.div 
      className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex flex-wrap gap-2">
        {['All', ...productCategories].map((categoryName) => (
          <motion.button
            key={categoryName}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${
              selectedCategory === categoryName 
                ? 'border-penafort-green bg-penafort-green/10 text-penafort-green' 
                : 'border-penafort-gray-200 hover:border-penafort-green hover:bg-penafort-green/5'
            }`}
            onClick={() => handleCategoryClick(categoryName)}
          >
            {categoryName}
          </motion.button>
        ))}
      </div>
      <div className="flex gap-2">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-6">
              <h4 className="font-medium">Filter Options</h4>
              
              <div className="space-y-4">
                <p className="text-sm font-medium">Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
                <Slider
                  defaultValue={[priceRange[0], priceRange[1]]}
                  min={0}
                  max={1000}
                  step={10}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={(value) => setPriceRange([value[0], value[1]])}
                  className="py-4"
                />
                <div className="flex items-center justify-between">
                  <input 
                    type="number" 
                    value={priceRange[0]} 
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-20 h-8 px-2 py-1 text-sm border rounded"
                    min="0"
                    max={priceRange[1]}
                  />
                  <span className="text-sm">to</span>
                  <input 
                    type="number" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                    className="w-20 h-8 px-2 py-1 text-sm border rounded"
                    min={priceRange[0]}
                    max="1000"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium">Availability</p>
                <RadioGroup value={availability} onValueChange={setAvailability}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All Products</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="in-stock" id="in-stock" />
                    <Label htmlFor="in-stock">In Stock Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="out-of-stock" id="out-of-stock" />
                    <Label htmlFor="out-of-stock">Out of Stock</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button 
                size="sm" 
                className="w-full" 
                onClick={() => setCurrentPage(1)} // Reset to first page when filtering
              >
                Apply Filters
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </motion.div>
  );
};

export default ProductsFilter;
