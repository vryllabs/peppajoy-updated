import { motion } from "motion/react";
import { Leaf, ShieldCheck, Flame } from "lucide-react";

export default function About() {
  return (
    <div className="bg-peppa-light min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-peppa-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co/srmNW8P/Peppajoy-about-us.png" 
            alt="Peppajoy Story" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
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
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Our Story
            </h1>
            <p className="text-lg text-white/90 mb-10 font-light max-w-2xl mx-auto">
              Born in the Turks and Caicos Islands, Peppajoy is more than just a hot sauce—it's a celebration of Caribbean culture, flavor, and community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image with Text Section 1 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://i.ibb.co/bnWCbc3/image.jpg" 
                  alt="Making Peppajoy" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-peppa-yellow rounded-full -z-10 blur-3xl opacity-50"></div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-peppa-dark mb-6">The Island Roots</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                It all started in a small kitchen in Providenciales. Our founder, driven by a passion for authentic Caribbean heat, began experimenting with local peppers, spices, and fruits.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                The goal wasn't just to make something spicy; it was to capture the essence of the islands—the vibrant colors, the warm breeze, and the rich culinary heritage of Turks and Caicos.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-peppa-red/10 flex items-center justify-center text-peppa-red">
                  <Flame className="w-6 h-6" />
                </div>
                <span className="font-serif font-bold text-xl text-peppa-dark">Authentic Heat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 bg-peppa-dark text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-20 h-20 rounded-full bg-peppa-red/20 mx-auto flex items-center justify-center text-peppa-red mb-6">
                <Flame className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Uncompromising Quality</h3>
              <p className="text-gray-400 leading-relaxed">We never sacrifice flavor for heat. Every bottle is a perfect balance of both.</p>
            </div>
            
            <div>
              <div className="w-20 h-20 rounded-full bg-peppa-green/20 mx-auto flex items-center justify-center text-peppa-green mb-6">
                <Leaf className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Sustainability</h3>
              <p className="text-gray-400 leading-relaxed">We support local agriculture and strive to minimize our environmental footprint.</p>
            </div>
            
            <div>
              <div className="w-20 h-20 rounded-full bg-peppa-yellow/20 mx-auto flex items-center justify-center text-peppa-yellow mb-6">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Community First</h3>
              <p className="text-gray-400 leading-relaxed">We are dedicated to giving back to the islands that gave us our start.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
