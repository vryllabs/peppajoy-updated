import { createContext, useContext, useState, ReactNode } from 'react';

export interface MerchantRequest {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  businessType: string;
  country: string;
  taxId: string;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface Order {
  id: string;
  poNumber: string;
  merchantName: string;
  contactName: string;
  address: string;
  items: string;
  date: string;
  status: 'PENDING' | 'SCHEDULED' | 'DELIVERED';
  invoiceImage?: string;
  deliveredAt?: string;
}

interface DataContextType {
  requests: MerchantRequest[];
  setRequests: React.Dispatch<React.SetStateAction<MerchantRequest[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const MOCK_REQUESTS: MerchantRequest[] = [
  {
    id: "REQ-001",
    businessName: "Grace Bay Cafe",
    contactName: "Sarah Smith",
    email: "sarah@gracebaycafe.com",
    businessType: "Restaurant / Cafe",
    country: "Turks and Caicos Islands",
    taxId: "TC-123456",
    date: "2026-02-25",
    status: 'PENDING'
  },
  {
    id: "REQ-002",
    businessName: "Island Resorts Ltd",
    contactName: "Michael Johnson",
    email: "purchasing@islandresorts.com",
    businessType: "Distributor",
    country: "Turks and Caicos Islands",
    taxId: "TC-987654",
    date: "2026-02-24",
    status: 'APPROVED'
  },
  {
    id: "REQ-003",
    businessName: "Local Market",
    contactName: "David Brown",
    email: "david@localmarket.tc",
    businessType: "Retail Store",
    country: "Turks and Caicos Islands",
    taxId: "TC-555555",
    date: "2026-02-20",
    status: 'REJECTED'
  }
];

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    poNumber: "CS-021526",
    merchantName: "Conch Shack",
    contactName: "John Doe",
    address: "Conch Shack Warehouse, Blue Hills",
    items: "4 Cases Peppajoy Original",
    date: "2026-02-26",
    status: 'PENDING'
  },
  {
    id: "ORD-002",
    poNumber: "GB-021626",
    merchantName: "Grace Bay Cafe",
    contactName: "Sarah Smith",
    address: "Grace Bay Road, Providenciales",
    items: "2 Cases Peppajoy Original",
    date: "2026-02-27",
    status: 'SCHEDULED'
  },
  {
    id: "ORD-003",
    poNumber: "IR-021726",
    merchantName: "Island Resorts Ltd",
    contactName: "Michael Johnson",
    address: "Resort Row, Grace Bay",
    items: "10 Cases Peppajoy Original",
    date: "2026-02-25",
    status: 'DELIVERED',
    invoiceImage: "https://i.ibb.co/V0yQxwZh/Screenshot-2026-02-26-1-08-09-PM.png"
  }
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<MerchantRequest[]>(MOCK_REQUESTS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  return (
    <DataContext.Provider value={{ requests, setRequests, orders, setOrders }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
