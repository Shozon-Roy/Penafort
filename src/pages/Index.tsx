
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import About from '../components/home/About';
import Location from '../components/home/Location';
import Newsletter from '../components/home/Newsletter';
import Footer from '../components/layout/Footer';
import PageTransition from '../components/layout/PageTransition';
// Import toast from the components/ui/use-toast re-export to ensure consistent usage
import { useToast } from "@/components/ui/use-toast";

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const Index = () => {
  // Use the toast hook from the components/ui re-export
  const { toast } = useToast();
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Hero />
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
          >
            <FeaturedProducts />
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.3 }}
          >
            <About />
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4 }}
          >
            <Location />
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.5 }}
          >
            <Newsletter />
          </motion.div>
        </motion.div>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
