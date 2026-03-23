import { motion } from "motion/react";
import { User, Package, Crown, ArrowRight, Star, Settings, LogOut, Briefcase, MapPin, Mail, Lock, Handshake, Utensils, Instagram, Camera, Check } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import ManageSubscriptionModal from "../components/ManageSubscriptionModal";

type Tab = "dashboard" | "orders" | "vip-shop" | "recipes" | "settings";

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isManageSubscriptionOpen, setIsManageSubscriptionOpen] = useState(false);
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmissionInput, setShowSubmissionInput] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["dashboard", "orders", "vip-shop", "recipes", "settings"].includes(tab)) {
      setActiveTab(tab as Tab);
    }
  }, [searchParams]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const simulateMerchant = () => {
    updateUser({ isWholesale: true, role: 'MERCHANT', merchantStatus: 'APPROVED', name: "Conch Shack" });
  };

  const simulateAdmin = () => {
    updateUser({ isWholesale: false, role: 'ADMIN', name: "Peppajoy Admin" });
  };

  const simulateDriver = () => {
    updateUser({ isWholesale: false, role: 'DRIVER', name: "Delivery Driver" });
  };

  if (!user) {
    return (
      <div className="bg-peppa-light min-h-screen py-24 flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-gray-400 mb-6 shadow-sm">
          <User className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-peppa-dark mb-4">You are not logged in</h1>
        <p className="text-gray-600 max-w-md mb-8">
          Join the Peppajoy Fan Club to access your exclusive dashboard, manage your subscription, and view your orders.
        </p>
        <Link 
          to="/fan-club" 
          className="bg-peppa-yellow text-peppa-dark px-8 py-4 rounded-xl font-medium hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(252,210,14,0.3)]"
        >
          Join the Fan Club
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-peppa-light min-h-screen py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-peppa-dark mb-4">My Account</h1>
          <p className="text-gray-600">Welcome back, {user.name.split(' ')[0]}.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "dashboard" ? "bg-white text-peppa-dark shadow-sm border border-black/5" : "text-gray-600 hover:bg-white hover:text-peppa-dark"}`}
            >
              <User className="w-5 h-5" /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "orders" ? "bg-white text-peppa-dark shadow-sm border border-black/5" : "text-gray-600 hover:bg-white hover:text-peppa-dark"}`}
            >
              <Package className="w-5 h-5" /> Orders
            </button>
            <Link 
              to="/donate"
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-white hover:text-peppa-dark rounded-xl font-medium transition-colors"
            >
              <Handshake className="w-5 h-5" /> Spread The Joy
            </Link>
            <button 
              onClick={() => setActiveTab("vip-shop")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "vip-shop" ? "bg-white text-peppa-dark shadow-sm border border-black/5" : "text-gray-600 hover:bg-white hover:text-peppa-dark"}`}
            >
              <Crown className="w-5 h-5" /> VIP Shop
            </button>
            <button 
              onClick={() => setActiveTab("recipes")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "recipes" ? "bg-white text-peppa-dark shadow-sm border border-black/5" : "text-gray-600 hover:bg-white hover:text-peppa-dark"}`}
            >
              <Utensils className="w-5 h-5" /> Recipes & Community
            </button>
            <button 
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "settings" ? "bg-white text-peppa-dark shadow-sm border border-black/5" : "text-gray-600 hover:bg-white hover:text-peppa-dark"}`}
            >
              <Settings className="w-5 h-5" /> Settings
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-white hover:text-peppa-red rounded-xl font-medium transition-colors mt-8"
            >
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-8">
            
            {activeTab === "dashboard" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                {/* Membership Card */}
                <div className="bg-peppa-dark rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-peppa-yellow/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
                        <Star className="w-4 h-4 text-peppa-yellow" /> Fan Club Member
                      </div>
                      <h2 className="text-3xl font-serif font-bold mb-2">{user.membership.tier.toUpperCase()} MEMBER</h2>
                      <p className="text-gray-300">Your next box ships on {user.membership.nextBilling}</p>
                    </div>
                    
                    <div className="flex flex-col gap-3 min-w-[200px]">
                      <button 
                        onClick={() => setIsManageSubscriptionOpen(true)}
                        className="bg-peppa-yellow text-peppa-dark px-6 py-3 rounded-xl font-medium text-center hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(252,210,14,0.3)] flex items-center justify-center gap-2"
                      >
                        <Crown className="w-5 h-5" /> Upgrade Tier
                      </button>
                      <button 
                        onClick={() => setIsManageSubscriptionOpen(true)}
                        className="px-6 py-3 rounded-xl font-medium text-center border border-white/20 hover:bg-white/5 transition-colors"
                      >
                        Manage Subscription
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Recent Orders Preview */}
                  <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-serif font-bold text-peppa-dark">Recent Orders</h3>
                      <button onClick={() => setActiveTab("orders")} className="text-sm text-peppa-red font-medium hover:underline">View All</button>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 pb-6 border-b border-black/5">
                        <div className="w-16 h-16 bg-peppa-light rounded-xl overflow-hidden shrink-0 border border-black/5">
                          <img src="https://i.ibb.co/V0yQxwZh/Screenshot-2026-02-26-1-08-09-PM.png" alt="Order" className="w-full h-full object-cover mix-blend-multiply" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-peppa-dark">Order #PJ-8472</p>
                          <p className="text-sm text-gray-500">Oct 12, 2023 • Delivered</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-peppa-dark">$56.99</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Wholesale / Partner Card */}
                  <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-peppa-red/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-full bg-peppa-red/10 flex items-center justify-center text-peppa-red mb-6">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-peppa-dark mb-2">
                        {user.isWholesale ? "Wholesale Portal" : "Partner with Us"}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-8">
                        {user.isWholesale 
                          ? "Access your exclusive B2B pricing, bulk order forms, and dedicated account resources."
                          : "Are you a retailer or restaurant? Apply for a wholesale account to get exclusive pricing and bulk ordering."}
                      </p>
                    </div>
                    
                    <Link 
                      to={user.isWholesale ? "/merchant-portal" : "/wholesale"} 
                      className="relative z-10 w-full py-3 rounded-xl border border-peppa-dark text-peppa-dark font-medium hover:bg-peppa-dark hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      {user.isWholesale ? "Access Portal" : "Apply for Wholesale"} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                <h2 className="text-2xl font-serif font-bold text-peppa-dark mb-8">Order History</h2>
                
                <div className="space-y-6">
                  {/* Order Item 1 */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 border border-black/5 rounded-2xl hover:border-peppa-red/30 transition-colors">
                    <div className="w-20 h-20 bg-peppa-light rounded-xl overflow-hidden shrink-0 border border-black/5">
                      <img src="https://i.ibb.co/V0yQxwZh/Screenshot-2026-02-26-1-08-09-PM.png" alt="Order" className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-peppa-dark text-lg">Order #PJ-8472</p>
                        <span className="px-3 py-1 bg-peppa-green/10 text-peppa-green text-xs font-bold rounded-full uppercase tracking-wider">Delivered</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Placed on October 12, 2023</p>
                      <p className="text-sm text-gray-600">1x Peppajoy Regular 5oz 4 pack</p>
                    </div>
                    <div className="flex flex-col items-end justify-between gap-4">
                      <p className="font-bold text-peppa-dark text-xl">$56.99</p>
                      <button className="text-sm font-medium text-peppa-red hover:underline">Track Package</button>
                    </div>
                  </div>

                  {/* Order Item 2 */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 border border-black/5 rounded-2xl hover:border-peppa-red/30 transition-colors">
                    <div className="w-20 h-20 bg-peppa-light rounded-xl overflow-hidden shrink-0 border border-black/5">
                      <img src="https://i.ibb.co/V0yQxwZh/Screenshot-2026-02-26-1-08-09-PM.png" alt="Order" className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-peppa-dark text-lg">Order #PJ-8391</p>
                        <span className="px-3 py-1 bg-peppa-green/10 text-peppa-green text-xs font-bold rounded-full uppercase tracking-wider">Delivered</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Placed on September 12, 2023</p>
                      <p className="text-sm text-gray-600">1x Peppajoy Regular 5oz 4 pack</p>
                    </div>
                    <div className="flex flex-col items-end justify-between gap-4">
                      <p className="font-bold text-peppa-dark text-xl">$56.99</p>
                      <button className="text-sm font-medium text-peppa-red hover:underline">Buy Again</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "vip-shop" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                  <h2 className="text-2xl font-serif font-bold text-peppa-dark mb-4 flex items-center gap-2">
                    <Crown className="w-6 h-6 text-peppa-yellow" /> VIP Shop
                  </h2>
                  {user.membership.tier === 'Premium' ? (
                    <div>
                      <p className="text-gray-600 mb-8">Welcome to the exclusive VIP Shop. Here you can find limited edition items available only to Premium members.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-black/5 rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                          <img src="https://i.ibb.co/Mkj4xzgp/Screenshot-2026-02-28-12-41-47-PM.png" alt="Limited Edition Hat" className="w-full aspect-square object-cover rounded-xl mb-4" />
                          <h3 className="font-bold text-peppa-dark">Peppajoy Hat Limited Edition</h3>
                          <p className="text-sm text-gray-500 mb-4">Exclusive VIP merchandise.</p>
                          <button className="w-full bg-peppa-dark text-white py-2 rounded-xl font-medium hover:bg-black transition-colors">Buy Now - $33</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-peppa-yellow/20 rounded-full flex items-center justify-center text-peppa-yellow mx-auto mb-4">
                        <Lock className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-peppa-dark mb-2">Premium Members Only</h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">Upgrade your subscription to the Premium tier to access exclusive limited edition hot sauces and reserve batches.</p>
                      <button onClick={() => setIsManageSubscriptionOpen(true)} className="inline-block bg-peppa-yellow text-peppa-dark px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(252,210,14,0.3)]">
                        Upgrade Subscription
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "recipes" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-serif font-bold text-peppa-dark flex items-center gap-2">
                      <Utensils className="w-6 h-6 text-peppa-red" /> Recipes & Community
                    </h2>
                    <Link to="/recipes" className="text-sm text-peppa-red font-bold hover:underline">Browse All Recipes</Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Featured Recipe for User */}
                    <div className="bg-peppa-light rounded-2xl p-6 border border-black/5">
                      <h3 className="text-xs font-mono font-black uppercase tracking-widest text-peppa-red mb-4">Recommended For You</h3>
                      <div className="aspect-video rounded-xl overflow-hidden mb-4">
                        <img src="https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=400" alt="Wings" className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-serif font-bold text-lg mb-2">Signature Peppajoy Wings</h4>
                      <p className="text-sm text-gray-600 mb-4">A classic island favorite. Perfect for your next gathering.</p>
                      <Link to="/recipe/peppajoy-wings" className="inline-flex items-center gap-2 text-peppa-red font-bold text-sm hover:gap-3 transition-all">
                        View Recipe <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Community Challenge */}
                    <div className="bg-peppa-dark text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Instagram className="w-20 h-20" />
                      </div>
                      <h3 className="text-xs font-mono font-black uppercase tracking-widest text-peppa-yellow mb-4">Monthly Challenge</h3>
                      <h4 className="font-serif font-bold text-xl mb-4">The #PeppajoyTwist Challenge</h4>
                      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                        Remake any official recipe with your own unique twist. Post it on Instagram, tag <span className="text-peppa-yellow font-bold">@peppajoy</span> and use <span className="text-peppa-yellow font-bold">#peppajoyfanclub</span>.
                      </p>
                      <div className="bg-white/10 rounded-xl p-4 mb-6">
                        <p className="text-xs font-bold text-peppa-yellow uppercase tracking-widest mb-1">The Reward</p>
                        <p className="text-sm">A curated Peppajoy Mystery Box + A spotlight feature on our global social pages.</p>
                      </div>
                      
                      {!showSubmissionInput ? (
                        <button 
                          onClick={() => setShowSubmissionInput(true)}
                          className="w-full bg-peppa-yellow text-peppa-dark py-3 rounded-xl font-bold text-sm hover:bg-yellow-400 transition-all flex items-center justify-center gap-2"
                        >
                          <Camera className="w-4 h-4" /> Submit My Entry
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <input 
                            type="url" 
                            placeholder="Paste Instagram URL here..." 
                            value={submissionUrl}
                            onChange={(e) => setSubmissionUrl(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-peppa-yellow/50 transition-all"
                          />
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                if (submissionUrl) {
                                  setIsSubmitting(true);
                                  setTimeout(() => {
                                    setIsSubmitting(false);
                                    setShowSubmissionInput(false);
                                    setSubmissionUrl("");
                                    setSubmissionSuccess(true);
                                    // Reset success message after 5 seconds
                                    setTimeout(() => setSubmissionSuccess(false), 5000);
                                  }, 1500);
                                }
                              }}
                              disabled={isSubmitting}
                              className="flex-1 bg-peppa-yellow text-peppa-dark py-2 rounded-xl font-bold text-xs hover:bg-yellow-400 transition-all disabled:opacity-50"
                            >
                              {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                            <button 
                              onClick={() => setShowSubmissionInput(false)}
                              className="px-4 py-2 rounded-xl border border-white/20 text-xs font-bold hover:bg-white/5 transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {submissionSuccess && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 p-3 bg-peppa-green/20 border border-peppa-green/30 rounded-xl text-center"
                        >
                          <p className="text-xs font-bold text-peppa-green">🎉 Submission received! We'll review it soon.</p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* My Submissions Preview */}
                <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                  <h3 className="text-xl font-serif font-bold text-peppa-dark mb-6">Community Submissions</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Mock Submissions */}
                    <div className="aspect-square rounded-2xl overflow-hidden relative group border border-black/5">
                      <img src="https://images.unsplash.com/photo-1562601579-599dec554e8d?auto=format&fit=crop&q=80&w=300" alt="Submission" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                        <p className="text-[10px] text-white font-bold">@chef_island</p>
                        <div className="flex gap-1">
                          <Star className="w-2 h-2 text-peppa-yellow fill-peppa-yellow" />
                          <Star className="w-2 h-2 text-peppa-yellow fill-peppa-yellow" />
                          <Star className="w-2 h-2 text-peppa-yellow fill-peppa-yellow" />
                        </div>
                      </div>
                    </div>
                    <div className="aspect-square rounded-2xl overflow-hidden relative group border border-black/5">
                      <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=300" alt="Submission" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                        <p className="text-[10px] text-white font-bold">@spicy_tales</p>
                        <div className="flex gap-1">
                          <Star className="w-2 h-2 text-peppa-yellow fill-peppa-yellow" />
                          <Star className="w-2 h-2 text-peppa-yellow fill-peppa-yellow" />
                        </div>
                      </div>
                    </div>
                    <div className="aspect-square rounded-2xl overflow-hidden relative group border border-black/5">
                      <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300" alt="Submission" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                        <p className="text-[10px] text-white font-bold">@healthy_peppa</p>
                        <div className="flex gap-1">
                          <Star className="w-2 h-2 text-peppa-yellow fill-peppa-yellow" />
                        </div>
                      </div>
                    </div>

                    {/* User's recent submission placeholder if success */}
                    {submissionSuccess && (
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="aspect-square rounded-2xl bg-peppa-light border-2 border-dashed border-peppa-green/30 flex flex-col items-center justify-center p-4 text-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-peppa-green/10 flex items-center justify-center text-peppa-green mb-2">
                          <Check className="w-4 h-4" />
                        </div>
                        <p className="text-[10px] font-bold text-peppa-dark uppercase tracking-tighter">Pending Review</p>
                        <p className="text-[8px] text-gray-400 mt-1">Your submission is being processed</p>
                      </motion.div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between">
                    <p className="text-xs text-gray-500">Showing 3 of 128 community creations</p>
                    <a 
                      href="https://www.instagram.com/explore/tags/peppajoyfanclub/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-peppa-red hover:underline"
                    >
                      View Community Gallery
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                
                {/* Profile Details */}
                <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                  <h2 className="text-2xl font-serif font-bold text-peppa-dark mb-6">Account Settings</h2>
                  <form className="space-y-6 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" defaultValue={user.name} className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /> Email Address</label>
                        <input type="email" defaultValue={user.email} className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 transition-all" />
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-black/5">
                      <h3 className="text-lg font-serif font-bold text-peppa-dark mb-4 flex items-center gap-2"><Lock className="w-5 h-5 text-gray-400" /> Change Password</h3>
                      <div className="space-y-4">
                        <input type="password" placeholder="Current Password" className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 transition-all" />
                        <input type="password" placeholder="New Password" className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 transition-all" />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button type="button" className="bg-peppa-dark text-white px-6 py-3 rounded-xl font-medium hover:bg-black transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-serif font-bold text-peppa-dark flex items-center gap-2"><MapPin className="w-6 h-6 text-gray-400" /> Shipping Address</h2>
                  </div>
                  <form className="space-y-6 max-w-2xl">
                    <div className="space-y-4">
                      <input type="text" placeholder="Street Address" defaultValue="123 Island Way" className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 transition-all" />
                      <input type="text" placeholder="Apt, Suite, etc. (optional)" defaultValue="Apt 4B" className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 transition-all" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="City" defaultValue="Miami" className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 transition-all" />
                        <input type="text" placeholder="State/Province" defaultValue="FL" className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="ZIP / Postal Code" defaultValue="33101" className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 transition-all" />
                        <input type="text" placeholder="Country" defaultValue="United States" className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-peppa-red/50 transition-all" />
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <button type="button" className="bg-peppa-dark text-white px-6 py-3 rounded-xl font-medium hover:bg-black transition-colors">
                        Update Address
                      </button>
                    </div>
                  </form>
                </div>

              </motion.div>
            )}

          </div>
        </div>
      </div>
      <ManageSubscriptionModal 
        isOpen={isManageSubscriptionOpen} 
        onClose={() => setIsManageSubscriptionOpen(false)} 
      />
    </div>
  );
}
