import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { Star, Filter, ChevronDown, Crown, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const collectionsData = {
  "veterans": {
    title: "Pure Peace Collection",
    description: "Exclusive items supporting our mission of tranquility and healing.",
    products: [
      {
        id: "vet-pen",
        name: "Engraved Tactical Pen",
        price: 10.99,
        salePrice: 10.99,
        image: "https://i.ibb.co/Q7V6csdK/image.png",
        rating: 5.0,
        reviews: 42,
        badge: "Made to Order",
        turnaround: "Hand made 3-4 weeks turn around time"
      }
    ]
  },
  "reel-relief": {
    title: "Reel Relief Collection",
    description: "Exclusive items supporting food security in the Turks and Caicos.",
    products: [
      {
        id: "reel-knife",
        name: "Engraved Fillet Knife",
        price: 85.00,
        salePrice: 85.00,
        image: "https://picsum.photos/seed/filletknife/400/500",
        rating: 5.0,
        reviews: 24,
        badge: "Made to Order",
        turnaround: "Hand made 3-4 weeks turn around time"
      }
    ]
  }
};

export default function Collection() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { addToCart } = useCart();
  
  const collection = id ? collectionsData[id as keyof typeof collectionsData] : null;

  // Protect the route - only logged in users can access the collection store
  if (!user) {
    return <Navigate to="/fan-club" replace />;
  }

  if (!collection) {
    return <div className="min-h-screen flex items-center justify-center">Collection not found.</div>;
  }

  const handleQuickAdd = (e: React.MouseEvent, product: typeof collection.products[0]) => {
    e.preventDefault(); // Prevent navigation
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  };

  return (
    <div className="bg-peppa-light min-h-screen py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link to={`/initiative/${id}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-peppa-dark transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Initiative
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-6 h-6 text-peppa-yellow" />
              <span className="text-peppa-dark font-semibold tracking-widest uppercase text-sm">
                Members Only Store
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-peppa-dark mb-4">{collection.title}</h1>
            <p className="text-gray-600 max-w-2xl">{collection.description}</p>
          </div>
          
          {/* Filters/Sort */}
          <div className="flex items-center gap-4 mt-8 md:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-full bg-white text-sm font-medium text-peppa-dark hover:border-peppa-red transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-full bg-white text-sm font-medium text-peppa-dark hover:border-peppa-red transition-colors">
              Sort by: Featured <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {collection.products.map((product) => (
            <Link to={`/collection-item/${product.id}`} key={product.id} className="group block">
              <div className="relative bg-white rounded-2xl overflow-hidden mb-4 aspect-[4/5] border border-black/5">
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-peppa-dark text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.badge}
                  </div>
                )}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                
                {/* Quick Add Button */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button 
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="w-full bg-peppa-yellow text-peppa-dark py-3 rounded-xl font-medium hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(252,210,14,0.3)]"
                  >
                    Quick Add
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col items-start">
                <h3 className="font-serif font-bold text-lg text-peppa-dark group-hover:text-peppa-red transition-colors mb-1">{product.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3 h-3 fill-peppa-yellow text-peppa-yellow" />
                  <span className="text-xs font-medium text-gray-600">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>
                
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between items-center bg-peppa-yellow/10 px-2 py-1 rounded-md border border-peppa-yellow/30">
                    <span className="text-sm font-bold text-peppa-dark flex items-center gap-1">
                      <Crown className="w-3 h-3 text-peppa-yellow" /> Member Price
                    </span>
                    <span className="font-bold text-peppa-green">${product.salePrice.toFixed(2)} USD</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}
