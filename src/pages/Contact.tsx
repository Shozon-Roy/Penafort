
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show success toast
    toast.success('Your message has been sent successfully! We will get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="bg-penafort-green/10 py-12">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-penafort-text-primary mb-4">
                Contact Us
              </h1>
              <p className="text-penafort-text-secondary text-lg">
                We'd love to hear from you! Reach out with any questions or feedback
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info & Form */}
        <div className="container mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-penafort-text-primary mb-6">Get In Touch</h2>
              <p className="text-penafort-text-secondary mb-8">
                Have questions about our products, services, or just want to say hello? Contact us using one of the methods below or fill out the form and we'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-penafort-green/10 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="text-penafort-green" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-penafort-text-primary mb-1">Our Location</h3>
                    <p className="text-penafort-text-secondary">
                      Penafort Supermarket, Iba, Ojo, Lagos State, Nigeria
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-penafort-green/10 rounded-full flex items-center justify-center mr-4">
                    <Phone className="text-penafort-green" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-penafort-text-primary mb-1">Phone Number</h3>
                    <p className="text-penafort-text-secondary">
                      +234 123 456 7890
                    </p>
                    <p className="text-penafort-text-secondary">
                      +234 987 654 3210
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-penafort-green/10 rounded-full flex items-center justify-center mr-4">
                    <Mail className="text-penafort-green" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-penafort-text-primary mb-1">Email Address</h3>
                    <p className="text-penafort-text-secondary">
                      info@penafortsupermarket.com
                    </p>
                    <p className="text-penafort-text-secondary">
                      support@penafortsupermarket.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-penafort-green/10 rounded-full flex items-center justify-center mr-4">
                    <Clock className="text-penafort-green" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-penafort-text-primary mb-1">Opening Hours</h3>
                    <p className="text-penafort-text-secondary">
                      Monday - Saturday: 8:00 AM - 9:00 PM
                    </p>
                    <p className="text-penafort-text-secondary">
                      Sunday: 10:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-display font-bold text-penafort-text-primary mb-6">Send A Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-penafort-text-primary mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-penafort-text-primary mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-penafort-text-primary mb-2">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Product Information">Product Information</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Complaint">Complaint</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-penafort-text-primary mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field min-h-[120px]"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="w-full btn-primary flex items-center justify-center">
                  <Send size={18} className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-penafort-gray-100 py-16">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-penafort-text-primary mb-4">Our Location</h2>
              <p className="text-penafort-text-secondary max-w-3xl mx-auto">
                Visit us at our convenient location in Iba, Ojo, Lagos State
              </p>
            </div>
            
            <div className="aspect-video bg-white rounded-xl overflow-hidden shadow-lg">
              {/* For a real implementation, replace this with an actual Google Map */}
              <div className="w-full h-full bg-penafort-gray-200 flex items-center justify-center">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31712.084349332854!2d3.1733788!3d6.4698533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b86270ab379d3%3A0xbf5172bc9c32c2e0!2sIba%2C%20Lagos!5e0!3m2!1sen!2sng!4v1716222369146!5m2!1sen!2sng" 
                  width="100%" 
                  height="100%" 
                  style={{border: 0}} 
                  allowFullScreen 
                  loading="lazy"
                  title="Penafort Supermarket Location"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
