import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";
import "./Nonveg.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Nonveg() {
  let nonvegProducts = useSelector(
    (globalState) => globalState.products.nonveg
  );
  let dispatch = useDispatch();

  // ✅ Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Calculate items for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nonvegProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Total number of pages
  const totalPages = Math.ceil(nonvegProducts.length / itemsPerPage);

  return (
    <div className="container-fluid py-4">
      <h2 className="text-center mb-4 fw-bold text-danger">🍗 Non-Veg Items</h2>

      {/* Products */}
      <div className="row g-4">
        {currentItems.map((nonveg) => (
          <div key={nonveg.id} className="col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm product-card">
              <img
                src={nonveg.image || "https://via.placeholder.com/200"}
                alt={nonveg.name}
                className="card-img-top product-img"
                height="200px"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-capitalize text-center">
                  {nonveg.name}
                </h5>
                <p className="price text-center">₹{nonveg.price}</p>
                <button
                  className="btn btn-success mt-auto"
                  onClick={() => {
                    dispatch(addToCart(nonveg));
                    toast.success(`${nonveg.name} added to cart 🛒`, {
                      position: "top-right",
                      autoClose: 2000,
                    });
                  }}
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
            {/* Prev Button */}
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ◀ Prev
              </button>
            </li>

            {/* Page Numbers */}
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

            {/* Next Button */}
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

      {/* ✅ Toast container */}
      <ToastContainer />
    </div>
  );
}

export default Nonveg;
