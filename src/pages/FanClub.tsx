import { motion } from "motion/react";
import { Check, Star, Flame, Crown } from "lucide-react";
import { useState } from "react";
import CheckoutModal from "../components/CheckoutModal";

export default function FanClub() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState({ name: "", price: 0 });

  const handleJoin = (tierName: string, price: number) => {
    setSelectedTier({ name: tierName, price });
    setIsCheckoutOpen(true);
  };

  return (
    <div className="bg-peppa-light min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-peppa-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co/srmNW8P/Peppajoy-about-us.png" 
            alt="Peppajoy Fan Club" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-peppa-dark/80 via-peppa-dark/50 to-peppa-dark" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-peppa-yellow/20 text-peppa-yellow mb-6">
              <Crown className="w-8 h-8" />
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              The Peppajoy <span className="text-peppa-yellow">Fan Club</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 font-light max-w-2xl mx-auto">
              Join our exclusive community of heat seekers. Get monthly deliveries, member-only discounts, and early access to our most limited batches.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-24 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Standard Tier */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-black/5 flex flex-col"
            >
              <div className="mb-8">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mb-4">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-peppa-dark mb-2">Standard</h3>
                <p className="text-gray-500 text-sm mb-6">Perfect for the casual hot sauce enthusiast.</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-peppa-dark">$15</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-peppa-green shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">1 Bottle of Original Peppajoy monthly</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-peppa-green shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">10% off all store purchases</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-peppa-green shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">Free standard shipping</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handleJoin("Standard", 15)}
                className="w-full py-4 rounded-full bg-peppa-yellow text-peppa-dark font-medium hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(252,210,14,0.3)] text-center block"
              >
                Join Standard
              </button>
            </motion.div>

            {/* Prime Tier */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-peppa-green rounded-3xl p-8 shadow-2xl border border-peppa-yellow/20 flex flex-col relative transform md:-translate-y-8"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-peppa-yellow text-peppa-dark text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <div className="mb-8">
                <div className="w-12 h-12 rounded-full bg-peppa-yellow/20 flex items-center justify-center text-peppa-yellow mb-4">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Prime</h3>
                <p className="text-white/80 text-sm mb-6">For those who crave variety and heat.</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">$25</span>
                  <span className="text-white/80">/month</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-peppa-yellow shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm">2 Bottles (Original + 1 Rotating Flavor)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-peppa-yellow shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm">15% off all store purchases</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-peppa-yellow shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm">Free expedited shipping</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-peppa-yellow shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm">Early access to new product launches</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handleJoin("Prime", 25)}
                className="w-full py-4 rounded-full bg-peppa-yellow text-peppa-dark font-medium hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(252,210,14,0.3)] text-center block"
              >
                Join Prime
              </button>
            </motion.div>

            {/* Premium Tier */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-black/5 flex flex-col"
            >
              <div className="mb-8">
                <div className="w-12 h-12 rounded-full bg-peppa-red/10 flex items-center justify-center text-peppa-red mb-4">
                  <Crown className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-peppa-dark mb-2">Premium</h3>
                <p className="text-gray-500 text-sm mb-6">The ultimate Peppajoy experience.</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-peppa-dark">$450</span>
                  <span className="text-gray-500">/year</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-peppa-red shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">3 Bottles (Full core lineup + Exclusives)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-peppa-red shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">20% off all store purchases</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-peppa-red shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">Free overnight shipping</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-peppa-red shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">Exclusive access to "Reserve" small batches</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-peppa-red shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">Annual VIP gift box</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handleJoin("Premium", 450)}
                className="w-full py-4 rounded-full bg-peppa-yellow text-peppa-dark font-medium hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(252,210,14,0.3)] text-center block"
              >
                Join Premium
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        tier={selectedTier.name} 
        price={selectedTier.price} 
      />
    </div>
  );
}
