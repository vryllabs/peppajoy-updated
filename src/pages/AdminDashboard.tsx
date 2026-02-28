import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, XCircle, Clock, Search, Building2, ShieldCheck, UserCheck, Package } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/utils";

interface MerchantRequest {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

const MOCK_REQUESTS: MerchantRequest[] = [
  {
    id: "REQ-001",
    businessName: "Grace Bay Cafe",
    contactName: "Sarah Smith",
    email: "sarah@gracebaycafe.com",
    date: "2026-02-25",
    status: 'PENDING'
  },
  {
    id: "REQ-002",
    businessName: "Island Resorts Ltd",
    contactName: "Michael Johnson",
    email: "purchasing@islandresorts.com",
    date: "2026-02-24",
    status: 'APPROVED'
  },
  {
    id: "REQ-003",
    businessName: "Local Market",
    contactName: "David Brown",
    email: "david@localmarket.tc",
    date: "2026-02-20",
    status: 'REJECTED'
  }
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<MerchantRequest[]>(MOCK_REQUESTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'merchants' | 'orders'>('merchants');

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
              Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Manage merchant applications and oversee operations.</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-black/5">
            <button 
              onClick={() => setActiveTab('merchants')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                activeTab === 'merchants' ? "bg-peppa-dark text-white shadow-md" : "text-gray-500 hover:text-peppa-dark"
              )}
            >
              <UserCheck className="w-4 h-4" /> Merchants
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                activeTab === 'orders' ? "bg-peppa-dark text-white shadow-md" : "text-gray-500 hover:text-peppa-dark"
              )}
            >
              <Package className="w-4 h-4" /> Orders
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
                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Date Applied</th>
                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-peppa-light/50 transition-colors">
                      <td className="px-8 py-6">
                        <p className="font-bold text-peppa-dark">{req.businessName}</p>
                        <p className="text-xs text-gray-500">{req.id}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-medium text-peppa-dark">{req.contactName}</p>
                        <p className="text-xs text-gray-500">{req.email}</p>
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-600">
                        {new Date(req.date).toLocaleDateString()}
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
            className="bg-white rounded-3xl shadow-xl border border-black/5 p-8 text-center"
          >
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-peppa-dark mb-2">Order Management</h2>
            <p className="text-gray-500">Order management interface coming soon.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
