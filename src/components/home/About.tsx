
import React from 'react';
import { Check, ShoppingBag, Award, Truck } from 'lucide-react';

const AboutFeature = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="w-12 h-12 bg-penafort-green/10 text-penafort-green rounded-full flex items-center justify-center mb-4">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-medium mb-2 text-penafort-text-primary">{title}</h3>
    <p className="text-penafort-text-secondary">{description}</p>
  </div>
);

const About = () => {
  const features = [
    {
      icon: ShoppingBag,
      title: "Quality Products",
      description: "We carefully select our suppliers to ensure only the finest, freshest products reach our shelves."
    },
    {
      icon: Award,
      title: "Customer Satisfaction",
      description: "Your happiness is our priority. We strive to exceed expectations in every interaction."
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Enjoy quick, reliable delivery of your shopping to your doorstep within Iba, Ojo area."
    }
  ];

  return (
    <section id="about" className="py-20 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-2xl aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1601598851547-4302969d0614?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                  alt="Inside Penafort Supermarket" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 z-0 w-full h-full bg-penafort-green-light/20 rounded-2xl"></div>
              
              <div className="absolute top-6 -left-6 glass-card rounded-2xl p-6 shadow-lg max-w-[260px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-penafort-green rounded-full flex items-center justify-center">
                    <Check className="text-white" size={16} />
                  </div>
                  <h4 className="font-medium text-penafort-text-primary">Customer Focused</h4>
                </div>
                <p className="text-sm text-penafort-text-secondary">
                  "Their products are always fresh and staff so friendly. Highly recommend!" - A Happy Customer
                </p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-2 bg-penafort-green/10 text-penafort-green rounded-full font-medium mb-4">
              About Penafort
            </span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-penafort-text-primary mb-6">
              Your Trusted Neighborhood Supermarket
            </h2>
            <p className="text-penafort-text-secondary mb-6">
              Located in Iba, Ojo, Lagos, Penafort Supermarket operates under Penafort Energy Nigeria Limited and offers a wide variety of groceries, household items, and fast-moving consumer goods (FMCG).
            </p>
            <p className="text-penafort-text-secondary mb-8">
              We focus on efficient store operations, inventory management, and exceptional customer service. Our store is strategically placed to serve the local community with high-quality products and competitive pricing.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-penafort-green/10 flex items-center justify-center">
                  <Check size={14} className="text-penafort-green" />
                </div>
                <span className="text-penafort-text-primary">Premium quality products</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-penafort-green/10 flex items-center justify-center">
                  <Check size={14} className="text-penafort-green" />
                </div>
                <span className="text-penafort-text-primary">Competitive pricing strategy</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-penafort-green/10 flex items-center justify-center">
                  <Check size={14} className="text-penafort-green" />
                </div>
                <span className="text-penafort-text-primary">Excellent customer service</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-penafort-green/10 flex items-center justify-center">
                  <Check size={14} className="text-penafort-green" />
                </div>
                <span className="text-penafort-text-primary">Clean and organized shopping environment</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {features.map((feature, index) => (
            <AboutFeature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
