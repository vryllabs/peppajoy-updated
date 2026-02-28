import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronDown, ChevronUp, Minus, Plus, ShoppingBag, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { cn } from "../lib/utils";
import { useCart } from "../context/CartContext";

export default function Product() {
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<"onetime" | "subscription">("onetime");
  const [subscriptionFreq, setSubscriptionFreq] = useState("1");
  const [activeAccordion, setActiveAccordion] = useState<string | null>("description");
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: "peppajoy-regular-4pack",
      name: "Peppajoy Regular 5oz 4 pack",
      price: purchaseType === "subscription" ? 45.59 : 56.99,
      quantity: quantity,
      image: "https://i.ibb.co/V0yQxwZh/Screenshot-2026-02-26-1-08-09-PM.png"
    });
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="bg-peppa-light py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="hover:text-peppa-red">Home</a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2">/</span>
                <a href="/shop" className="hover:text-peppa-red">Shop</a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-peppa-dark font-medium">Peppajoy Regular 5oz 4 pack</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-white rounded-3xl overflow-hidden border border-black/5 relative">
              <img 
                src="https://i.ibb.co/V0yQxwZh/Screenshot-2026-02-26-1-08-09-PM.png" 
                alt="Peppajoy Regular 5oz 4 pack" 
                className="w-full h-full object-cover mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-peppa-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Bestseller
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <button key={i} className="aspect-square bg-white rounded-xl overflow-hidden border border-black/5 hover:border-peppa-red transition-colors">
                  <img 
                    src="https://i.ibb.co/V0yQxwZh/Screenshot-2026-02-26-1-08-09-PM.png" 
                    alt={`Thumbnail ${i}`} 
                    className="w-full h-full object-cover mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-peppa-dark mb-4">Peppajoy Regular 5oz 4 pack</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-peppa-yellow text-peppa-yellow" />
                  ))}
                </div>
                <span className="text-sm font-medium text-peppa-dark">5.0</span>
                <a href="#reviews" className="text-sm text-gray-500 underline hover:text-peppa-red">128 Reviews</a>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-2xl font-medium text-peppa-dark">$56.99</p>
                <p className="text-lg font-medium text-gray-400 line-through">$65.99</p>
              </div>
            </div>

            {/* Subscription Widget */}
            <div className="bg-white rounded-2xl border border-black/10 p-1 mb-8">
              <div 
                className={cn(
                  "p-4 rounded-xl cursor-pointer transition-colors border-2",
                  purchaseType === "onetime" ? "border-peppa-red bg-peppa-red/5" : "border-transparent hover:bg-gray-50"
                )}
                onClick={() => setPurchaseType("onetime")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      purchaseType === "onetime" ? "border-peppa-red" : "border-gray-300"
                    )}>
                      {purchaseType === "onetime" && <div className="w-2.5 h-2.5 bg-peppa-red rounded-full" />}
                    </div>
                    <span className="font-medium text-peppa-dark">One-time purchase</span>
                  </div>
                  <span className="font-medium text-peppa-dark">$56.99</span>
                </div>
              </div>

              <div 
                className={cn(
                  "p-4 rounded-xl cursor-pointer transition-colors border-2 mt-1",
                  purchaseType === "subscription" ? "border-peppa-green bg-peppa-green/5" : "border-transparent hover:bg-gray-50"
                )}
                onClick={() => setPurchaseType("subscription")}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      purchaseType === "subscription" ? "border-peppa-green" : "border-gray-300"
                    )}>
                      {purchaseType === "subscription" && <div className="w-2.5 h-2.5 bg-peppa-green rounded-full" />}
                    </div>
                    <div>
                      <span className="font-medium text-peppa-dark block">Subscribe & Save (20%)</span>
                      <span className="text-xs text-peppa-green font-medium">Join the Fan Club automatically</span>
                    </div>
                  </div>
                  <span className="font-medium text-peppa-dark">$45.59</span>
                </div>
                
                <AnimatePresence>
                  {purchaseType === "subscription" && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-8 pt-2"
                    >
                      <label className="block text-sm text-gray-600 mb-2">Delivery frequency</label>
                      <select 
                        value={subscriptionFreq}
                        onChange={(e) => setSubscriptionFreq(e.target.value)}
                        className="w-full bg-white border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-peppa-green/50"
                      >
                        <option value="1">Every 1 month</option>
                        <option value="2">Every 2 months</option>
                        <option value="3">Every 3 months</option>
                      </select>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-12">
              <div className="flex items-center border border-black/10 rounded-full bg-white px-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-peppa-dark"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium text-peppa-dark">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-peppa-dark"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-peppa-yellow text-peppa-dark rounded-full font-medium hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(252,210,14,0.3)] flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-3 gap-4 mb-12 py-6 border-y border-black/5">
              <div className="text-center">
                <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-peppa-green" />
                <span className="text-xs font-medium text-gray-600 block">100% Natural</span>
              </div>
              <div className="text-center border-x border-black/5">
                <Truck className="w-6 h-6 mx-auto mb-2 text-peppa-dark" />
                <span className="text-xs font-medium text-gray-600 block">Fast Shipping</span>
              </div>
              <div className="text-center">
                <Star className="w-6 h-6 mx-auto mb-2 text-peppa-dark" />
                <span className="text-xs font-medium text-gray-600 block">Satisfaction</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="space-y-4 border-t border-black/5 pt-4">
              {[
                { id: "description", title: "Description", content: "The original Peppajoy hot sauce that started it all. Crafted with a secret blend of Caribbean peppers sourced directly from Turks and Caicos farmers. It delivers a perfect balance of intense heat and vibrant flavor that enhances any dish without overpowering it." },
                { id: "ingredients", title: "Ingredients", content: "Aged Caribbean Peppers, Distilled Vinegar, Sea Salt, Garlic, Onion, Spices. No artificial preservatives or colors." },
                { id: "shipping", title: "Shipping & Returns", content: "Free shipping on orders over $50. Standard shipping takes 3-5 business days. If you're not completely satisfied, return within 30 days for a full refund." }
              ].map((item) => (
                <div key={item.id} className="border-b border-black/5 pb-4">
                  <button 
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between py-2 text-left"
                  >
                    <span className="font-serif font-bold text-lg text-peppa-dark">{item.title}</span>
                    {activeAccordion === item.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === item.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-2 text-gray-600 text-sm leading-relaxed">{item.content}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
