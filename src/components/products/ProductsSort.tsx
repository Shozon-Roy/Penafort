
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface ProductsSortProps {
  sortOption: string;
  setSortOption: (option: string) => void;
}

const ProductsSort: React.FC<ProductsSortProps> = ({ sortOption, setSortOption }) => {
  return (
    <div className="w-full md:w-auto">
      <Select value={sortOption} onValueChange={setSortOption}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
            <SelectItem value="rating-desc">Highest Rated</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductsSort;
