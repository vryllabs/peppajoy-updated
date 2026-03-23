import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Users, Flame, Utensils, Check, Share2, Printer, Star, Instagram } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const recipes = {
  "peppajoy-wings": {
    title: "Signature Peppajoy Wings",
    desc: "The ultimate island-style wings. Crispy, tangy, and packed with the signature Peppajoy heat.",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=1200",
    time: "45 mins",
    serves: "4 people",
    difficulty: "Medium",
    heat: 4,
    ingredients: [
      "2 lbs Chicken Wings (split into flats and drums)",
      "1/2 cup Peppajoy Regular or Ghost Sauce",
      "2 tbsp Unsalted Butter, melted",
      "1 tsp Garlic Powder",
      "1/2 tsp Smoked Paprika",
      "Salt and Black Pepper to taste",
      "Fresh Cilantro for garnish",
      "Lime wedges for serving"
    ],
    instructions: [
      "Preheat your oven to 425°F (220°C) or prepare your air fryer.",
      "Pat the chicken wings completely dry with paper towels. This is crucial for crispiness.",
      "In a large bowl, toss the wings with salt, pepper, garlic powder, and smoked paprika.",
      "Bake for 35-40 minutes, flipping halfway through, until golden brown and crispy.",
      "In a small bowl, whisk together the Peppajoy sauce and melted butter.",
      "Once the wings are done, toss them in the Peppajoy glaze while still hot.",
      "Garnish with cilantro and serve immediately with lime wedges."
    ],
    proTip: "For extra crispy wings, let them sit uncovered in the fridge for 2 hours before cooking to dry out the skin."
  },
  "lemon-mild-shrimp": {
    title: "Lemon Mild Garlic Shrimp",
    desc: "A bright and zesty seafood dish featuring our Lemon Mild sauce. Perfect for a quick summer dinner.",
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&q=80&w=1200",
    time: "20 mins",
    serves: "2 people",
    difficulty: "Easy",
    heat: 2,
    ingredients: [
      "1 lb Large Shrimp, peeled and deveined",
      "3 tbsp Peppajoy Lemon Mild Sauce",
      "4 cloves Garlic, minced",
      "2 tbsp Olive Oil",
      "1/4 cup Dry White Wine (optional)",
      "Fresh Parsley, chopped",
      "Crusty bread for serving"
    ],
    instructions: [
      "Heat olive oil in a large skillet over medium-high heat.",
      "Add the shrimp in a single layer and cook for 1-2 minutes per side until pink.",
      "Add the minced garlic and cook for 30 seconds until fragrant.",
      "Deglaze the pan with white wine if using, or add 2 tbsp of water.",
      "Stir in the Peppajoy Lemon Mild sauce and toss to coat the shrimp evenly.",
      "Simmer for 1 minute until the sauce thickens slightly.",
      "Garnish with parsley and serve hot with crusty bread for dipping."
    ],
    proTip: "Don't overcook the shrimp! They are done as soon as they turn opaque and form a 'C' shape."
  },
  "ghost-pepper-tacos": {
    title: "Ghost Pepper Street Tacos",
    desc: "For the brave. Slow-cooked beef brisket infused with Peppajoy Ghost sauce.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1200",
    time: "3 hours",
    serves: "6 people",
    difficulty: "Hard",
    heat: 5,
    ingredients: [
      "3 lbs Beef Brisket or Chuck Roast",
      "1/2 cup Peppajoy Ghost Sauce",
      "1 large Onion, diced",
      "3 cloves Garlic, smashed",
      "1 cup Beef Broth",
      "Corn Tortillas",
      "Pickled Red Onions and Cotija Cheese for topping"
    ],
    instructions: [
      "Season the beef generously with salt and pepper.",
      "In a heavy pot or Dutch oven, sear the beef on all sides until deeply browned.",
      "Add the onion and garlic, cooking until softened.",
      "Pour in the beef broth and Peppajoy Ghost sauce.",
      "Cover and braise in a 300°F oven for 3 hours, or until the meat shreds easily with a fork.",
      "Shred the meat and toss it back into the cooking juices.",
      "Serve on warm corn tortillas with pickled onions and cotija cheese."
    ],
    proTip: "The heat intensifies as it braises. If you want it milder, use half Ghost and half Regular Peppajoy."
  }
};

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const recipe = recipes[id as keyof typeof recipes];

  const handleSharePhoto = () => {
    if (user) {
      navigate("/profile?tab=recipes");
    } else {
      navigate("/fan-club");
    }
  };

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Recipe Not Found</h2>
          <Link to="/recipes" className="text-peppa-red hover:underline">Back to Recipes</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header Image */}
      <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        <Link 
          to="/recipes" 
          className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white transition-all group"
        >
          <ArrowLeft className="w-5 h-5 text-peppa-dark group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-16 border border-black/5">
          {/* Recipe Meta */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-1">Cook Time</span>
                <span className="font-serif font-bold text-xl flex items-center gap-2"><Clock className="w-5 h-5 text-peppa-red" /> {recipe.time}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-1">Servings</span>
                <span className="font-serif font-bold text-xl flex items-center gap-2"><Users className="w-5 h-5 text-peppa-red" /> {recipe.serves}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-1">Heat Level</span>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Flame key={i} className={`w-5 h-5 ${i < recipe.heat ? 'text-peppa-red fill-peppa-red' : 'text-gray-200'}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="p-3 rounded-full border border-black/10 hover:bg-peppa-light transition-colors"><Share2 className="w-5 h-5" /></button>
              <button className="p-3 rounded-full border border-black/10 hover:bg-peppa-light transition-colors"><Printer className="w-5 h-5" /></button>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-black text-peppa-dark mb-6 leading-none tracking-tighter uppercase">
            {recipe.title}
          </h1>
          <p className="text-xl text-gray-600 mb-16 font-light leading-relaxed max-w-3xl">
            {recipe.desc}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Ingredients - Technical Style */}
            <div className="lg:col-span-4">
              <div className="bg-peppa-light rounded-3xl p-8 border border-black/5">
                <h3 className="text-xs font-mono font-black uppercase tracking-[0.3em] text-peppa-red mb-8 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredients List
                </h3>
                <ul className="space-y-4">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3 text-peppa-dark font-medium border-b border-black/5 pb-3">
                      <Check className="w-4 h-4 text-peppa-green mt-1 shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Pro Tip Box */}
              <div className="mt-8 bg-peppa-dark text-white rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Star className="w-16 h-16" />
                </div>
                <h4 className="text-peppa-yellow font-mono text-[10px] uppercase tracking-widest mb-4">Pro Culinary Tip</h4>
                <p className="text-sm font-light leading-relaxed italic">
                  "{recipe.proTip}"
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="lg:col-span-8">
              <h3 className="text-xs font-mono font-black uppercase tracking-[0.3em] text-peppa-red mb-8">
                Execution Steps
              </h3>
              <div className="space-y-12">
                {recipe.instructions.map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full border-2 border-peppa-red flex items-center justify-center font-serif font-bold text-xl text-peppa-red group-hover:bg-peppa-red group-hover:text-white transition-all shrink-0">
                        {i + 1}
                      </div>
                      {i < recipe.instructions.length - 1 && (
                        <div className="w-0.5 h-full bg-peppa-red/10 mt-4" />
                      )}
                    </div>
                    <div className="pt-2">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Call to Action */}
              <div className="mt-24 p-12 rounded-[40px] bg-peppa-yellow/10 border-2 border-dashed border-peppa-yellow/30 text-center">
                <Instagram className="w-10 h-10 text-peppa-red mx-auto mb-6" />
                <h4 className="text-2xl font-serif font-bold text-peppa-dark mb-4">Made this recipe?</h4>
                <p className="text-gray-600 mb-8">
                  Tag <span className="font-bold">@peppajoy</span> and use <span className="font-bold">#peppajoyfanclub</span> for a chance to be featured!
                </p>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={handleSharePhoto}
                    className="bg-peppa-dark text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black transition-all"
                  >
                    Share Photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
