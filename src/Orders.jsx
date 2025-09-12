import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearOrders } from "./Store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Orders.css";

function Orders() {
  const orders = useSelector((state) => state.orders ?? []);
  const dispatch = useDispatch();

  if (!orders.length) {
    return (
      <div className="container mt-5 orders-page text-center">
        <h2 className="display-5 text-primary mb-3">📦 Order History</h2>
        <p className="text-muted fs-5">No orders placed yet.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4 orders-page">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2 className="text-primary mb-2">📦 My Orders</h2>
        <button className="btn btn-danger" onClick={() => dispatch(clearOrders())}>
          🗑️ Clear All Orders
        </button>
      </div>

      <div className="row g-4">
        {orders.map((order) => (
          <div key={order.id} className="col-md-6 col-lg-4">
            <div className="card order-card shadow-lg border-0">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <span>Order #{order.id}</span>
                <span className={`badge ${order.status === "Delivered" ? "bg-success" : "bg-warning"}`}>
                  {order.status || "Pending"}
                </span>
              </div>
              <div className="card-body order-card-body">
                <p className="mb-1">
                  <strong>Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}
                </p>
                {order.email && <p className="mb-2"><strong>Email:</strong> {order.email}</p>}

                <div className="table-responsive order-items-scroll mb-3">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items?.map((item) => (
                        <tr key={`${order.id}-${item.id}`}>
                          <td className="d-flex align-items-center gap-2">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="order-item-img"
                              />
                            )}
                            {item.name}
                          </td>
                          <td>{item.quantity || 0}</td>
                          <td>₹{(item.price || 0).toFixed(2)}</td>
                          <td>₹{(item.lineTotal || (item.price || 0) * (item.quantity || 0)).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="order-pricing text-end">
                  <p>Subtotal: ₹{(order.pricing?.subtotal || 0).toFixed(2)}</p>
                  {order.pricing?.manualDiscount > 0 && <p className="text-success">Manual Discount: -₹{order.pricing.manualDiscount.toFixed(2)}</p>}
                  {order.pricing?.couponDiscount > 0 && <p className="text-success">Coupon Discount: -₹{order.pricing.couponDiscount.toFixed(2)}</p>}
                  <p>Tax: ₹{(order.pricing?.tax || 0).toFixed(2)}</p>
                  <p>Shipping: ₹{(order.pricing?.shipping || 0).toFixed(2)}</p>
                  <h5 className="text-danger fw-bold">Total: ₹{(order.pricing?.total || 0).toFixed(2)}</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
