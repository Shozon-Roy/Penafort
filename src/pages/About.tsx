
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { CheckCircle, Users, ShieldCheck, Truck } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="bg-penafort-green/10 py-12">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-penafort-text-primary mb-4">
                About Penafort Supermarket
              </h1>
              <p className="text-penafort-text-secondary text-lg">
                Your trusted neighborhood supermarket in Iba, Ojo, Lagos
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="container mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-penafort-text-primary mb-6">Our Story</h2>
              <p className="text-penafort-text-secondary mb-4">
                Penafort Supermarket was founded with a simple mission: to provide the local community with high-quality groceries and exceptional customer service at competitive prices.
              </p>
              <p className="text-penafort-text-secondary mb-4">
                Operating under Penafort Energy Nigeria Limited, we've grown from a small local store to become a trusted retail destination for residents of Iba, Ojo, and surrounding areas in Lagos.
              </p>
              <p className="text-penafort-text-secondary">
                Our commitment to quality, convenience, and community has remained unchanged as we continue to expand our offerings and enhance the shopping experience for our valued customers.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop" 
                alt="Penafort Supermarket" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-penafort-gray-100 py-16">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-penafort-text-primary mb-4">Our Values</h2>
              <p className="text-penafort-text-secondary max-w-3xl mx-auto">
                At Penafort Supermarket, we are guided by a set of core values that define who we are and how we serve our customers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-penafort-green/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="text-penafort-green" size={24} />
                </div>
                <h3 className="text-xl font-bold text-penafort-text-primary mb-2">Quality</h3>
                <p className="text-penafort-text-secondary">
                  We are committed to providing only the highest quality products to our customers.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-penafort-green/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="text-penafort-green" size={24} />
                </div>
                <h3 className="text-xl font-bold text-penafort-text-primary mb-2">Community</h3>
                <p className="text-penafort-text-secondary">
                  We are proud to be a part of the local community and strive to give back whenever possible.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-penafort-green/10 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="text-penafort-green" size={24} />
                </div>
                <h3 className="text-xl font-bold text-penafort-text-primary mb-2">Integrity</h3>
                <p className="text-penafort-text-secondary">
                  We operate with honesty and transparency in all our business practices.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-penafort-green/10 rounded-full flex items-center justify-center mb-4">
                  <Truck className="text-penafort-green" size={24} />
                </div>
                <h3 className="text-xl font-bold text-penafort-text-primary mb-2">Service</h3>
                <p className="text-penafort-text-secondary">
                  We are dedicated to providing excellent customer service to everyone who shops with us.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="container mx-auto px-6 md:px-12 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-penafort-text-primary mb-4">Meet Our Team</h2>
            <p className="text-penafort-text-secondary max-w-3xl mx-auto">
              The dedicated individuals who work tirelessly to ensure your shopping experience is exceptional.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team members would go here - using placeholders */}
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-penafort-text-primary mb-1">John Doe</h3>
              <p className="text-penafort-text-secondary mb-2">Operations Manager</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-penafort-text-primary mb-1">Jane Smith</h3>
              <p className="text-penafort-text-secondary mb-2">Procurement Manager</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1000&auto=format&fit=crop" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-penafort-text-primary mb-1">Sarah Johnson</h3>
              <p className="text-penafort-text-secondary mb-2">Customer Relations</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
