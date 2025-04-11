
import React from 'react';
import RatingStars from '../common/RatingStars';

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  text: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <div className="mb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-penafort-text-primary mb-3">
            Customer Testimonials
          </h2>
          <p className="text-penafort-text-secondary max-w-lg">
            Hear what our satisfied customers have to say about their shopping experience.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <h4 className="font-medium text-penafort-text-primary">{testimonial.name}</h4>
                <RatingStars rating={testimonial.rating} />
              </div>
            </div>
            <p className="text-penafort-text-secondary italic">"{testimonial.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
