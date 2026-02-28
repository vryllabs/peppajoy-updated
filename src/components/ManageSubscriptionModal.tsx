import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Crown, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import CheckoutModal from "./CheckoutModal";

interface ManageSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ManageSubscriptionModal({ isOpen, onClose }: ManageSubscriptionModalProps) {
  const { user } = useAuth();
  const [selectedTier, setSelectedTier] = useState<{ name: string; price: number } | null>(null);

  if (!user) return null;

  const currentTier = user.membership.tier;
  const isPremium = currentTier === "Premium";

  const handleSelectTier = (name: string, price: number) => {
    setSelectedTier({ name, price });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && !selectedTier && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-peppa-dark/80 z-50 backdrop-blur-sm"
              onClick={onClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-black/5 bg-gray-50">
                <div>
                  <h2 className="text-xl font-serif font-bold text-peppa-dark">Manage Subscription</h2>
                  <p className="text-sm text-gray-500">Current Tier: {currentTier}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-peppa-dark transition-colors rounded-full hover:bg-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {isPremium ? (
                  <div className="text-center py-8">
                    <Crown className="w-16 h-16 text-peppa-yellow mx-auto mb-4" />
                    <h3 className="text-2xl font-serif font-bold text-peppa-dark mb-2">You're at the Top!</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      You are currently on the Premium Yearly plan. You have access to all exclusive benefits and cannot downgrade until your year is complete.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-gray-600 text-center mb-6">Select a new tier to upgrade or downgrade your subscription.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Standard Tier */}
                      <div className={`border rounded-2xl p-4 flex flex-col ${currentTier === 'Standard' ? 'border-peppa-red bg-peppa-red/5' : 'border-black/10'}`}>
                        <h4 className="font-bold text-peppa-dark mb-1">Standard</h4>
                        <p className="text-sm text-gray-500 mb-4">$15/month</p>
                        <div className="mt-auto">
                          {currentTier === 'Standard' ? (
                            <div className="flex items-center justify-center gap-2 text-peppa-red font-medium text-sm py-2">
                              <CheckCircle2 className="w-4 h-4" /> Current Plan
                            </div>
                          ) : (
                            <button 
                              onClick={() => handleSelectTier("Standard", 15)}
                              className="w-full py-2 rounded-xl border border-peppa-dark text-peppa-dark font-medium hover:bg-peppa-dark hover:text-white transition-colors text-sm"
                            >
                              Downgrade
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Prime Tier */}
                      <div className={`border rounded-2xl p-4 flex flex-col ${currentTier === 'Prime' ? 'border-peppa-red bg-peppa-red/5' : 'border-black/10'}`}>
                        <h4 className="font-bold text-peppa-dark mb-1">Prime</h4>
                        <p className="text-sm text-gray-500 mb-4">$25/month</p>
                        <div className="mt-auto">
                          {currentTier === 'Prime' ? (
                            <div className="flex items-center justify-center gap-2 text-peppa-red font-medium text-sm py-2">
                              <CheckCircle2 className="w-4 h-4" /> Current Plan
                            </div>
                          ) : (
                            <button 
                              onClick={() => handleSelectTier("Prime", 25)}
                              className="w-full py-2 rounded-xl border border-peppa-dark text-peppa-dark font-medium hover:bg-peppa-dark hover:text-white transition-colors text-sm"
                            >
                              {currentTier === 'Standard' ? 'Upgrade' : 'Downgrade'}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Premium Tier */}
                      <div className={`border rounded-2xl p-4 flex flex-col ${currentTier === 'Premium' ? 'border-peppa-yellow bg-peppa-yellow/5' : 'border-peppa-yellow/50'}`}>
                        <h4 className="font-bold text-peppa-dark mb-1 flex items-center gap-1">
                          <Crown className="w-4 h-4 text-peppa-yellow" /> Premium
                        </h4>
                        <p className="text-sm text-gray-500 mb-4">$450/year</p>
                        <div className="mt-auto">
                          <button 
                            onClick={() => handleSelectTier("Premium", 450)}
                            className="w-full py-2 rounded-xl bg-peppa-yellow text-peppa-dark font-medium hover:bg-yellow-400 transition-colors text-sm"
                          >
                            Upgrade
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {selectedTier && (
        <CheckoutModal 
          isOpen={true} 
          onClose={() => {
            setSelectedTier(null);
            onClose();
          }} 
          tier={selectedTier.name} 
          price={selectedTier.price} 
        />
      )}
    </>
  );
}
