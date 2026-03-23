import { Link, Outlet } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartDrawer from "./CartDrawer";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSpreadJoyOpen, setIsSpreadJoyOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Announcement Bar */}
      <div className="bg-peppa-red text-white text-[10px] sm:text-xs font-medium py-2 px-4 text-center tracking-widest uppercase">
        Free shipping on orders over $50 | Join our Fan Club
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -ml-2 text-peppa-dark hover:text-peppa-red transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
              <Link to="/" className="flex items-center">
                <img 
                  src="https://i.ibb.co/7JvkmggH/Peppa-Joy-logo-page-001-1.jpg" 
                  alt="Peppajoy Logo" 
                  className="h-10 w-auto rounded-md" 
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-sm font-medium text-peppa-dark hover:text-peppa-red transition-colors">Home</Link>
              <Link to="/shop" className="text-sm font-medium text-peppa-dark hover:text-peppa-red transition-colors">Shop</Link>
              <Link to="/recipes" className="text-sm font-medium text-peppa-dark hover:text-peppa-red transition-colors">Recipes</Link>
              <Link to="/about" className="text-sm font-medium text-peppa-dark hover:text-peppa-red transition-colors">About Us</Link>
              <Link to="/fan-club" className="text-sm font-medium text-peppa-dark hover:text-peppa-red transition-colors">Fan Club</Link>
              <Link to="/wholesale" className="text-sm font-medium text-peppa-dark hover:text-peppa-red transition-colors">Wholesale</Link>
              
              {/* Spread The Joy Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsSpreadJoyOpen(true)}
                onMouseLeave={() => setIsSpreadJoyOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-peppa-dark hover:text-peppa-red transition-colors py-2">
                  Spread The Joy <ChevronDown className="w-4 h-4" />
                </button>
                
                {isSpreadJoyOpen && (
                  <div className="absolute top-full left-0 w-56 bg-white shadow-xl border border-black/5 rounded-xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <Link to="/donate" className="block px-4 py-2 text-sm text-peppa-dark hover:bg-peppa-light hover:text-peppa-red transition-colors">
                      Our Foundation
                    </Link>
                    <Link to="/initiative/veterans" className="block px-4 py-2 text-sm text-peppa-dark hover:bg-peppa-light hover:text-peppa-red transition-colors">
                      Pure Peace
                    </Link>
                    <Link to="/initiative/reel-relief" className="block px-4 py-2 text-sm text-peppa-dark hover:bg-peppa-light hover:text-peppa-red transition-colors">
                      Reel Relief
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              <Link to={user ? "/profile" : "/login"} className="text-peppa-dark hover:text-peppa-red transition-colors">
                <User className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="text-peppa-dark hover:text-peppa-red transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-peppa-yellow text-peppa-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn("lg:hidden", isMobileMenuOpen ? "block" : "hidden")}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b border-black/5 shadow-lg">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-peppa-dark hover:text-peppa-red hover:bg-peppa-light rounded-md">Home</Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-peppa-dark hover:text-peppa-red hover:bg-peppa-light rounded-md">Shop</Link>
            <Link to="/recipes" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-peppa-dark hover:text-peppa-red hover:bg-peppa-light rounded-md">Recipes</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-peppa-dark hover:text-peppa-red hover:bg-peppa-light rounded-md">About Us</Link>
            <Link to="/fan-club" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-peppa-dark hover:text-peppa-red hover:bg-peppa-light rounded-md">Fan Club</Link>
            <Link to="/wholesale" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-peppa-dark hover:text-peppa-red hover:bg-peppa-light rounded-md">Wholesale</Link>
            
            <div className="px-3 py-2">
              <div className="text-base font-medium text-peppa-dark mb-2">Spread The Joy</div>
              <div className="pl-4 space-y-2 border-l-2 border-peppa-light">
                <Link to="/donate" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm text-gray-600 hover:text-peppa-red">Our Foundation</Link>
                <Link to="/initiative/veterans" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm text-gray-600 hover:text-peppa-red">Pure Peace</Link>
                <Link to="/initiative/reel-relief" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm text-gray-600 hover:text-peppa-red">Reel Relief</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#2E5A1C] text-white pt-16 pb-8 border-t-4 border-peppa-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            <div className="md:col-span-4">
              <img 
                src="https://i.ibb.co/7JvkmggH/Peppa-Joy-logo-page-001-1.jpg" 
                alt="Peppajoy Logo" 
                className="h-16 w-auto mb-6 rounded-lg" 
              />
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Authentic gourmet hot sauce from the beautiful Turks and Caicos Islands. Taste the island heat.
              </p>
              <div className="flex space-x-4">
                {/* Social Icons Placeholders */}
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-peppa-red transition-colors cursor-pointer">
                  <span className="text-xs">IG</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-peppa-red transition-colors cursor-pointer">
                  <span className="text-xs">FB</span>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="font-serif text-lg font-semibold mb-4 text-white">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/product/1" className="hover:text-peppa-yellow transition-colors">The Sauce</Link></li>
                <li><Link to="/shop" className="hover:text-peppa-yellow transition-colors">Bundles</Link></li>
                <li><Link to="/shop" className="hover:text-peppa-yellow transition-colors">Gift Sets</Link></li>
                <li><Link to="/fan-club" className="hover:text-peppa-yellow transition-colors">Subscriptions</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-serif text-lg font-semibold mb-4 text-white">Explore</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/recipes" className="hover:text-peppa-yellow transition-colors">Recipes</Link></li>
                <li><Link to="/fan-club" className="hover:text-peppa-yellow transition-colors">Fan Club</Link></li>
                <li><Link to="/about" className="hover:text-peppa-yellow transition-colors">Our Story</Link></li>
                <li><Link to="/donate" className="hover:text-peppa-yellow transition-colors">Donations</Link></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h4 className="font-serif text-lg font-semibold mb-4 text-white">Join The Heat</h4>
              <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for exclusive offers, recipes, and island updates.</p>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg flex-grow focus:outline-none focus:border-peppa-yellow text-sm"
                />
                <button 
                  type="button"
                  className="bg-peppa-red hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Peppajoy. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {/* Payment Methods Placeholders */}
              <div className="h-6 w-10 bg-white/10 rounded"></div>
              <div className="h-6 w-10 bg-white/10 rounded"></div>
              <div className="h-6 w-10 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
