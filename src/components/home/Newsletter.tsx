
import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to your backend
      console.log('Submitted email:', email);
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-12 bg-gradient-to-r from-penafort-green-dark to-penafort-green text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
            Stay Updated with Our Offers
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest updates on special promotions, new arrivals, and exclusive offers.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-6 py-4 rounded-full text-penafort-text-primary focus:outline-none focus:ring-2 focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-penafort-green px-6 rounded-full flex items-center justify-center text-white font-medium transition-all hover:bg-penafort-green-dark"
            >
              {submitted ? (
                <>
                  <CheckCircle size={18} className="mr-2" />
                  Subscribed!
                </>
              ) : (
                <>
                  Subscribe
                  <Send size={18} className="ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center text-white/70 text-sm">
          By subscribing, you agree to receive marketing emails from Penafort Supermarket. You can unsubscribe at any time.
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
