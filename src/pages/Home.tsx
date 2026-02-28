import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, ShieldCheck, Leaf, Flame, Droplets, Heart, Check } from "lucide-react";

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 800], [0.6, 0]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-peppa-dark">
        <div className="absolute inset-0 z-0">
          <motion.img 
            style={{ y: heroY, opacity: heroOpacity }}
            src="https://i.ibb.co/sdd4wdL5/peppajoybanner.png" 
            alt="Turks and Caicos Islands" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-peppa-dark via-peppa-dark/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-peppa-yellow font-semibold tracking-widest uppercase text-sm mb-4 block">
              The Only Sauce You'll Ever Need
            </span>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-bold text-peppa-red mb-4 sm:mb-6 leading-tight uppercase tracking-wider">
              PEPPAJOY
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto font-light leading-relaxed px-4 sm:px-0">
              Gourmet hot sauce crafted with authentic Caribbean peppers, bringing the vibrant flavors of the Turks and Caicos islands straight to your table.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0">
              <Link 
                to="/product/1" 
                className="bg-peppa-red text-white px-8 py-3 sm:px-10 sm:py-4 rounded-full font-medium hover:bg-red-700 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center text-base sm:text-lg shadow-lg shadow-peppa-red/30"
              >
                Get the Sauce <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Press / As Seen In Bar */}
      <section className="bg-peppa-dark border-b border-white/10 py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-xs font-semibold tracking-widest uppercase mb-6">As Featured In</p>
          <div className="relative flex overflow-hidden opacity-50 grayscale [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
              className="flex gap-12 md:gap-24 min-w-max pr-12 md:pr-24 items-center"
            >
              {/* Set 1 */}
              <div className="text-white font-serif text-xl font-bold italic">The New York Times</div>
              <div className="text-white font-sans text-xl font-black tracking-tighter">VOGUE</div>
              <div className="text-white font-serif text-xl font-medium uppercase tracking-widest">Forbes</div>
              <div className="text-white font-sans text-xl font-bold">Bon Appétit</div>
              {/* Set 2 */}
              <div className="text-white font-serif text-xl font-bold italic">The New York Times</div>
              <div className="text-white font-sans text-xl font-black tracking-tighter">VOGUE</div>
              <div className="text-white font-serif text-xl font-medium uppercase tracking-widest">Forbes</div>
              <div className="text-white font-sans text-xl font-bold">Bon Appétit</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Signature Sauce Showcase */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <motion.img 
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src="https://i.ibb.co/5X4rfMSP/vryl-output-1770048402023.jpg" 
                  alt="Peppajoy Hot Sauce" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-peppa-yellow/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-peppa-red/20 rounded-full blur-3xl -z-10"></div>
              
              {/* Badge */}
              <div className="absolute -bottom-6 -right-6 bg-peppa-green text-white p-6 rounded-full shadow-xl w-32 h-32 flex items-center justify-center text-center transform rotate-12 z-20 border-4 border-white">
                <span className="font-serif font-bold leading-tight text-lg">100%<br/>Natural</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <span className="text-peppa-red font-semibold tracking-widest uppercase text-sm mb-4 block">
                Our Signature Sauce
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-peppa-dark mb-6 leading-tight">
                Spice Things Up
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-base sm:text-lg">
                Peppajoy is an artisanal fusion of tropical heat and refined sweetness, born in the heart of the Turks and Caicos. Our signature blend is defined by purity—crafted with all-natural ingredients, zero preservatives, and a commitment to bold, island-inspired flavor.
              </p>
              <p className="text-gray-600 mb-8 sm:mb-10 leading-relaxed text-base sm:text-lg">
                From professional kitchens to backyard grills, it’s the definitive secret ingredient for those who refuse to settle for ordinary.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/product/1" 
                  className="inline-flex bg-peppa-yellow text-peppa-dark px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium hover:bg-yellow-400 transition-all items-center justify-center gap-2 shadow-[0_0_20px_rgba(252,210,14,0.3)] transform hover:-translate-y-1 text-sm sm:text-base"
                >
                  Shop The Sauce <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/shop" 
                  className="inline-flex bg-white text-peppa-dark border-2 border-black/10 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium hover:border-peppa-dark transition-all items-center justify-center gap-2 text-sm sm:text-base"
                >
                  View Bundles
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Taste Profile */}
      <section className="py-24 bg-peppa-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co/srmNW8P/Peppajoy-about-us.png" 
            alt="Flavor Profile Background" 
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-peppa-dark/60" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-peppa-red/10 rounded-full blur-3xl pointer-events-none z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-peppa-yellow font-semibold tracking-widest uppercase text-sm mb-4 block">
              The Flavor Profile
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">A Symphony of Heat</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Perfectly balanced to enhance your food, not overpower it.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center shadow-xl transition-shadow hover:shadow-2xl hover:shadow-peppa-red/20"
            >
              <Flame className="w-10 h-10 text-peppa-red mx-auto mb-4 drop-shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
              <h3 className="text-xl font-serif font-bold mb-2">Heat Level</h3>
              <div className="flex justify-center gap-1 mb-4">
                <div className="w-6 h-2 bg-peppa-red rounded-full shadow-[0_0_10px_rgba(220,38,38,0.6)]"></div>
                <div className="w-6 h-2 bg-peppa-red rounded-full shadow-[0_0_10px_rgba(220,38,38,0.6)]"></div>
                <motion.div 
                  animate={{ opacity: [0.4, 1, 0.4] }} 
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} 
                  className="w-6 h-2 bg-peppa-red rounded-full shadow-[0_0_10px_rgba(220,38,38,0.6)]"
                ></motion.div>
                <div className="w-6 h-2 bg-white/20 rounded-full"></div>
                <div className="w-6 h-2 bg-white/20 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-400">A robust, lingering burn that warms the palate.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center shadow-xl transition-shadow hover:shadow-2xl hover:shadow-peppa-yellow/20"
            >
              <Droplets className="w-10 h-10 text-peppa-yellow mx-auto mb-4 drop-shadow-[0_0_15px_rgba(252,210,14,0.6)]" />
              <h3 className="text-xl font-serif font-bold mb-2">Sweetness</h3>
              <div className="flex justify-center gap-1 mb-4">
                <div className="w-6 h-2 bg-peppa-yellow rounded-full shadow-[0_0_10px_rgba(252,210,14,0.6)]"></div>
                <div className="w-6 h-2 bg-peppa-yellow rounded-full shadow-[0_0_10px_rgba(252,210,14,0.6)]"></div>
                <motion.div 
                  animate={{ opacity: [0.4, 1, 0.4] }} 
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} 
                  className="w-6 h-2 bg-peppa-yellow rounded-full shadow-[0_0_10px_rgba(252,210,14,0.6)]"
                ></motion.div>
                <div className="w-6 h-2 bg-white/20 rounded-full"></div>
                <div className="w-6 h-2 bg-white/20 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-400">Subtle natural sweetness from freshly grown guava.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center shadow-xl transition-shadow hover:shadow-2xl hover:shadow-peppa-green/20"
            >
              <Leaf className="w-10 h-10 text-peppa-green mx-auto mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]" />
              <h3 className="text-xl font-serif font-bold mb-2">Tanginess</h3>
              <div className="flex justify-center gap-1 mb-4">
                <div className="w-6 h-2 bg-peppa-green rounded-full shadow-[0_0_10px_rgba(16,185,129,0.6)]"></div>
                <div className="w-6 h-2 bg-peppa-green rounded-full shadow-[0_0_10px_rgba(16,185,129,0.6)]"></div>
                <motion.div 
                  animate={{ opacity: [0.4, 1, 0.4] }} 
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} 
                  className="w-6 h-2 bg-[#00FF00] rounded-full shadow-[0_0_15px_rgba(0,255,0,0.8)]"
                ></motion.div>
                <div className="w-6 h-2 bg-white/20 rounded-full"></div>
                <div className="w-6 h-2 bg-white/20 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-400">A bright, acidic finish that cuts through rich dishes.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Split Layout: Giving Back & Fan Club */}
      <section className="flex flex-col lg:flex-row min-h-[600px] border-t border-black/5">
        
        {/* Left Side: Giving Back */}
        <div className="w-full lg:w-1/2 bg-[#FDFBF7] py-24 px-4 sm:px-6 lg:px-16 xl:px-24 flex flex-col justify-center items-center text-center border-b lg:border-b-0 lg:border-r border-black/5 relative overflow-hidden">
          {/* Faint Red Design */}
          <div className="absolute -bottom-32 -left-32 text-peppa-red/5 transform -rotate-12 pointer-events-none">
            <Heart className="w-[500px] h-[500px]" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <div className="w-12 h-12 rounded-full bg-peppa-red/10 flex items-center justify-center text-peppa-red mx-auto mb-6">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <span className="text-peppa-red font-semibold tracking-widest uppercase text-sm mb-4 block">
              Join The Cause
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-peppa-dark mb-4 sm:mb-6">Giving Back to the Islands</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 leading-relaxed">
              We are dedicated to fostering sustainable agriculture and empowering the local community across the Turks and Caicos Islands. Discover how your contribution drives meaningful, lasting impact.
            </p>
            <Link 
              to="/donate" 
              className="inline-flex bg-white text-peppa-dark border-2 border-peppa-dark px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium hover:bg-peppa-dark hover:text-white transition-all items-center gap-2 text-sm sm:text-base"
            >
              Explore Our Mission <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Fan Club */}
        <div className="w-full lg:w-1/2 bg-peppa-green text-white py-24 px-4 sm:px-6 lg:px-16 xl:px-24 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-peppa-yellow/20 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Faint Design */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 transform rotate-12 pointer-events-none">
            <Flame className="w-[600px] h-[600px]" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 max-w-lg"
          >
            <div className="w-12 h-12 rounded-full bg-peppa-yellow/20 flex items-center justify-center text-peppa-yellow mx-auto mb-6">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <span className="text-peppa-yellow font-semibold tracking-widest uppercase text-sm mb-4 block">
              Join The Heat
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 sm:mb-6">
              The Peppajoy Fan Club
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-8 sm:mb-10 leading-relaxed font-light">
              Unlock exclusive perks, early access to limited reserve batches, and member-only discounts. Never run out of your favorite sauce again.
            </p>
            <Link 
              to="/fan-club" 
              className="inline-flex bg-peppa-yellow text-peppa-dark px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(252,210,14,0.3)] items-center gap-2 text-sm sm:text-base"
            >
              Explore Memberships <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

      </section>

      {/* Featured Reviews */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-peppa-yellow font-semibold tracking-widest uppercase text-sm mb-4 block">
              Turks & Caicos
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-peppa-dark mb-4">#1 Hot Sauce On Amazon</h2>
            <div className="flex justify-center items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-peppa-yellow text-peppa-yellow" />
              ))}
            </div>
            <p className="text-gray-600 font-medium">Based on 500+ 5-Star Reviews</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { text: "This is hands down the best hot sauce I've ever had. It has the perfect amount of heat but the flavor is what keeps me coming back. I put it on literally everything.", author: "Sarah M.", location: "Verified Amazon Purchase" },
              { text: "I bought a bottle while on vacation in Turks and Caicos and ran out in a week. So glad I can order it online now! The 3-pack is the way to go.", author: "David T.", location: "Verified Amazon Purchase" },
              { text: "Finally, a hot sauce that doesn't just taste like vinegar and fire. You can actually taste the fresh peppers and spices. Incredible quality.", author: "Jessica R.", location: "Verified Amazon Purchase" }
            ].map((review, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="bg-peppa-light p-8 rounded-3xl border border-black/5 flex flex-col h-full"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-peppa-yellow text-peppa-yellow" />
                  ))}
                </div>
                <p className="text-peppa-dark font-serif text-lg italic mb-6 flex-grow">"{review.text}"</p>
                <div>
                  <p className="font-bold text-sm text-peppa-dark">{review.author}</p>
                  <p className="text-xs text-peppa-yellow font-medium mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" /> {review.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <a 
              href="https://us.amazon.com/Peppajoy-Original-Gourmet-Pepper-Sauce/dp/B084BTXSSB" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex bg-peppa-dark text-white px-8 py-4 rounded-full font-medium hover:bg-black transition-colors items-center gap-2"
            >
              Shop Peppajoy on Amazon <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
