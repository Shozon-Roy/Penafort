
import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const Location = () => {
  return (
    <section id="location" className="py-20 px-6 md:px-12 bg-penafort-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-penafort-green/10 text-penafort-green rounded-full font-medium mb-4">
            Find Us
          </span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-penafort-text-primary mb-4">
            Visit Our Supermarket
          </h2>
          <p className="text-penafort-text-secondary">
            Located in the heart of Iba, Ojo, Lagos, our supermarket is easily accessible and ready to serve you with all your grocery needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px]">
            {/* An embedded map would typically go here - using a placeholder */}
            <div className="relative w-full h-full bg-penafort-gray-200 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6 glass-card rounded-xl">
                  <MapPin size={36} className="text-penafort-green mx-auto mb-2" />
                  <h3 className="font-medium mb-1">Interactive Map</h3>
                  <p className="text-sm text-penafort-text-secondary mb-3">
                    Actual map would be embedded here
                  </p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary text-sm py-2"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
              
              <img 
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c907?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="Map location" 
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h3 className="text-2xl font-display font-bold text-penafort-text-primary mb-6">
                Store Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-penafort-green/10 text-penafort-green rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-penafort-text-primary mb-1">Address</h4>
                    <p className="text-penafort-text-secondary">
                      Penafort Supermarket, Iba, Ojo, Lagos State, Nigeria
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-penafort-green/10 text-penafort-green rounded-full flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-penafort-text-primary mb-1">Opening Hours</h4>
                    <p className="text-penafort-text-secondary">
                      Monday - Saturday: 8:00 AM - 9:00 PM<br />
                      Sunday: 9:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-penafort-green/10 text-penafort-green rounded-full flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-penafort-text-primary mb-1">Phone</h4>
                    <p className="text-penafort-text-secondary">
                      +234 123 456 7890<br />
                      +234 987 654 3210
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-penafort-green/10 text-penafort-green rounded-full flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-penafort-text-primary mb-1">Email</h4>
                    <p className="text-penafort-text-secondary">
                      info@penafortsupermarket.com<br />
                      customer.service@penafortsupermarket.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
