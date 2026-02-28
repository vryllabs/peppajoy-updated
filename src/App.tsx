/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import About from "./pages/About";
import FanClub from "./pages/FanClub";
import Donation from "./pages/Donation";
import Wholesale from "./pages/Wholesale";
import Initiative from "./pages/Initiative";
import Collection from "./pages/Collection";
import CollectionProduct from "./pages/CollectionProduct";
import Profile from "./pages/Profile";
import MerchantDashboard from "./pages/MerchantDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import Login from "./pages/Login";
import PartnerLogin from "./pages/PartnerLogin";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="about" element={<About />} />
              <Route path="fan-club" element={<FanClub />} />
              <Route path="donate" element={<Donation />} />
              <Route path="initiative/:id" element={<Initiative />} />
              <Route path="collection/:id" element={<Collection />} />
              <Route path="collection-item/:id" element={<CollectionProduct />} />
              <Route path="wholesale" element={<Wholesale />} />
              <Route path="merchant-portal" element={<MerchantDashboard />} />
              <Route path="admin-dashboard" element={<AdminDashboard />} />
              <Route path="driver-dashboard" element={<DriverDashboard />} />
              <Route path="login" element={<Login />} />
              <Route path="partner-login" element={<PartnerLogin />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
