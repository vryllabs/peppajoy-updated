import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, ShieldCheck, Leaf, Flame, Droplets, Heart, Check, ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 800], [0.6, 0]);

  const [activeMovement, setActiveMovement] = useState(0);
  const [activeShowcaseImage, setActiveShowcaseImage] = useState(0);

  const showcaseImages = [
    "https://i.ibb.co/5X4rfMSP/vryl-output-1770048402023.jpg",
    "https://i.ibb.co/sdd4wdL5/peppajoybanner.png",
    "https://i.ibb.co/srmNW8P/Peppajoy-about-us.png",
    "https://i.ibb.co/YBgc3d36/spreadthejoy.png"
  ];

  const nextShowcase = () => setActiveShowcaseImage((prev) => (prev + 1) % showcaseImages.length);
  const prevShowcase = () => setActiveShowcaseImage((prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length);

  useEffect(() => {
    const timer = setInterval(nextShowcase, 5000);
    return () => clearInterval(timer);
  }, []);

  const movements = [
    {
      id: 'heat',
      title: 'Heat Level',
      product: 'Peppajoy Ghost',
      desc: 'A robust, lingering burn that warms the palate. Crafted with authentic Ghost Peppers for those who crave a serious kick.',
      image: 'https://vryllabs.myshopify.com/cdn/shop/files/peppajoyghostVL.png',
      Icon: Flame,
      color: 'text-peppa-red',
      shadow: 'shadow-peppa-red/20',
      glow: 'shadow-[0_0_15px_rgba(220,38,38,0.6)]',
      barColor: 'bg-peppa-red',
      barShadow: 'shadow-[0_0_10px_rgba(220,38,38,0.6)]',
      levels: 5
    },
    {
      id: 'tangy',
      title: 'Tanginess',
      product: 'Peppajoy Lemon Mild',
      desc: 'A bright, acidic finish that cuts through rich dishes. The perfect balance of citrus zest and Caribbean spice.',
      image: 'https://m06v20wel2iqfo90-80605380847.shopifypreview.com/cdn/shop/files/peppajoy_lemon.png',
      Icon: Droplets,
      color: 'text-peppa-yellow',
      shadow: 'shadow-peppa-yellow/20',
      glow: 'shadow-[0_0_15px_rgba(252,210,14,0.6)]',
      barColor: 'bg-peppa-yellow',
      barShadow: 'shadow-[0_0_10px_rgba(252,210,14,0.6)]',
      levels: 3
    },
    {
      id: 'sweet',
      title: 'Sweetness',
      product: 'Peppajoy Regular',
      desc: 'Subtle natural sweetness from freshly grown guava. Our signature blend that started it all, perfect for every meal.',
      image: 'https://vryllabs.myshopify.com/cdn/shop/files/peppajoy_4_pack_regular.png',
      Icon: Leaf,
      color: 'text-peppa-green',
      shadow: 'shadow-peppa-green/20',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.6)]',
      barColor: 'bg-peppa-green',
      barShadow: 'shadow-[0_0_10px_rgba(16,185,129,0.6)]',
      levels: 3
    },
    {
      id: 'aroma',
      title: 'Aromatic Depth',
      product: 'Peppajoy Jerk Seasoning',
      desc: 'A complex blend of pimento, thyme, and island spices. The soul of Caribbean barbecue, delivering a rich, smoky finish to every dish.',
      image: 'https://m06v20wel2iqfo90-80605380847.shopifypreview.com/cdn/shop/files/jerkseasoning.png',
      Icon: Droplets, // Using droplets for the "essence" or Sparkles
      color: 'text-orange-400',
      shadow: 'shadow-orange-500/20',
      glow: 'shadow-[0_0_15px_rgba(251,146,60,0.6)]',
      barColor: 'bg-orange-500',
      barShadow: 'shadow-[0_0_10px_rgba(251,146,60,0.6)]',
      levels: 5
    }
  ];

  const nextMovement = () => setActiveMovement((prev) => (prev + 1) % movements.length);
  const prevMovement = () => setActiveMovement((prev) => (prev - 1 + movements.length) % movements.length);

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
              <img src="https://seekvectorlogo.com/wp-content/uploads/2022/02/matador-network-vector-logo-2022.png" alt="Matador Network" className="h-8 brightness-0 invert opacity-80" referrerPolicy="no-referrer" />
              <div className="text-white font-serif text-xl font-medium uppercase tracking-widest">Forbes</div>
              <div className="text-white font-sans text-xl font-bold">Bon Appétit</div>
              {/* Set 2 */}
              <div className="text-white font-serif text-xl font-bold italic">The New York Times</div>
              <div className="text-white font-sans text-xl font-black tracking-tighter">VOGUE</div>
              <img src="https://seekvectorlogo.com/wp-content/uploads/2022/02/matador-network-vector-logo-2022.png" alt="Matador Network" className="h-8 brightness-0 invert opacity-80" referrerPolicy="no-referrer" />
              <div className="text-white font-serif text-xl font-medium uppercase tracking-widest">Forbes</div>
              <div className="text-white font-sans text-xl font-bold">Bon Appétit</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Signature Sauce Showcase - Photo Carousel */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10 bg-gray-100">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeShowcaseImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src={showcaseImages[activeShowcaseImage]} 
                    alt={`Peppajoy Showcase ${activeShowcaseImage + 1}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                
                {/* Carousel Controls */}
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={prevShowcase}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextShowcase}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Carousel Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {showcaseImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveShowcaseImage(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeShowcaseImage === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
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

      {/* Detailed Taste Profile - Symphony of Heat Slider */}
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

          <div className="relative max-w-6xl mx-auto h-[700px] flex items-center justify-center">
            {/* Dynamic Background Text (Editorial Style) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-visible">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={movements[activeMovement].id}
                  initial={{ opacity: 0, scale: 0.8, y: 100 }}
                  animate={{ opacity: 0.08, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.2, y: -100 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-[14vw] font-serif font-black uppercase whitespace-nowrap tracking-tighter"
                >
                  {movements[activeMovement].id}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Floating Elements (Parallax Ingredients) */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                  className="absolute opacity-20"
                  style={{
                    top: `${20 + (i * 15)}%`,
                    left: `${10 + (i * 15)}%`,
                  }}
                >
                  {i % 3 === 0 ? <Flame className="w-8 h-8 text-peppa-red" /> : 
                   i % 3 === 1 ? <Leaf className="w-8 h-8 text-peppa-green" /> : 
                   <Droplets className="w-8 h-8 text-peppa-yellow" />}
                </motion.div>
              ))}
            </div>

            {/* 3D Spotlight Carousel */}
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                {movements.map((m, idx) => {
                  const MovementIcon = m.Icon;
                  let diff = idx - activeMovement;
                  if (diff > 1) diff -= movements.length;
                  if (diff < -1) diff += movements.length;

                  const isActive = diff === 0;

                  return (
                    <motion.div
                      key={m.id}
                      initial={false}
                      animate={{
                        x: diff * (window.innerWidth < 768 ? 300 : 450),
                        scale: isActive ? 1 : 0.7,
                        opacity: isActive ? 1 : 0.3,
                        zIndex: isActive ? 50 : 10,
                        rotateY: diff * -25,
                        filter: isActive ? 'blur(0px)' : 'blur(4px)',
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25
                      }}
                      className="absolute w-full max-w-[320px] md:max-w-[420px]"
                    >
                      <div 
                        onClick={() => setActiveMovement(idx)}
                        className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-[50px] p-8 md:p-12 text-center shadow-2xl transition-all cursor-pointer group relative overflow-hidden ${isActive ? m.shadow : 'hover:bg-white/10 hover:border-white/20'}`}
                      >
                        {/* Subtle inner glow */}
                        {isActive && (
                          <div className={`absolute inset-0 opacity-10 bg-gradient-to-b from-transparent via-${m.barColor.split('-')[1]}-500 to-transparent`} />
                        )}

                        {/* Product Image Showcase */}
                        <div className="relative mb-10 group/product">
                          <div className="relative z-10 h-56 md:h-72 flex items-center justify-center">
                            <motion.img 
                              initial={false}
                              animate={{ scale: isActive ? 1.1 : 0.9 }}
                              transition={{ duration: 0.5 }}
                              src={m.image} 
                              alt={m.product} 
                              className={`w-56 h-56 md:w-72 md:h-72 object-contain mx-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-all duration-700 ${!isActive && 'grayscale-[0.8]'}`}
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          
                          {/* Dynamic Background Glow */}
                          <AnimatePresence>
                            {isActive && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 0.4, scale: 1.5 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className={`absolute inset-0 blur-[80px] rounded-full -z-10 ${m.barColor}`}
                              />
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Content Area */}
                        <motion.div
                          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          <div className="flex items-center justify-center gap-4 mb-4">
                            <MovementIcon className={`w-10 h-10 ${m.color} ${m.glow}`} />
                            <h3 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">{m.title}</h3>
                          </div>
                          
                          <p className="text-peppa-yellow text-sm uppercase tracking-[0.3em] mb-8 font-black">{m.product}</p>
                          
                          <div className="flex justify-center gap-2 mb-10">
                            {[...Array(5)].map((_, i) => {
                              const isFilled = i < m.levels;
                              const isLastFilled = i === m.levels - 1;
                              const borderColorClass = m.color.replace('text-', 'border-');
                              
                              return (
                                <motion.div 
                                  key={i} 
                                  initial={false}
                                  animate={{
                                    height: isFilled ? [8, 12, 8] : 8,
                                    opacity: isFilled ? (isLastFilled ? [1, 0.4, 1] : 1) : 0.3,
                                    scale: isLastFilled ? [1, 1.1, 1] : 1
                                  }}
                                  transition={{ 
                                    duration: isLastFilled ? 1.5 : 2, 
                                    repeat: Infinity, 
                                    ease: "easeInOut",
                                    delay: isFilled && !isLastFilled ? i * 0.2 : 0 
                                  }}
                                  className={`w-10 h-2 rounded-full transition-all duration-700 ${
                                    isFilled 
                                      ? `${m.barColor} ${m.barShadow}` 
                                      : `border ${borderColorClass}/40 bg-transparent`
                                  }`}
                                ></motion.div>
                              );
                            })}
                          </div>
                          
                          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-[320px] mx-auto font-light">
                            {m.desc}
                          </p>
                        </motion.div>

                        {!isActive && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors rounded-[50px]">
                            <span className="sr-only">View {m.title}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Navigation Controls (Immersive Side Placement) */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-50 px-4 md:-mx-12">
              <button 
                onClick={prevMovement}
                className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-peppa-red hover:border-peppa-red transition-all group active:scale-90 shadow-xl pointer-events-auto"
              >
                <ChevronLeft className="w-5 h-5 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={nextMovement}
                className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-peppa-red hover:border-peppa-red transition-all group active:scale-90 shadow-xl pointer-events-auto"
              >
                <ChevronRight className="w-5 h-5 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Pagination Dots (Bottom Center) */}
            <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex gap-4 z-50">
              {movements.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMovement(idx)}
                  className={`h-3 rounded-full transition-all duration-700 ${
                    activeMovement === idx ? 'w-16 bg-peppa-red' : 'w-3 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
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
