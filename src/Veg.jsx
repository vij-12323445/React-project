import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";
import "./Veg.css";
import { ToastContainer, toast } from "react-toastify";  // ✅ Import
import "react-toastify/dist/ReactToastify.css";           // ✅ Styles

function Veg() {
  let vegProducts = useSelector((globalState) => globalState.products.veg);
  let dispatch = useDispatch();

  // ✅ Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vegProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(vegProducts.length / itemsPerPage);

  // ✅ Toast handler
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
      <h2 className="text-center mb-4 fw-bold text-success">🥦 Veg Items</h2>

      <div className="row g-4">
        {currentItems.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
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
                  className="btn btn-success mt-auto"
                  onClick={() => handleAddToCart(product)} // ✅ Call toast
                >
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Pagination Controls */}
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

      {/* ✅ Toast Container (place once in your app) */}
      <ToastContainer />
    </div>
  );
}

export default Veg;
