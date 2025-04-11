
import React from 'react';
import { motion } from 'framer-motion';

const TermsFooter = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-8 text-center text-sm text-penafort-text-secondary"
    >
      By signing in, you agree to our{' '}
      <a href="#" className="text-penafort-green hover:underline">
        Terms of Service
      </a>{' '}
      and{' '}
      <a href="#" className="text-penafort-green hover:underline">
        Privacy Policy
      </a>
    </motion.div>
  );
};

export default TermsFooter;
