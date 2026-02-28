import { useState } from "react";
import { motion } from "motion/react";
import { User, Building2, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [activeTab, setActiveTab] = useState<'customer' | 'merchant'>('customer');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (activeTab === 'merchant') {
      if (email !== "demo@demo.com" || password !== "12345") {
        setError("Invalid credentials. Use demo@demo.com / 12345");
        return;
      }
      login({ 
        isWholesale: true, 
        role: 'MERCHANT', 
        merchantStatus: 'APPROVED', 
        name: "Conch Shack",
        email: email,
        memberSince: new Date().toISOString(),
        membership: {
          status: 'active',
          tier: 'merchant',
          nextBilling: ''
        }
      });
      navigate("/merchant-portal");
    } else {
      login({ 
        isWholesale: false, 
        role: 'CUSTOMER', 
        name: "John Doe",
        email: email || "john@example.com",
        memberSince: new Date().toISOString(),
        membership: {
          status: 'active',
          tier: 'fan-club',
          nextBilling: ''
        }
      });
      navigate("/profile");
    }
  };

  return (
    <div className="bg-peppa-light min-h-screen py-24 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-peppa-dark mb-4">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your Peppajoy account.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden">
          <div className="flex p-2 bg-gray-50 border-b border-black/5">
            <button
              onClick={() => setActiveTab('customer')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'customer' 
                  ? 'bg-white text-peppa-dark shadow-sm border border-black/5' 
                  : 'text-gray-500 hover:text-peppa-dark'
              }`}
            >
              <User className="w-4 h-4" /> Fan Club
            </button>
            <button
              onClick={() => setActiveTab('merchant')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'merchant' 
                  ? 'bg-white text-peppa-dark shadow-sm border border-black/5' 
                  : 'text-gray-500 hover:text-peppa-dark'
              }`}
            >
              <Building2 className="w-4 h-4" /> Merchant
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
                  placeholder={activeTab === 'merchant' ? "demo@demo.com" : "you@example.com"}
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
                <div className="flex justify-end mt-2">
                  <a href="#" className="text-xs text-peppa-red hover:underline font-medium">Forgot password?</a>
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
                {activeTab === 'merchant' ? "Don't have a wholesale account? " : "Not in the Fan Club yet? "}
                <a href={activeTab === 'merchant' ? "/wholesale" : "/fan-club"} className="text-peppa-red font-bold hover:underline">
                  {activeTab === 'merchant' ? "Apply Now" : "Join Now"}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
