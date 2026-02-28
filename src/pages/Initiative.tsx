import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Heart, Lock, Medal, Anchor, ArrowRight, ShieldCheck, ShoppingCart, Target, Handshake } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const initiativesData = {
  "veterans": {
    title: "Peppajoy Pure Peace",
    subtitle: "Sanctuary for the Spirit",
    heroImage: "https://i.ibb.co/C5qTpCb3/image.png",
    description: "Our mission is to bridge the gap between trauma and tranquility. We believe that while the world can be heavy, everyone deserves a moment of absolute stillness. Pure Peace provides a sanctuary for the spirit, offering a necessary reprieve for those navigating the aftermath of life’s hardest chapters.",
    howWeHelp: "Whether recovering from the shadows of childhood, the front lines of duty, or the weight of life’s unforeseen chapters, Pure Peace offers the sanctuary you deserve. By funding tailored restorative experiences—from luxury spa therapy to quiet wilderness retreats—we provide more than a moment away. We provide the clarity and reprieve required for the soul to heal and the spirit to start anew.",
    icon: Medal,
    color: "peppa-red",
    products: [
      {
        id: "vet-pen",
        name: "Engraved Tactical Pen",
        price: 10.99,
        desc: "A beautifully crafted, made-to-order pen shaped like a bullet. A symbol of strength and service.",
        image: "https://i.ibb.co/Q7V6csdK/image.png",
        turnaround: "Hand made 3-4 weeks turn around time"
      }
    ]
  },
  "reel-relief": {
    title: "Peppajoy's Reel Relief",
    subtitle: "Feeding the Community",
    heroImage: "https://i.ibb.co/WvyMj6Qv/reelrelief.avif",
    description: "The ocean provides for the islands, and we believe no one in our community should go hungry. Peppajoy's Reel Relief is our initiative to combat food insecurity in the Turks and Caicos.",
    howWeHelp: "Funds raised through the Reel Relief collection are used to purchase fresh catches directly from local fishermen. This fish is then distributed to families in need, shelters, and community kitchens across the islands—supporting both local anglers and hungry families.",
    icon: Anchor,
    color: "peppa-green",
    products: [
      {
        id: "reel-knife",
        name: "Engraved Fillet Knife",
        price: 85.00,
        desc: "A professional-grade, custom-engraved fillet knife. Essential for any island kitchen.",
        image: "https://picsum.photos/seed/filletknife/400/500",
        turnaround: "Hand made 3-4 weeks turn around time"
      }
    ]
  }
};

export default function Initiative() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { addToCart } = useCart();
  
  const initiative = id ? initiativesData[id as keyof typeof initiativesData] : null;

  if (!initiative) {
    return <div className="min-h-screen flex items-center justify-center">Initiative not found.</div>;
  }

  const Icon = initiative.icon;

  return (
    <div className="bg-peppa-light min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-peppa-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src={initiative.heroImage} 
            alt={initiative.title} 
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-6 backdrop-blur-sm">
              <Icon className="w-8 h-8" />
            </div>
            <span className="text-peppa-yellow font-semibold tracking-widest uppercase text-sm mb-4 block">
              {initiative.subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              {initiative.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Mission & How We Help Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Mission */}
            <div className="bg-white rounded-3xl p-10 border-2 border-peppa-red/20 relative overflow-hidden shadow-sm flex flex-col justify-center">
              {/* Bullseye Border Graphic */}
              <div className="absolute top-0 right-0 w-64 h-64 border-[40px] border-peppa-red/5 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-40 h-40 border-[30px] border-peppa-red/5 rounded-full -mr-8 -mt-8 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-peppa-red/10 flex items-center justify-center text-peppa-red shrink-0">
                    <Target className="w-7 h-7" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-peppa-dark">The Mission</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {initiative.description}
                </p>
              </div>
            </div>
            
            {/* How We Help */}
            <div className="bg-peppa-green/5 rounded-3xl p-10 border border-peppa-green/20 relative overflow-hidden shadow-sm flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-48 h-48 bg-peppa-green/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-peppa-green/20 flex items-center justify-center text-peppa-green shrink-0">
                    <Handshake className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-peppa-dark">How We Help</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {initiative.howWeHelp}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support The Cause / CTA Section */}
      <section className="py-20 bg-peppa-light border-y border-black/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-12 h-12 text-peppa-red mx-auto mb-6 fill-current" />
          <h2 className="text-4xl font-serif font-bold text-peppa-dark mb-6">Support the Cause</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            Purchase exclusive souvenirs from our Members Only Store below. 100% of the proceeds from these items go directly to {initiative.title}.
          </p>
          {!user && (
            <Link 
              to="/fan-club" 
              className="inline-flex items-center gap-2 bg-peppa-red text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-red-700 transition-colors shadow-lg"
            >
              Join Fan Club to Unlock Store <ArrowRight className="w-5 h-5" />
            </Link>
          )}
          {user && (
            <Link 
              to={`/collection/${id}`} 
              className="inline-flex items-center gap-2 bg-peppa-dark text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-black transition-colors shadow-lg"
            >
              Shop Exclusive Collection <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
