
import React from 'react';
import { ShoppingBag, Star, Truck, Shield } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-penafort-text-primary mb-3">
            Why Choose Penafort?
          </h2>
          <p className="text-penafort-text-secondary max-w-lg">
            We pride ourselves on providing the best shopping experience for our customers.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
          <div className="bg-penafort-green/10 p-4 rounded-full inline-block mb-4">
            <ShoppingBag size={24} className="text-penafort-green" />
          </div>
          <h3 className="text-xl font-bold text-penafort-text-primary mb-2">Fresh & Quality Products</h3>
          <p className="text-penafort-text-secondary">We source the freshest products from trusted suppliers to ensure quality.</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
          <div className="bg-penafort-green/10 p-4 rounded-full inline-block mb-4">
            <Star size={24} className="text-penafort-green" />
          </div>
          <h3 className="text-xl font-bold text-penafort-text-primary mb-2">Affordable Prices</h3>
          <p className="text-penafort-text-secondary">Enjoy competitive pricing on all our products and regular promotions.</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
          <div className="bg-penafort-green/10 p-4 rounded-full inline-block mb-4">
            <Truck size={24} className="text-penafort-green" />
          </div>
          <h3 className="text-xl font-bold text-penafort-text-primary mb-2">Fast & Reliable Delivery</h3>
          <p className="text-penafort-text-secondary">Get your groceries delivered to your doorstep in no time.</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
          <div className="bg-penafort-green/10 p-4 rounded-full inline-block mb-4">
            <Shield size={24} className="text-penafort-green" />
          </div>
          <h3 className="text-xl font-bold text-penafort-text-primary mb-2">Customer Satisfaction</h3>
          <p className="text-penafort-text-secondary">Your satisfaction is our priority, with excellent service guaranteed.</p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
