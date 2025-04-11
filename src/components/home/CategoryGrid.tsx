
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  icon: string;
  image: string;
  description: string;
  items: string[];
}

interface CategoryGridProps {
  categories: Category[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  return (
    <div id="categories" className="mb-20 scroll-mt-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-penafort-text-primary mb-3">
            Shop by Category
          </h2>
          <p className="text-penafort-text-secondary max-w-lg">
            Explore our wide range of products organized by category for your convenience.
          </p>
        </div>
        <a href="/products" className="mt-4 md:mt-0 flex items-center text-penafort-green font-medium hover:underline">
          Browse All Categories
          <ArrowRight size={16} className="ml-1" />
        </a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {categories.map((category) => (
          <div key={category.id} className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-penafort-green/15 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10"></div>
            <img 
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
              <h3 className="font-medium text-lg">{category.name}</h3>
              <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-2 transition-all duration-300">
                <p className="text-sm text-white/80 mb-2">{category.description}</p>
                <a href="/products" className="inline-flex items-center text-xs font-medium text-white bg-penafort-green/80 py-1 px-2 rounded">
                  Shop Now <ArrowRight size={12} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
