import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Sweets() {
  const sweets = useSelector((state) => state.products.Sweets);
  const dispatch = useDispatch();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtered products
  const [filteredProducts, setFilteredProducts] = useState(sweets);

  useEffect(() => {
    setFilteredProducts(sweets);
  }, [sweets]);

  // ✅ Predefined price ranges starting from 100
  const priceRanges = [
    { label: "100 - 199", min: 100, max: 199 },
    { label: "200 - 299", min: 200, max: 299 },
    { label: "300 - 399", min: 300, max: 399 },
    { label: "400 - 499", min: 400, max: 499 },
    
  ];

  // Apply filter
  const applyPriceFilter = (min, max) => {
    const filtered = sweets.filter(
      (product) => product.price >= min && product.price <= max
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  // Reset (All button)
  const showAll = () => {
    setFilteredProducts(sweets);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart 🛒`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="text-center mb-4 fw-bold text-danger">🍬 Sweets</h2>

      {/* ✅ Price Filter Buttons */}
      <div className="d-flex justify-content-center mb-4 gap-2 flex-wrap">
        {priceRanges.map((range, idx) => (
          <button
            key={idx}
            className="btn btn-outline-danger"
            onClick={() => applyPriceFilter(range.min, range.max)}
          >
            ₹{range.label}
          </button>
        ))}
        <button className="btn btn-outline-secondary" onClick={showAll}>
          All
        </button>
      </div>

      {/* Products */}
      <div className="row g-4">
        {currentItems.length > 0 ? (
          currentItems.map((product, index) => (
            <div key={index} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm product-card">
                <img
                  src={product.image || "https://via.placeholder.com/200"}
                  alt={product.name}
                  className="card-img-top product-img"
                  height="200px"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-capitalize text-center">
                    {product.name}
                  </h5>
                  <p className="price text-center">₹{product.price}</p>
                  <button
                    className="btn btn-danger mt-auto"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">
            No products found in this price range.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  ◀ Prev
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next ▶
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Toast */}
      <ToastContainer />
    </div>
  );
}

export default Sweets;
