import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  Package, 
  Truck, 
  History, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowRight,
  User,
  MapPin,
  ClipboardList,
  ChevronRight,
  Lock
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { cn } from "../lib/utils";

const PRODUCTS = [
  { id: 'p1', name: 'Peppajoy Regular', desc: '12/5oz Bottles', price: 75, image: 'https://i.ibb.co/FL51THW9/image.jpg' },
  { id: 'p2', name: 'Peppajoy Ghost', desc: '12/5oz Bottles', price: 90, image: 'https://i.ibb.co/Z6RJHPpy/image.jpg' },
  { id: 'p3', name: 'Peppajoy Lemon Mild', desc: '12/5oz Bottles', price: 75, image: 'https://i.ibb.co/nMDxtLh6/image.jpg' },
  { id: 'p4', name: 'Peppajoy Jerk Seasoning', desc: '12 Count', price: 102, image: 'https://i.ibb.co/7NyDJ1Lm/image.jpg' },
  { id: 'p5', name: 'Peppajoy Regular Gallons', desc: '4/128oz Gallons', price: 296, image: 'https://i.ibb.co/3ykkg9y1/image.jpg' },
];

export default function MerchantDashboard() {
  const { user, login } = useAuth();
  const { orders, setOrders } = useData();
  const [activeTab, setActiveTab] = useState<'new-order' | 'history'>('new-order');
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");

  const handleMerchantLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (loginEmail !== "demo@demo.com" || loginPassword !== "12345") {
      setError("Invalid credentials. Use demo@demo.com / 12345");
      return;
    }
    
    login({ 
      isWholesale: true, 
      role: 'MERCHANT', 
      merchantStatus: 'APPROVED', 
      name: "Conch Shack",
      email: loginEmail,
      memberSince: new Date().toISOString(),
      membership: {
        status: 'active',
        tier: 'merchant',
        nextBilling: ''
      }
    });
  };

  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});
  const [poOption, setPoOption] = useState<'auto' | 'manual'>('auto');
  const [manualPo, setManualPo] = useState("");
  const [orderedBy, setOrderedBy] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Business initials for PO generation
  const businessInitials = useMemo(() => {
    if (!user?.name) return "PJ";
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }, [user]);

  // Current date for PO generation
  const dateSequence = useMemo(() => {
    const now = new Date();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const y = String(now.getFullYear()).substring(2);
    return `${m}${d}${y}`;
  }, []);

  const generatedPo = `${businessInitials}-${dateSequence}`;

  const totalCases = Object.values(productQuantities).reduce((sum, q) => sum + q, 0);
  const subtotal = Object.entries(productQuantities).reduce((sum, [id, q]) => {
    const product = PRODUCTS.find(p => p.id === id);
    return sum + (product ? product.price * q : 0);
  }, 0);
  const shippingFee = totalCases >= 4 || totalCases === 0 ? 0 : 25;
  const isFreeShipping = totalCases >= 4;
  const total = subtotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalCases === 0) {
      alert("Please select at least one product.");
      return;
    }
    setIsSubmitting(true);
    
    const itemsList = Object.entries(productQuantities)
      .filter(([_, q]) => q > 0)
      .map(([id, q]) => {
        const product = PRODUCTS.find(p => p.id === id);
        return `${q} Cases ${product?.name}`;
      })
      .join(', ');

    const newOrder = {
      id: `ORD-${Math.random().toString(36).substr(2, 9)}`,
      poNumber: poOption === 'auto' ? generatedPo : manualPo,
      merchantName: user?.name || "Unknown Merchant",
      contactName: orderedBy,
      address: deliveryLocation,
      notes: notes,
      items: itemsList,
      date: new Date().toISOString(),
      status: 'PENDING' as const
    };

    // Simulate API call
    setTimeout(() => {
      setOrders(prev => [newOrder, ...prev]);
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setActiveTab('history');
        // Reset form
        setProductQuantities({});
        setManualPo("");
        setOrderedBy("");
        setDeliveryLocation("");
        setNotes("");
      }, 3000);
    }, 1500);
  };

  const merchantOrders = orders.filter(ord => ord.merchantName === user?.name);

  if (!user?.isWholesale) {
    if (!user) {
      // Show login form directly if not logged in
      return (
        <div className="min-h-screen flex items-center justify-center bg-peppa-light px-4">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-black/5">
            <div className="text-center mb-8">
              <Building2 className="w-12 h-12 text-peppa-dark mx-auto mb-4" />
              <h2 className="text-2xl font-serif font-bold text-peppa-dark mb-2">Merchant Login</h2>
              <p className="text-gray-600 text-sm">Sign in to access the wholesale portal.</p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-peppa-red/10 border border-peppa-red/20 rounded-xl text-peppa-red text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            
            <form onSubmit={handleMerchantLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-peppa-dark mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-peppa-dark transition-colors"
                  placeholder="demo@demo.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-peppa-dark mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="password" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-black/10 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-peppa-dark transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-peppa-dark text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-2"
              >
                Sign In <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have a wholesale account?{' '}
                <a href="/wholesale" className="text-peppa-red font-bold hover:underline">
                  Apply Now
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-peppa-light px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center border border-black/5">
          <AlertCircle className="w-16 h-16 text-peppa-red mx-auto mb-6" />
          <h2 className="text-2xl font-serif font-bold text-peppa-dark mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-8">
            This portal is exclusively for approved wholesale merchants.
          </p>
          <div className="flex flex-col gap-4">
            <a href="/login" className="inline-block bg-peppa-dark text-white px-8 py-3 rounded-full font-medium hover:bg-black transition-colors">
              Login as Merchant
            </a>
            <a href="/wholesale" className="inline-block bg-peppa-red text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors">
              Apply for Wholesale Account
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-peppa-light min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-6 h-6 text-peppa-green" />
              <span className="text-peppa-green font-bold tracking-widest uppercase text-xs">
                Merchant Portal
              </span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-peppa-dark">
              Welcome, {user.name}
            </h1>
            <p className="text-gray-500 mt-1">Manage your local wholesale orders and delivery inquiries.</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-black/5">
            <button 
              onClick={() => setActiveTab('new-order')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                activeTab === 'new-order' ? "bg-peppa-dark text-white shadow-md" : "text-gray-500 hover:text-peppa-dark"
              )}
            >
              <Plus className="w-4 h-4" /> New Order
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                activeTab === 'history' ? "bg-peppa-dark text-white shadow-md" : "text-gray-500 hover:text-peppa-dark"
              )}
            >
              <History className="w-4 h-4" /> Order History
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'new-order' ? (
                <motion.div
                  key="new-order"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden"
                >
                  {showSuccess ? (
                    <div className="p-20 text-center">
                      <div className="w-20 h-20 bg-peppa-green/10 rounded-full flex items-center justify-center text-peppa-green mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h2 className="text-3xl font-serif font-bold text-peppa-dark mb-4">Inquiry Sent Successfully</h2>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Your wholesale order request has been sent to our team for approval. You will receive an email confirmation shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitOrder}>
                      <div className="p-6 sm:p-8 border-b border-black/5 space-y-6">
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-peppa-dark flex items-center gap-3">
                          <ClipboardList className="w-6 h-6 text-peppa-red" />
                          Order Details
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* PO Number */}
                          <div>
                            <label className="block text-sm font-bold text-peppa-dark mb-2">Purchase Order (PO) Number</label>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                              <button 
                                type="button"
                                onClick={() => setPoOption('auto')}
                                className={cn(
                                  "py-2 rounded-xl text-xs font-bold border-2 transition-all",
                                  poOption === 'auto' ? "border-peppa-dark bg-peppa-dark text-white" : "border-black/5 bg-white text-gray-500"
                                )}
                              >
                                Auto-Generate
                              </button>
                              <button 
                                type="button"
                                onClick={() => setPoOption('manual')}
                                className={cn(
                                  "py-2 rounded-xl text-xs font-bold border-2 transition-all",
                                  poOption === 'manual' ? "border-peppa-dark bg-peppa-dark text-white" : "border-black/5 bg-white text-gray-500"
                                )}
                              >
                                Enter Manual
                              </button>
                            </div>
                            {poOption === 'auto' ? (
                              <div className="p-3 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-center font-mono font-bold text-gray-600">
                                {generatedPo}
                              </div>
                            ) : (
                              <input 
                                type="text" 
                                placeholder="e.g. PO-9988"
                                value={manualPo}
                                onChange={(e) => setManualPo(e.target.value)}
                                className="w-full bg-peppa-light border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-peppa-dark font-mono"
                                required
                              />
                            )}
                          </div>

                          {/* Ordered By */}
                          <div>
                            <label className="block text-sm font-bold text-peppa-dark mb-2">Ordered By (Name)</label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input 
                                type="text" 
                                placeholder="Full Name"
                                value={orderedBy}
                                onChange={(e) => setOrderedBy(e.target.value)}
                                className="w-full bg-peppa-light border border-black/10 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-peppa-dark"
                                required
                              />
                            </div>
                          </div>

                          {/* Delivery Location */}
                          <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-peppa-dark mb-2">Delivery Location (Turks & Caicos)</label>
                            <div className="relative">
                              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input 
                                type="text" 
                                placeholder="Start typing address or location name..."
                                value={deliveryLocation}
                                onChange={(e) => setDeliveryLocation(e.target.value)}
                                className="w-full bg-peppa-light border border-black/10 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-peppa-dark"
                                required
                                list="locations"
                              />
                              <datalist id="locations">
                                <option value="Seven Stars Resort & Spa, Grace Bay, Providenciales" />
                                <option value="The Ritz-Carlton, Grace Bay, Providenciales" />
                                <option value="Beaches Turks & Caicos, Lower Bight Road, Providenciales" />
                                <option value="Amanyara, Northwest Point, Providenciales" />
                                <option value="Wymara Resort and Villas, Lower Bight Road, Providenciales" />
                                <option value="Graceway IGA, Leeward Highway, Providenciales" />
                                <option value="Graceway Gourmet, Grace Bay Road, Providenciales" />
                                <option value="Ocean Club Resort, Grace Bay, Providenciales" />
                                <option value="Club Med Turkoise, Grace Bay, Providenciales" />
                                <option value="The Shore Club, Long Bay Beach, Providenciales" />
                              </datalist>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 ml-1">Auto-complete enabled for Providenciales and surrounding areas.</p>
                          </div>

                          {/* Notes */}
                          <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-peppa-dark mb-2">Additional Notes (Optional)</label>
                            <textarea 
                              placeholder="Delivery instructions, special requests, etc."
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              className="w-full bg-peppa-light border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-peppa-dark min-h-[80px]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Products Section */}
                      <div className="p-6 sm:p-8 border-b border-black/5 bg-gray-50">
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-peppa-dark mb-6 flex items-center gap-3">
                          <Package className="w-6 h-6 text-peppa-red" />
                          Select Products
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-3 sm:gap-4">
                          {PRODUCTS.map(product => {
                            const quantity = productQuantities[product.id] || 0;
                            return (
                              <div 
                                key={product.id}
                                className={cn(
                                  "p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white",
                                  quantity > 0 
                                    ? "border-peppa-red shadow-sm" 
                                    : "border-black/5"
                                )}
                              >
                                <div className="flex items-center gap-4 flex-1">
                                  <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-black/5"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-bold text-peppa-dark text-sm sm:text-base leading-tight mb-1">{product.name}</p>
                                    <p className="text-xs sm:text-sm text-gray-500">{product.desc} <span className="mx-1">•</span> <span className="font-bold text-peppa-red">${product.price.toFixed(2)}</span></p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-black/5">
                                  <span className="text-sm font-bold text-peppa-dark sm:hidden">Quantity:</span>
                                  <div className="flex items-center bg-peppa-light rounded-xl p-1 border border-black/10">
                                    <button 
                                      type="button"
                                      onClick={() => setProductQuantities(prev => ({ ...prev, [product.id]: Math.max(0, quantity - 1) }))}
                                      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-all text-peppa-dark shadow-sm"
                                    >
                                      <Plus className="w-4 h-4 rotate-45" />
                                    </button>
                                    <span className="w-10 text-center font-bold text-base">{quantity}</span>
                                    <button 
                                      type="button"
                                      onClick={() => setProductQuantities(prev => ({ ...prev, [product.id]: quantity + 1 }))}
                                      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-all text-peppa-dark shadow-sm"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-8 bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm sm:text-base font-bold text-peppa-dark">Total Cases: {totalCases}</label>
                          </div>
                          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-peppa-green"
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(100, (totalCases / 4) * 100)}%` }}
                            />
                          </div>
                          <p className="text-xs mt-3 font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                            {isFreeShipping ? (
                              <><CheckCircle2 className="w-4 h-4 text-peppa-green" /> <span className="text-peppa-green">Free Delivery Unlocked</span></>
                            ) : (
                              `Add ${Math.max(0, 4 - totalCases)} more cases for free delivery`
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6 bg-white border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex gap-4 sm:gap-8 w-full md:w-auto justify-between md:justify-start">
                          <div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-0.5">Subtotal</p>
                            <p className="text-lg font-bold text-peppa-dark">${subtotal.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-0.5">Delivery Fee</p>
                            <p className={cn("text-lg font-bold", isFreeShipping ? "text-peppa-green" : "text-peppa-dark")}>
                              {isFreeShipping ? "FREE" : `$${shippingFee.toFixed(2)}`}
                            </p>
                          </div>
                          <div className="border-l border-black/10 pl-4 sm:pl-8">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-0.5">Total</p>
                            <p className="text-xl font-black text-peppa-red">${total.toFixed(2)}</p>
                          </div>
                        </div>
                        
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full md:w-auto bg-peppa-red text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-peppa-red/20 flex items-center justify-center gap-2 disabled:opacity-50 mt-2 md:mt-0"
                        >
                          {isSubmitting ? (
                            <>Sending...</>
                          ) : (
                            <>Submit Order <ArrowRight className="w-4 h-4" /></>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden"
                >
                  <div className="p-8 border-b border-black/5 flex justify-between items-center">
                    <h2 className="text-2xl font-serif font-bold text-peppa-dark flex items-center gap-3">
                      <ClipboardList className="w-6 h-6 text-peppa-green" />
                      Order History
                    </h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 border-b border-black/5">
                          <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">PO Number</th>
                          <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Date</th>
                          <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Items</th>
                          <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                          <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Total</th>
                          <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5">
                        {merchantOrders.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-8 py-12 text-center text-gray-500">
                              No orders found.
                            </td>
                          </tr>
                        ) : merchantOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-peppa-light/50 transition-colors group">
                            <td className="px-8 py-6">
                              <span className="font-mono font-bold text-peppa-dark">{order.poNumber}</span>
                            </td>
                            <td className="px-8 py-6 text-sm text-gray-600">
                              {new Date(order.date).toLocaleDateString()}
                            </td>
                            <td className="px-8 py-6">
                              <p className="text-sm font-bold text-peppa-dark">{order.items}</p>
                            </td>
                            <td className="px-8 py-6">
                              <span className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                order.status === 'DELIVERED' ? "bg-peppa-green/10 text-peppa-green" :
                                order.status === 'SCHEDULED' ? "bg-blue-100 text-blue-600" :
                                "bg-peppa-yellow/10 text-peppa-yellow"
                              )}>
                                {order.status === 'DELIVERED' ? <CheckCircle2 className="w-3 h-3" /> :
                                 order.status === 'SCHEDULED' ? <Truck className="w-3 h-3" /> :
                                 <Clock className="w-3 h-3" />}
                                {order.status}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-gray-400 hover:text-peppa-dark transition-all">
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-8">
            {/* Merchant Profile Card */}
            <div className="bg-peppa-dark text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <h3 className="text-xl font-serif font-bold mb-6 relative z-10">Merchant Profile</h3>
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400 text-sm">Business Name</span>
                  <span className="font-bold">{user.name}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400 text-sm">Account Type</span>
                  <span className="text-peppa-yellow font-bold text-xs uppercase tracking-widest">Approved Wholesaler</span>
                </div>
              </div>
            </div>

            {/* Wholesale Terms Card */}
            <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-peppa-dark mb-4">Wholesale Terms</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-peppa-green/10 flex items-center justify-center text-peppa-green shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <p className="text-sm text-gray-600">Free delivery on 4+ cases within Providenciales. Standard shipping rates apply elsewhere.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-peppa-green/10 flex items-center justify-center text-peppa-green shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <p className="text-sm text-gray-600">All orders are subject to manual approval by Peppajoy.</p>
                </li>
              </ul>
            </div>

            {/* Support Card */}
            <div className="bg-peppa-yellow/10 rounded-3xl p-8 border border-peppa-yellow/20">
              <h3 className="text-lg font-serif font-bold text-peppa-dark mb-2">Need Assistance?</h3>
              <p className="text-sm text-gray-600 mb-6">Your dedicated account manager is here to help with large volume orders or special requests.</p>
              <button className="w-full bg-white text-peppa-dark py-3 rounded-xl font-bold text-sm hover:bg-peppa-dark hover:text-white transition-all border border-peppa-yellow/50">
                Contact Account Manager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
