import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Lock, CreditCard, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: string;
  price: number;
}

export default function CheckoutModal({ isOpen, onClose, tier, price }: CheckoutModalProps) {
  const [step, setStep] = useState<"checkout" | "processing" | "success">("checkout");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    setStep("processing");

    // Simulate payment processing
    setTimeout(() => {
      setStep("success");
      
      // Auto-create account and log them in
      login({
        name: name || "New Member",
        email: email,
        memberSince: new Date().getFullYear().toString(),
        membership: {
          status: "active",
          tier: tier,
          nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        },
        isWholesale: false
      });

      // Redirect to profile after showing success message
      setTimeout(() => {
        onClose();
        navigate("/profile");
      }, 2500);

    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-peppa-dark/80 z-50 backdrop-blur-sm"
            onClick={step === "checkout" ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            {step === "checkout" && (
              <>
                <div className="flex items-center justify-between p-6 border-b border-black/5 bg-gray-50">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-peppa-dark">Join {tier} Tier</h2>
                    <p className="text-sm text-gray-500">${price}/month</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-peppa-dark transition-colors rounded-full hover:bg-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCheckout} className="p-6 space-y-6">
                  {/* Account Info */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-peppa-dark uppercase tracking-wider">1. Your Details</h3>
                    <div>
                      <input 
                        type="text" 
                        required
                        placeholder="Full Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 transition-all" 
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        required
                        placeholder="Email Address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 transition-all" 
                      />
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> We'll use this to create your account securely.
                      </p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="space-y-4 pt-4 border-t border-black/5">
                    <h3 className="text-sm font-bold text-peppa-dark uppercase tracking-wider flex items-center gap-2">
                      2. Payment <CreditCard className="w-4 h-4 text-gray-400" />
                    </h3>
                    <div>
                      <input 
                        type="text" 
                        required
                        placeholder="Card Number" 
                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 transition-all font-mono text-sm" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        required
                        placeholder="MM/YY" 
                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 transition-all font-mono text-sm" 
                      />
                      <input 
                        type="text" 
                        required
                        placeholder="CVC" 
                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 transition-all font-mono text-sm" 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-peppa-dark text-white py-4 rounded-xl font-medium text-lg hover:bg-black transition-colors shadow-lg flex items-center justify-center gap-2 mt-4"
                  >
                    Pay ${price} & Join <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-xs text-gray-400">
                    By joining, you agree to our Terms of Service. You can cancel anytime.
                  </p>
                </form>
              </>
            )}

            {step === "processing" && (
              <div className="p-12 flex flex-col items-center justify-center text-center space-y-6 h-[500px]">
                <div className="w-16 h-16 border-4 border-peppa-light border-t-peppa-red rounded-full animate-spin"></div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-peppa-dark mb-2">Processing Payment...</h3>
                  <p className="text-gray-500 text-sm">Securing your spot in the Fan Club.</p>
                </div>
              </div>
            )}

            {step === "success" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 flex flex-col items-center justify-center text-center space-y-6 h-[500px] bg-peppa-green/5"
              >
                <div className="w-20 h-20 bg-peppa-green rounded-full flex items-center justify-center text-white shadow-lg shadow-peppa-green/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-peppa-dark mb-3">Welcome to the Club!</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your payment was successful. We've automatically created your account using <span className="font-medium text-peppa-dark">{email}</span>.
                  </p>
                  <p className="text-sm text-gray-500 mt-4">Redirecting to your dashboard...</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
