import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users, Flame, Utensils, Instagram, Star } from "lucide-react";
import { useState } from "react";

const recipes = [
  {
    id: "peppajoy-wings",
    title: "Signature Peppajoy Wings",
    desc: "The ultimate island-style wings. Crispy, tangy, and packed with the signature Peppajoy heat.",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800",
    time: "45 mins",
    serves: "4 people",
    difficulty: "Medium",
    heat: 4,
    tags: ["Appetizer", "Chicken", "Spicy"]
  },
  {
    id: "lemon-mild-shrimp",
    title: "Lemon Mild Garlic Shrimp",
    desc: "A bright and zesty seafood dish featuring our Lemon Mild sauce. Perfect for a quick summer dinner.",
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&q=80&w=800",
    time: "20 mins",
    serves: "2 people",
    difficulty: "Easy",
    heat: 2,
    tags: ["Seafood", "Quick", "Zesty"]
  },
  {
    id: "ghost-pepper-tacos",
    title: "Ghost Pepper Street Tacos",
    desc: "For the brave. Slow-cooked beef brisket infused with Peppajoy Ghost sauce.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    time: "3 hours",
    serves: "6 people",
    difficulty: "Hard",
    heat: 5,
    tags: ["Main Course", "Beef", "Extreme Heat"]
  }
];

const communitySubmissions = [
  {
    user: "@island_cook",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=400",
    caption: "Added a splash of Peppajoy to my morning eggs. Game changer! #peppajoyfanclub"
  },
  {
    user: "@spice_queen",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400",
    caption: "Peppajoy Ghost ribs for the weekend BBQ. 🔥 @peppajoy"
  },
  {
    user: "@chef_marcus",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400",
    caption: "Testing a new Peppajoy vinaigrette for the summer menu. #peppajoy"
  }
];

export default function Recipes() {
  const [activeFilter, setActiveFilter] = useState("All Recipes");

  const filteredRecipes = activeFilter === "All Recipes" 
    ? recipes 
    : recipes.filter(r => r.tags.includes(activeFilter));

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Editorial Style */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-peppa-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1920" 
            alt="Cooking background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-peppa-dark/20 via-peppa-dark/60 to-peppa-dark" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-peppa-yellow font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
              The Culinary Lab
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-black text-white uppercase tracking-tighter mb-6">
              Recipes
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light">
              Elevate your kitchen with the science of Caribbean heat. From quick bites to slow-cooked masterpieces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Official Recipes Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 border-b border-black/10 pb-8">
          <div>
            <h2 className="text-4xl font-serif font-bold text-peppa-dark">Official Collection</h2>
            <p className="text-gray-500 mt-2 font-mono text-sm uppercase tracking-widest">Volume 01: The Classics</p>
          </div>
          <div className="hidden md:flex gap-4">
            <button 
              onClick={() => setActiveFilter("All Recipes")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeFilter === "All Recipes" ? "bg-peppa-dark text-white shadow-lg" : "bg-peppa-light text-peppa-dark border border-black/5 hover:bg-gray-200"}`}
            >
              All Recipes
            </button>
            <button 
              onClick={() => setActiveFilter("Chicken")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeFilter === "Chicken" ? "bg-peppa-dark text-white shadow-lg" : "text-gray-400 hover:bg-peppa-light hover:text-peppa-dark border border-transparent"}`}
            >
              Chicken
            </button>
            <button 
              onClick={() => setActiveFilter("Seafood")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeFilter === "Seafood" ? "bg-peppa-dark text-white shadow-lg" : "text-gray-400 hover:bg-peppa-light hover:text-peppa-dark border border-transparent"}`}
            >
              Seafood
            </button>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredRecipes.map((recipe, idx) => (
              <motion.div
                key={recipe.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
              >
                <Link to={`/recipe/${recipe.id}`}>
                  <div className="aspect-[4/5] overflow-hidden rounded-3xl mb-6 relative shadow-xl">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-peppa-dark">
                      {recipe.difficulty}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    {recipe.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono text-peppa-red uppercase tracking-widest font-bold">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-peppa-dark mb-3 group-hover:text-peppa-red transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                    {recipe.desc}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-black/5">
                    <div className="flex items-center gap-4 text-gray-400 text-xs font-mono">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {recipe.time}</span>
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {recipe.serves}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Flame key={i} className={`w-3.5 h-3.5 ${i < recipe.heat ? 'text-peppa-red fill-peppa-red' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Community Section - Instagram Integration Concept */}
      <section className="bg-peppa-light py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-peppa-red font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
                #PeppajoyFanClub
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-black text-peppa-dark uppercase tracking-tighter mb-8 leading-none">
                Show Us Your <br /> <span className="text-peppa-red">Island Twist</span>
              </h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed font-light">
                We love seeing how you use Peppajoy in your own kitchen. Tag us on Instagram <span className="font-bold text-peppa-dark">@peppajoy</span> or use <span className="font-bold text-peppa-dark">#peppajoyfanclub</span> for a chance to be featured and win a curated mystery gift and a global spotlight.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-peppa-red text-white flex items-center justify-center shrink-0 font-serif font-bold italic">1</div>
                  <p className="text-gray-700 pt-2"><span className="font-bold">Cook</span> your favorite dish using any Peppajoy sauce.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-peppa-red text-white flex items-center justify-center shrink-0 font-serif font-bold italic">2</div>
                  <p className="text-gray-700 pt-2"><span className="font-bold">Snap</span> a high-quality photo or video of the result.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-peppa-red text-white flex items-center justify-center shrink-0 font-serif font-bold italic">3</div>
                  <p className="text-gray-700 pt-2"><span className="font-bold">Post</span> to Instagram tagging <span className="text-peppa-red font-bold">@peppajoy</span>.</p>
                </div>
              </div>

              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex bg-peppa-dark text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black transition-all items-center gap-3 shadow-xl"
              >
                <Instagram className="w-5 h-5" /> Follow The Club
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {communitySubmissions.map((sub, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative group rounded-2xl overflow-hidden shadow-lg ${i === 2 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}
                >
                  <img src={sub.image} alt="Community submission" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <p className="text-white font-bold text-sm mb-1">{sub.user}</p>
                    <p className="text-white/80 text-xs line-clamp-2">{sub.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cookbook Teaser */}
      <section className="py-24 bg-peppa-dark text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-peppa-red/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Utensils className="w-12 h-12 text-peppa-yellow mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Coming Soon: The Peppajoy Cookbook</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10 font-light">
              We're compiling the definitive guide to Caribbean heat. A premium, coffee-table style cookbook featuring 50+ recipes from top island chefs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="bg-peppa-yellow text-peppa-dark px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-yellow-400 transition-all shadow-lg shadow-peppa-yellow/20">
                Get Early Access
              </button>
              <p className="text-peppa-yellow font-mono text-xs uppercase tracking-widest">Limited Edition • Winter 2026</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
