import { motion } from "motion/react";
import { Handshake, Building2, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Wholesale() {
  return (
    <div className="bg-peppa-light min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-peppa-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co/Dg66t064/wholesale.png" 
            alt="Wholesale Peppajoy" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-peppa-dark via-peppa-dark/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-peppa-red/20 text-peppa-red mb-6 backdrop-blur-sm">
              <Handshake className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Partner with Peppajoy
            </h1>
            <p className="text-lg text-white/90 mb-10 font-light max-w-2xl mx-auto">
              Bring the authentic taste of Turks and Caicos to your shelves. Join our B2B wholesale program for exclusive pricing and dedicated support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Benefits */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-peppa-dark mb-6">Why Wholesale?</h2>
              <p className="text-gray-600 mb-10 leading-relaxed">
                We partner with specialty grocers, high-end restaurants, and boutique retailers who share our passion for authentic, gourmet flavors.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-peppa-green/10 flex items-center justify-center text-peppa-green shrink-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-peppa-dark mb-2">Tiered Pricing</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Access competitive wholesale rates that scale with your order volume. The more you buy, the more you save.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-peppa-yellow/10 flex items-center justify-center text-peppa-yellow shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-peppa-dark mb-2">Dedicated Support</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Get a dedicated account manager to assist with ordering, merchandising, and product education.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-peppa-red/10 flex items-center justify-center text-peppa-red shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-peppa-dark mb-2">Flexible Terms</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Minimum order quantity of just 20 items. Payment options include Credit Card, Bank Transfer, and Net 30 (subject to approval).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div>
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-black/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-peppa-yellow/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                
                <h3 className="text-2xl font-serif font-bold text-peppa-dark mb-2 relative z-10">Apply for a Wholesale Account</h3>
                <p className="text-gray-500 text-sm mb-8 relative z-10">Please fill out the form below. Our team will review your application within 1-2 business days.</p>
                
                <form className="space-y-6 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-peppa-dark mb-2">First Name</label>
                      <input type="text" className="w-full bg-peppa-light border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 focus:border-peppa-red transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-peppa-dark mb-2">Last Name</label>
                      <input type="text" className="w-full bg-peppa-light border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 focus:border-peppa-red transition-all" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-peppa-dark mb-2">Company Name</label>
                    <input type="text" className="w-full bg-peppa-light border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 focus:border-peppa-red transition-all" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-peppa-dark mb-2">Email Address</label>
                    <input type="email" className="w-full bg-peppa-light border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 focus:border-peppa-red transition-all" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-peppa-dark mb-2">Business Type</label>
                    <select className="w-full bg-peppa-light border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 focus:border-peppa-red transition-all appearance-none">
                      <option>Retail Store</option>
                      <option>Restaurant / Cafe</option>
                      <option>Distributor</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-peppa-dark mb-2">Tax ID / EIN</label>
                    <input type="text" className="w-full bg-peppa-light border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 focus:border-peppa-red transition-all" />
                  </div>
                  
                  <button type="button" className="w-full bg-peppa-red text-white py-4 rounded-xl font-medium text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg mt-8">
                    Submit Application <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
                
                <p className="text-center text-xs text-gray-400 mt-6 relative z-10">
                  By submitting this form, you agree to our Wholesale Terms & Conditions.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
