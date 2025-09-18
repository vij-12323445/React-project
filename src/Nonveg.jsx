import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";
import "./Nonveg.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Nonveg() {
  const nonvegProducts = useSelector((state) => state.products.nonveg);
  const dispatch = useDispatch();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtered products
  const [filteredProducts, setFilteredProducts] = useState(nonvegProducts);

  useEffect(() => {
    setFilteredProducts(nonvegProducts);
  }, [nonvegProducts]);

  // Predefined price ranges
  const priceRanges = [
    { label: "100 - 200", min: 100, max: 200 },
    { label: "200 - 300", min: 200, max: 300 },
    { label: "300 - 400", min: 300, max: 400 },
    { label: "400+", min: 401, max: Infinity },
  ];

  // Apply filter
  const applyPriceFilter = (min, max) => {
    const filtered = nonvegProducts.filter(
      (product) => product.price >= min && product.price <= max
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  // Show all products
  const showAll = () => {
    setFilteredProducts(nonvegProducts);
    setCurrentPage(1);
  };

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart 🛒`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="text-center mb-4 fw-bold text-danger">🍗 Non-Veg Items</h2>

      {/* Price Filter Buttons */}
      <div className="d-flex justify-content-center mb-4 gap-2 flex-wrap">
        {priceRanges.map((range, idx) => (
          <button
            key={idx}
            className="btn btn-outline-success"
            onClick={() => applyPriceFilter(range.min, range.max)}
          >
            ₹{range.label}
          </button>
        ))}
        <button className="btn btn-outline-danger" onClick={showAll}>
          All
        </button>
      </div>

      {/* Product Cards */}
      <div className="row g-4">
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
            <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm product-card">
                <img
                  src={product.image || "https://via.placeholder.com/200"}
                  alt={product.name}
                  className="card-img-top product-img"
                  height="200px"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-capitalize text-center">{product.name}</h5>
                  <p className="price text-center">₹{product.price}</p>
                  <button className="btn btn-success mt-auto" onClick={() => handleAddToCart(product)}>
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No products found in this price range.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                  ◀ Prev
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                  Next ▶
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Nonveg;
