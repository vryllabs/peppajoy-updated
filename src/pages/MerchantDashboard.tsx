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
  ChevronRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/utils";

interface WholesaleOrder {
  id: string;
  poNumber: string;
  date: string;
  items: { name: string; cases: number }[];
  totalCases: number;
  status: 'pending' | 'approved' | 'shipped' | 'delivered';
  orderedBy: string;
  deliveryLocation: string;
}

const MOCK_ORDERS: WholesaleOrder[] = [
  {
    id: "1",
    poNumber: "CS-021526",
    date: "2026-02-15",
    items: [{ name: "Peppajoy Original (Case of 12)", cases: 4 }],
    totalCases: 4,
    status: 'delivered',
    orderedBy: "John Manager",
    deliveryLocation: "Conch Shack Warehouse, Blue Hills"
  },
  {
    id: "2",
    poNumber: "CS-022026",
    date: "2026-02-20",
    items: [{ name: "Peppajoy Original (Case of 12)", cases: 2 }],
    totalCases: 2,
    status: 'approved',
    orderedBy: "Sarah Smith",
    deliveryLocation: "Conch Shack Restaurant, Grace Bay"
  }
];

export default function MerchantDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'new-order' | 'history'>('new-order');
  const [cases, setCases] = useState(1);
  const [poOption, setPoOption] = useState<'auto' | 'manual'>('auto');
  const [manualPo, setManualPo] = useState("");
  const [orderedBy, setOrderedBy] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
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

  const shippingFee = cases >= 4 ? 0 : 25;
  const isFreeShipping = cases >= 4;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setActiveTab('history');
        // Reset form
        setCases(1);
        setManualPo("");
        setOrderedBy("");
      }, 3000);
    }, 1500);
  };

  if (!user?.isWholesale) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-peppa-light px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center border border-black/5">
          <AlertCircle className="w-16 h-16 text-peppa-red mx-auto mb-6" />
          <h2 className="text-2xl font-serif font-bold text-peppa-dark mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-8">
            This portal is exclusively for approved wholesale merchants.
          </p>
          <a href="/wholesale" className="inline-block bg-peppa-red text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors">
            Apply for Wholesale Account
          </a>
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
                      <div className="p-8 border-b border-black/5">
                        <h2 className="text-2xl font-serif font-bold text-peppa-dark mb-6 flex items-center gap-3">
                          <Package className="w-6 h-6 text-peppa-red" />
                          Order Details
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Product Selection */}
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-bold text-peppa-dark mb-3">Select Product</label>
                              <div className="p-4 rounded-2xl border-2 border-peppa-red bg-peppa-red/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <img 
                                    src="https://i.ibb.co/5X4rfMSP/vryl-output-1770048402023.jpg" 
                                    alt="Peppajoy Original" 
                                    className="w-12 h-12 rounded-lg object-cover"
                                  />
                                  <div>
                                    <p className="font-bold text-peppa-dark">Peppajoy Original</p>
                                    <p className="text-xs text-gray-500">Case of 12 Bottles</p>
                                  </div>
                                </div>
                                <span className="font-bold text-peppa-red">$120.00 / case</span>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-bold text-peppa-dark mb-3">Quantity (Cases)</label>
                              <div className="flex items-center gap-6">
                                <div className="flex items-center bg-peppa-light rounded-2xl p-1 border border-black/5">
                                  <button 
                                    type="button"
                                    onClick={() => setCases(Math.max(1, cases - 1))}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white transition-all"
                                  >
                                    <Plus className="w-4 h-4 rotate-45" />
                                  </button>
                                  <span className="w-12 text-center font-bold text-lg">{cases}</span>
                                  <button 
                                    type="button"
                                    onClick={() => setCases(cases + 1)}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white transition-all"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                                <div className="flex-1">
                                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div 
                                      className="h-full bg-peppa-green"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${Math.min(100, (cases / 4) * 100)}%` }}
                                    />
                                  </div>
                                  <p className="text-[10px] mt-2 font-bold uppercase tracking-wider text-gray-500">
                                    {isFreeShipping ? "✓ Free Delivery Unlocked" : `Add ${4 - cases} more cases for free delivery`}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Order Info */}
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-bold text-peppa-dark mb-3">Purchase Order (PO) Number</label>
                              <div className="grid grid-cols-2 gap-2 mb-3">
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

                            <div>
                              <label className="block text-sm font-bold text-peppa-dark mb-3">Ordered By (Name)</label>
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
                          </div>
                        </div>
                      </div>

                      <div className="p-8 bg-gray-50">
                        <h3 className="text-lg font-serif font-bold text-peppa-dark mb-6 flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-peppa-green" />
                          Delivery Location
                        </h3>
                        <div className="grid grid-cols-1 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-peppa-dark mb-3">Delivery Address / Instructions</label>
                            <textarea 
                              placeholder="e.g. Main Restaurant Entrance or Warehouse Storage B"
                              value={deliveryLocation}
                              onChange={(e) => setDeliveryLocation(e.target.value)}
                              className="w-full bg-white border border-black/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-peppa-dark min-h-[100px]"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-8 bg-white border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex gap-8">
                          <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Subtotal</p>
                            <p className="text-xl font-bold text-peppa-dark">${(cases * 120).toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Delivery Fee</p>
                            <p className={cn("text-xl font-bold", isFreeShipping ? "text-peppa-green" : "text-peppa-dark")}>
                              {isFreeShipping ? "FREE" : `$${shippingFee.toFixed(2)}`}
                            </p>
                          </div>
                          <div className="border-l border-black/10 pl-8">
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Total Inquiry Value</p>
                            <p className="text-2xl font-black text-peppa-red">${(cases * 120 + shippingFee).toFixed(2)}</p>
                          </div>
                        </div>
                        
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full md:w-auto bg-peppa-red text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-peppa-red/20 flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>Sending Inquiry...</>
                          ) : (
                            <>Submit Order Request <ArrowRight className="w-5 h-5" /></>
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
                        {MOCK_ORDERS.map((order) => (
                          <tr key={order.id} className="hover:bg-peppa-light/50 transition-colors group">
                            <td className="px-8 py-6">
                              <span className="font-mono font-bold text-peppa-dark">{order.poNumber}</span>
                            </td>
                            <td className="px-8 py-6 text-sm text-gray-600">
                              {new Date(order.date).toLocaleDateString()}
                            </td>
                            <td className="px-8 py-6">
                              <p className="text-sm font-bold text-peppa-dark">{order.items[0].name}</p>
                              <p className="text-xs text-gray-500">{order.totalCases} Cases</p>
                            </td>
                            <td className="px-8 py-6">
                              <span className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                order.status === 'delivered' ? "bg-peppa-green/10 text-peppa-green" :
                                order.status === 'approved' ? "bg-peppa-yellow/10 text-peppa-yellow" :
                                "bg-gray-100 text-gray-500"
                              )}>
                                {order.status === 'delivered' ? <CheckCircle2 className="w-3 h-3" /> :
                                 order.status === 'approved' ? <Clock className="w-3 h-3" /> :
                                 <AlertCircle className="w-3 h-3" />}
                                {order.status}
                              </span>
                            </td>
                            <td className="px-8 py-6 font-bold text-peppa-dark">
                              ${(order.totalCases * 120).toFixed(2)}
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
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400 text-sm">Account Type</span>
                  <span className="text-peppa-yellow font-bold text-xs uppercase tracking-widest">Approved Wholesaler</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400 text-sm">Location</span>
                  <span className="font-bold">Global</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400 text-sm">Pricing Tier</span>
                  <span className="font-bold">Tier 1 (Local B2B)</span>
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
                  <p className="text-sm text-gray-600">Payment due upon delivery via Check or Bank Transfer.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-peppa-green/10 flex items-center justify-center text-peppa-green shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <p className="text-sm text-gray-600">All orders are subject to manual approval by Peppajoy Admin.</p>
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
