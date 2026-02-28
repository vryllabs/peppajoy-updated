import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Star, Minus, Plus, ShoppingCart, ArrowLeft, ShieldCheck, Heart, Clock } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const collectionProducts = {
  "vet-pen": {
    id: "vet-pen",
    name: "Engraved Tactical Pen",
    price: 10.99,
    description: "A beautifully crafted, made-to-order pen shaped like a bullet. A symbol of strength and service, perfect for everyday use or as a commemorative piece.",
    image: "https://i.ibb.co/Q7V6csdK/image.png",
    rating: 5.0,
    reviews: 42,
    badge: "Made to Order",
    turnaround: "Hand made 3-4 weeks turn around time",
    initiative: "Peppajoy Pure Peace",
    initiativeId: "veterans"
  },
  "reel-knife": {
    id: "reel-knife",
    name: "Engraved Fillet Knife",
    price: 85.00,
    description: "A professional-grade, custom-engraved fillet knife. Essential for any island kitchen and built to last a lifetime.",
    image: "https://picsum.photos/seed/filletknife/800/1000",
    rating: 5.0,
    reviews: 24,
    badge: "Made to Order",
    turnaround: "Hand made 3-4 weeks turn around time",
    initiative: "Peppajoy's Reel Relief",
    initiativeId: "reel-relief"
  }
};

export default function CollectionProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  
  const product = id ? collectionProducts[id as keyof typeof collectionProducts] : null;

  if (!user) {
    navigate("/fan-club");
    return null;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image
    });
  };

  return (
    <div className="bg-peppa-light min-h-screen py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to={`/collection/${product.initiativeId}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-peppa-dark transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-white rounded-3xl overflow-hidden border border-black/5 shadow-2xl sticky top-24">
              {product.badge && (
                <div className="absolute top-6 left-6 z-10 bg-peppa-dark text-white text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                  {product.badge}
                </div>
              )}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-peppa-red/10 text-peppa-red px-3 py-1 rounded-full text-sm font-bold mb-4">
                <Heart className="w-4 h-4 fill-current" /> 100% Proceeds to {product.initiative}
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-peppa-dark mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-peppa-yellow text-peppa-yellow" />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-600">{product.rating} ({product.reviews} reviews)</span>
              </div>

              <div className="text-3xl font-bold text-peppa-dark mb-6">
                ${product.price.toFixed(2)} <span className="text-lg text-gray-500 font-normal">USD</span>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>

              {product.turnaround && (
                <div className="bg-peppa-yellow/10 border border-peppa-yellow/30 rounded-2xl p-6 mb-8 flex items-start gap-4">
                  <Clock className="w-6 h-6 text-peppa-yellow shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-peppa-dark mb-1">Made to Order</h4>
                    <p className="text-gray-600 text-sm">{product.turnaround}. We appreciate your patience as we craft this item specifically for you.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart Section - One Time Purchase Only */}
            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-6">
                <span className="font-medium text-peppa-dark">Quantity</span>
                <div className="flex items-center gap-4 bg-peppa-light rounded-full px-2 py-1 border border-black/5">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full bg-peppa-dark text-white py-4 rounded-full font-medium text-lg hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-xl shadow-black/10"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheck className="w-5 h-5 text-peppa-green" /> Secure Checkout
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Heart className="w-5 h-5 text-peppa-red" /> Supports the Cause
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
