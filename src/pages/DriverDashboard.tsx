import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Truck, MapPin, Package, Camera, CheckCircle2, AlertCircle, Upload, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/utils";

interface DeliveryTask {
  id: string;
  poNumber: string;
  merchantName: string;
  address: string;
  items: string;
  status: 'PENDING' | 'DELIVERED';
  invoiceImage?: string;
}

const MOCK_DELIVERIES: DeliveryTask[] = [
  {
    id: "DEL-001",
    poNumber: "CS-021526",
    merchantName: "Conch Shack",
    address: "Conch Shack Warehouse, Blue Hills",
    items: "4 Cases Peppajoy Original",
    status: 'PENDING'
  },
  {
    id: "DEL-002",
    poNumber: "GB-021626",
    merchantName: "Grace Bay Cafe",
    address: "Grace Bay Road, Providenciales",
    items: "2 Cases Peppajoy Original",
    status: 'PENDING'
  }
];

export default function DriverDashboard() {
  const { user } = useAuth();
  const [deliveries, setDeliveries] = useState<DeliveryTask[]>(MOCK_DELIVERIES);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryTask | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (user?.role !== 'DRIVER') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-peppa-light px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center border border-black/5">
          <Truck className="w-16 h-16 text-peppa-red mx-auto mb-6" />
          <h2 className="text-2xl font-serif font-bold text-peppa-dark mb-4">Driver Access Required</h2>
          <p className="text-gray-600 mb-8">
            This portal is exclusively for Peppajoy delivery personnel.
          </p>
        </div>
      </div>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmDelivery = () => {
    if (!selectedDelivery || !previewImage) return;
    
    setIsUploading(true);
    
    // Simulate upload and confirmation
    setTimeout(() => {
      setDeliveries(prev => prev.map(d => 
        d.id === selectedDelivery.id 
          ? { ...d, status: 'DELIVERED', invoiceImage: previewImage } 
          : d
      ));
      setIsUploading(false);
      setSelectedDelivery(null);
      setPreviewImage(null);
    }, 1500);
  };

  const pendingDeliveries = deliveries.filter(d => d.status === 'PENDING');
  const completedDeliveries = deliveries.filter(d => d.status === 'DELIVERED');

  return (
    <div className="bg-peppa-light min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Truck className="w-6 h-6 text-peppa-green" />
            <span className="text-peppa-green font-bold tracking-widest uppercase text-xs">
              Driver Portal
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-peppa-dark">
            Today's Deliveries
          </h1>
          <p className="text-gray-500 mt-1">Manage your route and upload signed invoices.</p>
        </div>

        <div className="space-y-6">
          {pendingDeliveries.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-black/5 shadow-sm">
              <CheckCircle2 className="w-16 h-16 text-peppa-green mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold text-peppa-dark mb-2">All Caught Up!</h3>
              <p className="text-gray-500">You have no pending deliveries for today.</p>
            </div>
          ) : (
            pendingDeliveries.map(delivery => (
              <motion.div 
                key={delivery.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peppa-yellow/10 text-peppa-yellow text-[10px] font-bold uppercase tracking-wider mb-2">
                          <AlertCircle className="w-3 h-3" /> Pending
                        </span>
                        <h3 className="text-xl font-bold text-peppa-dark">{delivery.merchantName}</h3>
                        <p className="text-sm font-mono text-gray-500">PO: {delivery.poNumber}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 text-gray-600">
                        <MapPin className="w-5 h-5 shrink-0 text-peppa-red mt-0.5" />
                        <div className="flex flex-col items-start gap-1">
                          <span className="text-sm">{delivery.address}</span>
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(delivery.merchantName + ' ' + delivery.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-peppa-red font-medium hover:underline flex items-center gap-1"
                          >
                            Get Directions
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-gray-600">
                        <Package className="w-5 h-5 shrink-0 text-peppa-dark mt-0.5" />
                        <span className="text-sm font-medium">{delivery.items}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-end md:items-center justify-end md:border-l border-black/5 md:pl-6">
                    <button 
                      onClick={() => setSelectedDelivery(delivery)}
                      className="w-full md:w-auto bg-peppa-dark text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-colors flex items-center justify-center gap-2"
                    >
                      <Camera className="w-4 h-4" /> Mark Delivered
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}

          {completedDeliveries.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg font-serif font-bold text-peppa-dark mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-peppa-green" /> Completed Today
              </h3>
              <div className="space-y-4">
                {completedDeliveries.map(delivery => (
                  <div key={delivery.id} className="bg-gray-50 rounded-2xl p-4 border border-black/5 flex items-center justify-between opacity-75">
                    <div>
                      <p className="font-bold text-peppa-dark text-sm">{delivery.merchantName}</p>
                      <p className="text-xs text-gray-500 font-mono">{delivery.poNumber}</p>
                    </div>
                    <span className="text-xs font-bold text-peppa-green uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Delivered
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delivery Confirmation Modal */}
      <AnimatePresence>
        {selectedDelivery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-black/5 flex justify-between items-center bg-gray-50">
                <h3 className="text-xl font-serif font-bold text-peppa-dark">Confirm Delivery</h3>
                <button 
                  onClick={() => {
                    setSelectedDelivery(null);
                    setPreviewImage(null);
                  }}
                  className="p-2 text-gray-400 hover:text-peppa-dark rounded-full hover:bg-black/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Delivering to</p>
                  <p className="font-bold text-peppa-dark text-lg">{selectedDelivery.merchantName}</p>
                  <p className="text-sm text-gray-600">{selectedDelivery.address}</p>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-peppa-dark">Upload Signed Invoice</label>
                  
                  {previewImage ? (
                    <div className="relative rounded-2xl overflow-hidden border-2 border-peppa-green/50 aspect-[3/4] bg-gray-100">
                      <img src={previewImage} alt="Invoice Preview" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setPreviewImage(null)}
                        className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur text-peppa-red rounded-full shadow-sm hover:bg-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-peppa-dark hover:bg-gray-50 transition-all aspect-[3/4] flex flex-col items-center justify-center gap-4"
                    >
                      <div className="w-16 h-16 bg-peppa-light rounded-full flex items-center justify-center text-peppa-dark">
                        <Camera className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-bold text-peppa-dark">Take a Photo</p>
                        <p className="text-xs text-gray-500 mt-1">Capture the signed invoice</p>
                      </div>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment"
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                </div>

                <button 
                  onClick={handleConfirmDelivery}
                  disabled={!previewImage || isUploading}
                  className="w-full bg-peppa-green text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg shadow-peppa-green/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    "Uploading..."
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" /> Confirm Delivery
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
