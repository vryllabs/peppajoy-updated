import { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Truck, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PartnerLogin() {
  const [activeTab, setActiveTab] = useState<'admin' | 'driver'>('admin');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email !== "demo@demo.com" || password !== "12345") {
      setError("Invalid credentials. Use demo@demo.com / 12345");
      return;
    }
    
    if (activeTab === 'admin') {
      login({ 
        isWholesale: false, 
        role: 'ADMIN', 
        name: "Peppajoy Admin",
        email: email,
        memberSince: new Date().toISOString(),
        membership: {
          status: 'active',
          tier: 'admin',
          nextBilling: ''
        }
      });
      navigate("/admin-dashboard");
    } else {
      login({ 
        isWholesale: false, 
        role: 'DRIVER', 
        name: "Delivery Driver",
        email: email,
        memberSince: new Date().toISOString(),
        membership: {
          status: 'active',
          tier: 'driver',
          nextBilling: ''
        }
      });
      navigate("/driver-dashboard");
    }
  };

  return (
    <div className="bg-peppa-light min-h-screen py-24 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-peppa-dark mb-4">Partner Portal</h1>
          <p className="text-gray-600">Authorized personnel only.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden">
          <div className="flex p-2 bg-gray-50 border-b border-black/5">
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'admin' 
                  ? 'bg-white text-peppa-dark shadow-sm border border-black/5' 
                  : 'text-gray-500 hover:text-peppa-dark'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Supply
            </button>
            <button
              onClick={() => setActiveTab('driver')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'driver' 
                  ? 'bg-white text-peppa-dark shadow-sm border border-black/5' 
                  : 'text-gray-500 hover:text-peppa-dark'
              }`}
            >
              <Truck className="w-4 h-4" /> Delivery
            </button>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-peppa-red/10 border border-peppa-red/20 rounded-xl text-peppa-red text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-peppa-dark mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-peppa-dark transition-colors"
                  placeholder={activeTab === 'admin' ? "demo@demo.com" : "demo@demo.com"}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-peppa-dark mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              <p className="text-xs text-gray-500">
                Unauthorized access is prohibited. All activities are monitored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
