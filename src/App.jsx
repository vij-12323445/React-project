import React, { useState } from "react";
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

function Layout({ children }) {
  let cartItems = useSelector((state) => state.cart) || [];
  let cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* ===== Header / Navbar ===== */}
      <header className="header">
        {/* Logo Section */}
        <div className="logo">
          <img src="Image/logo.jpg" alt="Logo" className="logo-img" />
          <h1 className="logo-text">❀ 𝒻𝑜𝑜𝒹𝒾𝑒’𝓈 𝓅𝒶𝓇𝒶𝒹𝒾𝓈𝑒 ❀
</h1>
        </div>

        {/* Hamburger for mobile */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation */}
        <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>🏠Home</Link>
          <Link to="/veg" onClick={() => setMenuOpen(false)}>🥦Veg</Link>
          <Link to="/non-veg" onClick={() => setMenuOpen(false)}>🍗Non-Veg</Link>
          <Link to="/drink" onClick={() => setMenuOpen(false)}>🥤Drinks</Link>
          <Link to="/sweets" onClick={() => setMenuOpen(false)}>🍨Sweets</Link>
          <Link to="/signup" onClick={() => setMenuOpen(false)}>📝Signup</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>🔑Login</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="cart-link">
           🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <Link to="/orders" onClick={() => setMenuOpen(false)}>📦Orders</Link>
          <Link to="/aboutus" onClick={() => setMenuOpen(false)}>ℹ️About</Link>
          <Link to="/contactus" onClick={() => setMenuOpen(false)}>📞Contact</Link>
        </nav>
      </header>

      {/* ===== Page Content ===== */}
      <main className="content">{children}</main>
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
          <Route path="/non-veg" element={<Nonveg />} />
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
