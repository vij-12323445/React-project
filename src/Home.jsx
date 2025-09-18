// src/Home.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Home.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; // ✅ social icons

function Home() {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    // Bootstrap carousel init
    const carouselEl = document.getElementById("foodCarousel");
    if (carouselEl && bootstrap && typeof bootstrap.Carousel === "function") {
      try {
        new bootstrap.Carousel(carouselEl, {
          interval: 3000,
          ride: "carousel",
          pause: false,
          wrap: true,
        });
      } catch (err) {
        console.warn("Carousel init failed:", err);
      }
    }

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const handleSearch = () => {
    const q = query.trim().toLowerCase();
    if (!q) {
      alert("⚠️ Please enter something to search!");
      return;
    }

    if (
      q.includes("chicken") ||
      q.includes("mutton") ||
      q.includes("fish") ||
      q.includes("prawns") ||
      q.includes("non-veg") ||
      q.includes("nonveg")
    ) {
      navigate("/non-veg");
    } else if (
      q.includes("veg") ||
      q.includes("paneer") ||
      q.includes("vegetarian")
    ) {
      navigate("/veg");
    } else if (
      q.includes("drink") ||
      q.includes("drinks") ||
      q.includes("beverage") ||
      q.includes("shake") ||
      q.includes("juice")
    ) {
      navigate("/drink");
    } else if (
      q.includes("sweet") ||
      q.includes("sweets") ||
      q.includes("dessert") ||
      q.includes("jamun") ||
      q.includes("cake") ||
      q.includes("burfi")
    ) {
      navigate("/sweets");
    } else {
      alert("❌ No matching category found!");
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero d-flex align-items-center justify-content-center text-center">
        <div className="overlay"></div>
        <div className="hero-content animate__animated animate__fadeInDown">
          <h1 className="display-4 fw-bold text-white">🍴 Savor Every Bite!</h1>
          <p className="lead text-white mb-4">
            Order from top restaurants & enjoy freshly made meals delivered to
            you.
          </p>

          {/* Search Bar */}
          <div className="search-bar d-flex justify-content-center flex-wrap my-3">
            <input
              type="text"
              placeholder="Search dishes, categories..."
              className="form-control w-50 rounded-start mb-2 mb-md-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className="btn btn-danger rounded-end ms-2"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="marquee">
        <marquee behavior="scroll" direction="left">
          🚀 Free delivery on orders above ₹500! | 🔥 Hot deals daily! | 🍕 Try
          our new pizza range!
        </marquee>
      </div>

      {/* Carousel Section */}
      <section className="carousel-section container my-5">
        <div id="foodCarousel" className="carousel slide shadow-lg rounded">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="Image/banner1.png"
                className="d-block w-100 rounded"
                alt="Banner 1"
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5>🔥 Hot Deals Daily</h5>
                <p>Get your favorite meals at amazing discounts</p>
                <p className="offer-timer">Offer Ends In: {formatTime(timeLeft)}</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="Image/banner2.png"
                className="d-block w-100 rounded"
                alt="Banner 2"
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5>🍕 Freshly Cooked</h5>
                <p>Prepared with love by expert chefs</p>
                <p className="offer-timer">Offer Ends In: {formatTime(timeLeft)}</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="Image/banner.png"
                className="d-block w-100 rounded"
                alt="Banner 3"
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5>🚚 Fast Delivery</h5>
                <p>Hot meals delivered to your doorstep</p>
                <p className="offer-timer">Offer Ends In: {formatTime(timeLeft)}</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="Image/banner3.png"
                className="d-block w-100 rounded"
                alt="Banner 4"
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5>🍝 Chef's Special</h5>
                <p>Exclusive recipes from top chefs</p>
                <p className="offer-timer">Offer Ends In: {formatTime(timeLeft)}</p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#foodCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#foodCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container my-5">
        <h2 className="text-center mb-4">🍽 Explore Categories</h2>
        <div className="row g-4">
          <div className="col-md-3">
            <Link
              to="/veg"
              className="card category-card shadow-sm text-decoration-none"
            >
              <img src="Image/paneer.png" className="card-img-top" alt="Veg" />
              <div className="card-body text-center">
                <h5>🥦 Vegetarian</h5>
                <p>Fresh and healthy vegetarian options</p>
              </div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link
              to="/non-veg"
              className="card category-card shadow-sm text-decoration-none"
            >
              <img
                src="Image/chicken.png"
                className="card-img-top"
                alt="Non-Veg"
              />
              <div className="card-body text-center">
                <h5>🍗 Non-Veg</h5>
                <p>Delicious meat dishes cooked</p>
              </div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link
              to="/drink"
              className="card category-card shadow-sm text-decoration-none"
            >
              <img
                src="Image/hazelnut.png"
                className="card-img-top"
                alt="Drinks"
              />
              <div className="card-body text-center">
                <h5>🥤 Drinks</h5>
                <p>Refreshing drinks and mocktails</p>
              </div>
            </Link>
          </div>
          <div className="col-md-3">
            <Link
              to="/sweets"
              className="card category-card shadow-sm text-decoration-none"
            >
              <img
                src="Image/khajuburfi.png"
                className="card-img-top"
                alt="Desserts"
              />
              <div className="card-body text-center">
                <h5>🍰 Sweets</h5>
                <p>Sweet treats to delight your taste buds</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="offers container text-center my-5">
        <h2 className="mb-4">🎁 Special Offers</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="offer-card p-4 shadow text-white bg-danger rounded">
              <h4>💸 30% Off</h4>
              <p>On all vegetarian dishes</p>
              <p className="offer-timer">Offer Ends In: {formatTime(timeLeft)}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="offer-card p-4 shadow text-white bg-success rounded">
              <h4>🥂 Buy 1 Get 1</h4>
              <p>On all beverages</p>
              <p className="offer-timer">Offer Ends In: {formatTime(timeLeft)}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="offer-card p-4 shadow text-white bg-warning rounded">
              <h4>🍫 Free Dessert</h4>
              <p>On orders above ₹599</p>
              <p className="offer-timer">Offer Ends In: {formatTime(timeLeft)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose py-5 bg-light">
        <h2 className="text-center mb-4">🌟 Why Choose Us?</h2>
        <div className="row container mx-auto text-center g-4">
          <div className="col-md-4">
            <div className="why-card p-4 shadow-sm">
              <span>🥗</span>
              <h5>Fresh Ingredients</h5>
              <p>Farm-fresh produce for maximum flavor.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="why-card p-4 shadow-sm">
              <span>⚡</span>
              <h5>Fast Delivery</h5>
              <p>Delivered piping hot at lightning speed.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="why-card p-4 shadow-sm">
              <span>👨‍🍳</span>
              <h5>Expert Chefs</h5>
              <p>Cooked with love and professional care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews container text-center my-5">
        <h2>💬 Customer Reviews</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="review shadow-sm p-3 rounded">
              "Fantastic taste & speedy delivery! 👌" <br />
              <strong>- Ananya</strong>
            </div>
          </div>
          <div className="col-md-4">
            <div className="review shadow-sm p-3 rounded">
              "Love the fresh food and offers! 🌟" <br />
              <strong>- Ramesh</strong>
            </div>
          </div>
          <div className="col-md-4">
            <div className="review shadow-sm p-3 rounded">
              "Every order is delightful 🥰" <br />
              <strong>- Sneha</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Social Icons */}
      <footer className="footer text-center py-4 bg-dark text-white">
        <p>© 2025 Foodie's Hub | Made with ❤️</p>
        <div className="socials d-flex justify-content-center gap-4 mt-2">
          <a
            href="https://www.facebook.com/YourPage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-4"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/YourPage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-4"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com/YourPage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-4"
          >
            <FaTwitter />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
