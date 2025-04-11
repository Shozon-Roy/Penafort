
import React from 'react';
import { Link } from 'react-router-dom';

const CreateAccountPrompt = () => {
  return (
    <div className="mt-6 text-center">
      <p className="text-penafort-text-secondary">
        Don't have an account?{' '}
        <Link to="/signup" className="text-penafort-green hover:underline transition-all duration-200">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default CreateAccountPrompt;
