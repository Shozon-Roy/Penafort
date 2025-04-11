
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ProductSearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
}

const ProductSearchInput: React.FC<ProductSearchInputProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  placeholder = "Search products..."
}) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-penafort-text-secondary" size={18} />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-10 w-full"
      />
      {searchTerm && (
        <button 
          onClick={() => setSearchTerm('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-penafort-text-secondary hover:text-penafort-text-primary"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default ProductSearchInput;
