import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, Clock, Search, Building2, ShieldCheck, UserCheck, Package, Truck, Calendar, MapPin, Image as ImageIcon, X, ArrowUpDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { cn } from "../lib/utils";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { requests, setRequests, orders, setOrders } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'merchants' | 'orders'>('orders');
  
  // Order Management State
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'default' | 'merchantAsc'>('default');

  if (user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-peppa-light px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center border border-black/5">
          <ShieldCheck className="w-16 h-16 text-peppa-red mx-auto mb-6" />
          <h2 className="text-2xl font-serif font-bold text-peppa-dark mb-4">Admin Access Required</h2>
          <p className="text-gray-600 mb-8">
            This portal is exclusively for Peppajoy management.
          </p>
        </div>
      </div>
    );
  }

  const filteredRequests = requests.filter(req => 
    req.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'APPROVED' } : req));
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'REJECTED' } : req));
  };

  // Sorting logic
  let sortedOrders = [...orders];
  if (sortOrder === 'merchantAsc') {
    sortedOrders.sort((a, b) => {
      // First priority: Scheduled orders
      if (a.status === 'SCHEDULED' && b.status !== 'SCHEDULED') return -1;
      if (b.status === 'SCHEDULED' && a.status !== 'SCHEDULED') return 1;
      // Second priority: Alphabetical by merchant name
      return a.merchantName.localeCompare(b.merchantName);
    });
  }

  const filteredOrders = sortedOrders.filter(ord => 
    ord.merchantName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
    ord.poNumber.toLowerCase().includes(orderSearchQuery.toLowerCase())
  );

  const toggleOrderSelection = (id: string) => {
    setSelectedOrders(prev => 
      prev.includes(id) ? prev.filter(orderId => orderId !== id) : [...prev, id]
    );
  };

  const handleScheduleSelected = () => {
    if (!scheduleDate || selectedOrders.length === 0) return;
    
    setOrders(prev => prev.map(ord => 
      selectedOrders.includes(ord.id) 
        ? { ...ord, status: 'SCHEDULED', date: scheduleDate } 
        : ord
    ));
    
    setSelectedOrders([]);
    setIsScheduleModalOpen(false);
    setScheduleDate("");
  };

  return (
    <div className="bg-peppa-light min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-6 h-6 text-peppa-red" />
              <span className="text-peppa-red font-bold tracking-widest uppercase text-xs">
                Management Portal
              </span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-peppa-dark">
              Logistics Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Manage merchant applications and oversee operations.</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-black/5">
            <button 
              onClick={() => setActiveTab('orders')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                activeTab === 'orders' ? "bg-peppa-dark text-white shadow-md" : "text-gray-500 hover:text-peppa-dark"
              )}
            >
              <Package className="w-4 h-4" /> Orders
            </button>
            <button 
              onClick={() => setActiveTab('merchants')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                activeTab === 'merchants' ? "bg-peppa-dark text-white shadow-md" : "text-gray-500 hover:text-peppa-dark"
              )}
            >
              <UserCheck className="w-4 h-4" /> Applications
            </button>
          </div>
        </div>

        {activeTab === 'merchants' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden"
          >
            <div className="p-8 border-b border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-2xl font-serif font-bold text-peppa-dark flex items-center gap-3">
                <Building2 className="w-6 h-6 text-peppa-green" />
                Merchant Applications
              </h2>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search merchants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-peppa-light border border-black/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-peppa-dark"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-black/5">
                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Business</th>
                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Contact</th>
                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Location & Tax</th>
                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-peppa-light/50 transition-colors">
                      <td className="px-8 py-6">
                        <p className="font-bold text-peppa-dark">{req.businessName}</p>
                        <p className="text-xs text-gray-500">{req.businessType}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-medium text-peppa-dark">{req.contactName}</p>
                        <p className="text-xs text-gray-500">{req.email}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm text-gray-600">{req.country}</p>
                        <p className="text-xs text-gray-500 font-mono">Tax ID: {req.taxId}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          req.status === 'APPROVED' ? "bg-peppa-green/10 text-peppa-green" :
                          req.status === 'PENDING' ? "bg-peppa-yellow/10 text-peppa-yellow" :
                          "bg-peppa-red/10 text-peppa-red"
                        )}>
                          {req.status === 'APPROVED' ? <CheckCircle2 className="w-3 h-3" /> :
                           req.status === 'PENDING' ? <Clock className="w-3 h-3" /> :
                           <XCircle className="w-3 h-3" />}
                          {req.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        {req.status === 'PENDING' && (
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleApprove(req.id)}
                              className="p-2 rounded-lg bg-peppa-green/10 text-peppa-green hover:bg-peppa-green hover:text-white transition-colors"
                              title="Approve"
                            >
                              <CheckCircle2 className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleReject(req.id)}
                              className="p-2 rounded-lg bg-peppa-red/10 text-peppa-red hover:bg-peppa-red hover:text-white transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden"
          >
            <div className="p-8 border-b border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-serif font-bold text-peppa-dark flex items-center gap-3">
                  <Package className="w-6 h-6 text-peppa-yellow" />
                  Order Management
                </h2>
                {selectedOrders.length > 0 && (
                  <button 
                    onClick={() => setIsScheduleModalOpen(true)}
                    className="bg-peppa-red text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-red-700 transition-colors"
                  >
                    <Calendar className="w-4 h-4" /> Schedule Selected ({selectedOrders.length})
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setSortOrder(prev => prev === 'default' ? 'merchantAsc' : 'default')}
                  className={cn(
                    "p-2 rounded-xl border transition-colors flex items-center gap-2 text-sm font-medium",
                    sortOrder === 'merchantAsc' ? "bg-peppa-dark text-white border-peppa-dark" : "bg-white text-gray-600 border-black/10 hover:border-peppa-dark"
                  )}
                  title="Sort by Merchant (Scheduled First)"
                >
                  <ArrowUpDown className="w-4 h-4" /> Sort
                </button>
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search orders or PO..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="w-full bg-peppa-light border border-black/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-peppa-dark"
                  />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-black/5">
                    <th className="px-6 py-4 w-12"></th>
                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Order Details</th>
                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Merchant & Location</th>
                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Items</th>
                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className={cn(
                      "transition-colors",
                      selectedOrders.includes(ord.id) ? "bg-peppa-yellow/5" : "hover:bg-peppa-light/50"
                    )}>
                      <td className="px-6 py-6">
                        {ord.status === 'PENDING' && (
                          <input 
                            type="checkbox" 
                            checked={selectedOrders.includes(ord.id)}
                            onChange={() => toggleOrderSelection(ord.id)}
                            className="w-4 h-4 rounded border-gray-300 text-peppa-red focus:ring-peppa-red"
                          />
                        )}
                      </td>
                      <td className="px-4 py-6">
                        <p className="font-bold text-peppa-dark">{ord.poNumber}</p>
                        <p className="text-xs text-gray-500">
                          {ord.status === 'SCHEDULED' || ord.status === 'DELIVERED' ? (
                            <span className="text-peppa-dark font-medium">Scheduled: {new Date(ord.date).toLocaleDateString()}</span>
                          ) : (
                            <span>Created: {new Date(ord.date).toLocaleDateString()}</span>
                          )}
                        </p>
                      </td>
                      <td className="px-4 py-6">
                        <p className="text-sm font-bold text-peppa-dark">{ord.merchantName}</p>
                        <div className="flex items-start gap-1 mt-1 text-gray-500">
                          <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                          <p className="text-xs leading-tight">{ord.address}</p>
                        </div>
                      </td>
                      <td className="px-4 py-6">
                        <p className="text-sm text-gray-600">{ord.items}</p>
                      </td>
                      <td className="px-4 py-6">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          ord.status === 'DELIVERED' ? "bg-peppa-green/10 text-peppa-green" :
                          ord.status === 'SCHEDULED' ? "bg-blue-100 text-blue-600" :
                          "bg-peppa-yellow/10 text-peppa-yellow"
                        )}>
                          {ord.status === 'DELIVERED' ? <CheckCircle2 className="w-3 h-3" /> :
                           ord.status === 'SCHEDULED' ? <Truck className="w-3 h-3" /> :
                           <Clock className="w-3 h-3" />}
                          {ord.status}
                        </span>
                      </td>
                      <td className="px-4 py-6 text-right">
                        {ord.status === 'DELIVERED' && ord.invoiceImage && (
                          <button 
                            onClick={() => setReceiptImage(ord.invoiceImage!)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-peppa-dark hover:bg-gray-200 transition-colors text-xs font-bold"
                          >
                            <ImageIcon className="w-4 h-4" /> Receipt
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>

      {/* Schedule Modal */}
      <AnimatePresence>
        {isScheduleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
            >
              <div className="p-6 border-b border-black/5 flex justify-between items-center bg-gray-50">
                <h3 className="text-xl font-serif font-bold text-peppa-dark">Schedule Delivery</h3>
                <button 
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-peppa-dark rounded-full hover:bg-black/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-600">
                  Select a delivery date for the {selectedOrders.length} selected order(s).
                </p>
                <div>
                  <label className="block text-sm font-bold text-peppa-dark mb-2">Delivery Date</label>
                  <input 
                    type="date" 
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full bg-peppa-light border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-peppa-dark"
                  />
                </div>
                <button 
                  onClick={handleScheduleSelected}
                  disabled={!scheduleDate}
                  className="w-full bg-peppa-green text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  Confirm Schedule
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Receipt Modal */}
        {receiptImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setReceiptImage(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-2xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setReceiptImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-peppa-yellow transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img src={receiptImage} alt="Delivery Receipt" className="w-full rounded-2xl shadow-2xl" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
