
import React, { useState } from 'react';
import CategoryGrid from './CategoryGrid';
import SpecialOffers from './SpecialOffers';
import ProductGrid from './ProductGrid';
import Testimonials from './Testimonials';
import WhyChooseUs from './WhyChooseUs';
import { products, categories, specialOffers, testimonials } from './data/featuredData';

const FeaturedProducts = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 20
  });

  // In a real app, you would implement a real countdown timer here

  return (
    <section id="products" className="py-20 px-6 md:px-12 bg-penafort-gray-50">
      <div className="container mx-auto">
        {/* Categories */}
        <CategoryGrid categories={categories} />
        
        {/* Special Offers */}
        <SpecialOffers specialOffers={specialOffers} timeLeft={timeLeft} />
        
        {/* Featured Products */}
        <ProductGrid products={products} />
        
        {/* Testimonials */}
        <Testimonials testimonials={testimonials} />
        
        {/* Why Choose Us */}
        <WhyChooseUs />
      </div>
    </section>
  );
};

export default FeaturedProducts;
