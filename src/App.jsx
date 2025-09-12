import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import Signup from "./Signup";

import Cart from "./Cart";
import Orders from "./Orders";
import Aboutus from "./About";
import Contactus from "./Contactus";
import Drinks from "./Drinks";
import Sweets from "./Sweets";
import { useSelector } from "react-redux";
import Login from "./Login";

// ===== Layout Component (Header + Footer wrapper) =====
function Layout({ children }) {
  let cartItems = useSelector((state) => state.cart) || [];
  let cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-layout">
      {/* ===== Header / Navbar ===== */}
      <header className="header">
        <div className="logo">🍴 Foodie's Paradise</div>
        <nav className="nav-links">
          <Link to="/">🏠 Home</Link>
          <Link to="/veg">🥦 Veg</Link>
          <Link to="/nonveg">🍗 Non-Veg</Link>
          <Link to="/drink">🥤 Drinks</Link>
          <Link to="/sweets">🍨 Sweets</Link>
          <Link to="/signup">✍ Signup</Link>
          <Link to="/login">✍Login</Link>
          <Link to="/cart">🛒 Cart {cartCount > 0 && `(${cartCount})`}</Link>
          <Link to="/orders">📦 Orders</Link>
          <Link to="/aboutus">ℹ About Us</Link>
          <Link to="/contactus">📞 Contact Us</Link>
        </nav>
      </header>

      {/* ===== Page Content ===== */}
      <main className="content">{children}</main>
{/* 
      ===== Footer ===== */}
      {/* <footer className="footer">
        <p>© 2025 Foodie's Paradise | Made with ❤️</p>
      </footer> */}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<Nonveg />} />
          <Route path="/drink" element={<Drinks />} />
          <Route path="/sweets" element={<Sweets />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<Contactus />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
