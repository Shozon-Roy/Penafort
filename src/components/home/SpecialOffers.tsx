
import React from 'react';

interface SpecialOffer {
  id: number;
  title: string;
  description: string;
  expiryDate: string;
  backgroundColor: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface SpecialOffersProps {
  specialOffers: SpecialOffer[];
  timeLeft: TimeLeft;
}

const SpecialOffers: React.FC<SpecialOffersProps> = ({ specialOffers, timeLeft }) => {
  return (
    <div className="mb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-penafort-text-primary mb-3">
            Special Offers
          </h2>
          <p className="text-penafort-text-secondary max-w-lg">
            Don't miss out on these limited-time deals and promotions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {specialOffers.map((offer) => (
          <div 
            key={offer.id} 
            className={`${offer.backgroundColor} rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-penafort-green/15 transition-all duration-300 hover:scale-[1.02]`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            
            <h3 className="text-xl font-bold mb-2 relative z-10">{offer.title}</h3>
            <p className="text-white/80 mb-4 relative z-10">{offer.description}</p>
            
            <div className="bg-white/20 p-3 rounded-lg inline-block mb-4">
              <div className="flex space-x-2 text-sm">
                <div className="flex flex-col items-center">
                  <span className="font-bold text-lg">{timeLeft.days}</span>
                  <span className="text-xs">Days</span>
                </div>
                <span className="text-lg font-bold">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-lg">{timeLeft.hours}</span>
                  <span className="text-xs">Hours</span>
                </div>
                <span className="text-lg font-bold">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-lg">{timeLeft.minutes}</span>
                  <span className="text-xs">Mins</span>
                </div>
                <span className="text-lg font-bold">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-lg">{timeLeft.seconds}</span>
                  <span className="text-xs">Secs</span>
                </div>
              </div>
            </div>
            
            <a href="/products" className="inline-block bg-white text-penafort-text-primary px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-opacity">
              Shop Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
