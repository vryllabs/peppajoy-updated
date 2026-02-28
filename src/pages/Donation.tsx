import { useState, ChangeEvent } from "react";
import { motion } from "motion/react";
import { Heart, Globe, Users, ArrowRight, Check, Building2, Medal, Lock, PenTool, Anchor } from "lucide-react";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";

export default function Donation() {
  const [amount, setAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCorporate, setIsCorporate] = useState(false);

  const handleCustomAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(null);
    setCustomAmount(e.target.value);
  };

  return (
    <div className="bg-peppa-light min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-peppa-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co/YBgc3d36/spreadthejoy.png" 
            alt="Spread The Joy Foundation" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
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
            <span className="text-peppa-yellow font-semibold tracking-widest uppercase text-sm mb-4 block">
              The Official Charity of Peppajoy
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Spread The Joy Foundation
            </h1>
            <p className="text-lg text-white/90 mb-10 font-light max-w-2xl mx-auto">
              Dedicated to supporting our local island communities and honoring the brave men and women of the Armed Forces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Initiatives Section */}
      <section className="py-24 bg-white text-peppa-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-peppa-yellow/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-peppa-red/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-peppa-red font-semibold tracking-widest uppercase text-sm mb-4 block">
              Purpose-Driven Outreach
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Initiatives</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Explore our specific outreach programs. Fan Club members gain exclusive access to our purpose-driven collections, where 100% of the proceeds fund these exact causes.
            </p>
          </div>

          {/* Initiatives Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Initiative 1: Veterans */}
            <Link to="/initiative/veterans" className="bg-peppa-light border border-black/5 rounded-3xl overflow-hidden group hover:border-peppa-red/30 hover:shadow-xl transition-all block">
              <div className="aspect-[16/9] bg-black/20 relative overflow-hidden">
                <img 
                  src="https://i.ibb.co/tP1xxX51/image.png" 
                  alt="Peppajoy Pure Peace" 
                  className="w-full h-full object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-peppa-dark/90 to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-peppa-red flex items-center justify-center text-white">
                    <Medal className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">Peppajoy Pure Peace</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Bridging the gap between trauma and tranquility by funding restorative sanctuary experiences.
                </p>
                <div className="flex items-center text-peppa-red font-bold group-hover:text-peppa-dark transition-colors">
                  Explore Initiative & Products <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Initiative 2: Reel Relief */}
            <Link to="/initiative/reel-relief" className="bg-peppa-light border border-black/5 rounded-3xl overflow-hidden group hover:border-peppa-green/30 hover:shadow-xl transition-all block">
              <div className="aspect-[16/9] bg-black/20 relative overflow-hidden">
                <img 
                  src="https://i.ibb.co/WvyMj6Qv/reelrelief.avif" 
                  alt="Peppajoy's Reel Relief" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-peppa-dark/90 to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-peppa-green flex items-center justify-center text-white">
                    <Anchor className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">Peppajoy's Reel Relief</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Combating food insecurity by purchasing fresh catches from local fishermen and distributing meals to families in need.
                </p>
                <div className="flex items-center text-peppa-green font-bold group-hover:text-peppa-dark transition-colors">
                  Explore Initiative & Products <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Corporate / Direct Donation Section */}
      <section className="py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Story / Impact */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-peppa-dark mb-6">Making A Difference</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Make a direct impact on the lives of those in the Turks and Caicos Islands. Your one-time or recurring donations go straight to our core initiatives, helping us build a stronger, more resilient community.
              </p>
              
              <div className="space-y-8 mt-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-peppa-green/10 flex items-center justify-center text-peppa-green shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-peppa-dark mb-2">Sustainable Island Farming</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Providing grants and resources to local pepper farmers to implement sustainable, eco-friendly agricultural practices.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-peppa-yellow/10 flex items-center justify-center text-peppa-yellow shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-peppa-dark mb-2">Community Support</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Providing essential resources, food security, and assistance to families and individuals in need across the Turks and Caicos Islands.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Widget */}
            <div>
              <div className="bg-peppa-light rounded-3xl p-8 md:p-10 shadow-xl border border-black/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-peppa-red/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                
                <h3 className="text-2xl font-serif font-bold text-peppa-dark mb-2 relative z-10">Make a Contribution</h3>
                <p className="text-gray-500 text-sm mb-8 relative z-10">Choose an amount to donate. Tax receipts will be provided for corporate entities.</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
                  {[50, 100, 250, 500].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        setAmount(preset);
                        setCustomAmount("");
                      }}
                      className={cn(
                        "py-3 rounded-xl font-medium text-lg transition-all border-2",
                        amount === preset 
                          ? "bg-peppa-dark text-white border-peppa-dark shadow-md" 
                          : "bg-white text-peppa-dark border-black/10 hover:border-peppa-dark/50"
                      )}
                    >
                      ${preset}
                    </button>
                  ))}
                  
                  <div className="col-span-2 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input 
                      type="number" 
                      placeholder="Custom Amount"
                      value={customAmount}
                      onChange={handleCustomAmount}
                      className={cn(
                        "w-full py-3 pl-8 pr-4 rounded-xl font-medium text-lg transition-all border-2 outline-none",
                        customAmount && amount === null
                          ? "border-peppa-dark ring-4 ring-peppa-dark/10" 
                          : "border-black/10 focus:border-peppa-dark focus:ring-4 focus:ring-peppa-dark/10"
                      )}
                    />
                  </div>
                </div>

                {/* Corporate Toggle */}
                <div className="mb-6 relative z-10 bg-white p-4 rounded-xl border border-black/5">
                  <label className="flex items-center gap-3 cursor-pointer group mb-4">
                    <div className="relative flex items-center justify-center w-5 h-5 border-2 border-black/20 rounded group-hover:border-peppa-dark transition-colors">
                      <input 
                        type="checkbox" 
                        className="absolute opacity-0 w-full h-full cursor-pointer" 
                        checked={isCorporate}
                        onChange={() => setIsCorporate(!isCorporate)}
                      />
                      <Check className={cn("w-3 h-3 text-peppa-dark transition-opacity", isCorporate ? "opacity-100" : "opacity-0")} />
                    </div>
                    <span className="text-sm font-medium text-peppa-dark flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      Donate as a Business / Organization
                    </span>
                  </label>

                  {/* Corporate Fields */}
                  {isCorporate && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="space-y-4 overflow-hidden pt-2"
                    >
                      <div>
                        <input type="text" placeholder="Company Name" className="w-full bg-peppa-light border border-black/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-peppa-dark" />
                      </div>
                      <div>
                        <input type="text" placeholder="VAT / Tax ID Number" className="w-full bg-peppa-light border border-black/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-peppa-dark" />
                      </div>
                      <p className="text-xs text-gray-500">A formal tax receipt will be emailed to you for your records.</p>
                    </motion.div>
                  )}
                </div>
                
                <button className="w-full bg-peppa-red text-white py-4 rounded-full font-medium text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg relative z-10">
                  <Heart className="w-5 h-5 fill-current" />
                  Donate {amount ? `$${amount}` : customAmount ? `$${customAmount}` : ""}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
