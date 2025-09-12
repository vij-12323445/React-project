// src/Cart.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  addOrder,
} from "./Store";
import "./Cart.css";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import * as QR from "qrcode.react";
import { Link } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart ?? []);
  const dispatch = useDispatch();

  const [customerEmail, setCustomerEmail] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [offerDiscount, setOfferDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [paymentTimer, setPaymentTimer] = useState(0); // ⏱️ Timer

  const QRComp = QR.QRCodeCanvas || QR.QRCodeSVG || QR.QRCode || null;

  // Pricing
  const subtotal = cartItems.reduce((sum, item) => {
    const p = Number(item.price) || 0;
    const q = Number(item.quantity) || 0;
    return sum + p * q;
  }, 0);

  const couponDiscount = (subtotal * couponDiscountPercent) / 100;
  const discountedTotal = Math.max(0, subtotal - offerDiscount - couponDiscount);
  const shipping = 50;
  const taxRate = 0.05;
  const taxAmount = discountedTotal * taxRate;
  const totalWithTaxAndShipping = discountedTotal + taxAmount + shipping;

  // Confetti
  const launchConfetti = () => {
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
  };

  // Payment timer effect
  useEffect(() => {
    if (paymentTimer > 0) {
      const interval = setInterval(() => {
        setPaymentTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (paymentTimer === 0 && showQR) {
      Swal.fire("⏳ Time Expired", "Payment window closed!", "error");
      setShowQR(false);
    }
  }, [paymentTimer, showQR]);

  // Place Order with Payment Selection
  const handlePlaceOrder = async () => {
    if (!cartItems.length) {
      return Swal.fire("Empty Cart", "Your cart is empty!", "info");
    }

    // Ask for payment method
    const { value: method } = await Swal.fire({
      title: "Select Payment Method",
      html: `
        <div class="payment-options">
          <label class="payment-option btn btn-outline-primary w-100 mb-2">
            <input type="radio" name="payment" value="cod" /> Cash on Delivery
          </label>
          <label class="payment-option btn btn-outline-success w-100 mb-2">
            <input type="radio" name="payment" value="qr" /> QR / UPI Payment
          </label>
          <label class="payment-option btn btn-outline-info w-100">
            <input type="radio" name="payment" value="card" /> Card Payment
          </label>
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const checked = document.querySelector('input[name="payment"]:checked');
        if (!checked) {
          Swal.showValidationMessage("Please select a payment method!");
          return false;
        }
        return checked.value;
      },
      confirmButtonText: "Continue",
      showCancelButton: true,
    });

    if (!method) return;

    if (method === "qr") {
      setShowQR(true);
      setPaymentTimer(120); // ⏱️ 2 minutes for payment
      return;
    } else if (method === "card") {
      Swal.fire("💳 Card Payment", "Card payment coming soon!", "info");
      return;
    } else if (method === "cod") {
      Swal.fire("📦 COD Selected", "You can pay on delivery!", "success");
    }

    // Create order
    const order = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items: cartItems,
      pricing: {
        subtotal,
        offerDiscount,
        couponDiscount,
        tax: taxAmount,
        shipping,
        total: totalWithTaxAndShipping,
      },
    };

    dispatch(addOrder(order));
    dispatch(clearCart());

    Swal.fire({
      icon: "success",
      title: "Order Placed!",
      text: "Your order has been placed successfully!",
      timer: 2000,
      showConfirmButton: false,
    });

    launchConfetti();
  };

  // ✅ Apply Offer Discount
  const handleOfferDiscount = (percent) => {
    const discountValue = subtotal * percent;
    setOfferDiscount(discountValue);

    // 🎈 Balloons / Confetti
    for (let i = 0; i < 5; i++) {
      confetti({
        particleCount: 120,
        spread: 360,
        startVelocity: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ["#FF69B4", "#FFD700", "#87CEEB", "#32CD32", "#FF4500"],
      });
    }

    // ✅ Show message
    Swal.fire({
      icon: "success",
      title: "🎉 Offer Applied!",
      text: `You got ${percent * 100}% OFF on your subtotal.`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Apply Coupon
  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    const discountMap = { VIJAY10: 10, VIJAY20: 20, VIJAY30: 30 };
    const percent = discountMap[code] || 0;

    setCouponDiscountPercent(percent);
    setAppliedCoupon(
      percent ? `${code} applied (${percent}% OFF)` : "Invalid coupon ❌"
    );

    if (percent > 0) {
      // 🎈 Balloons / Confetti
      for (let i = 0; i < 5; i++) {
        confetti({
          particleCount: 150,
          startVelocity: 100,
          spread: 1000,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: ["#FF4B3E", "#FFC93C", "#6BCB77", "#4D96FF", "#845EC2"],
          gravity: 0.4,
          scalar: 1.2,
          drift: 0.2,
        });
      }

      // ✅ Show message
      Swal.fire({
        icon: "success",
        title: "🏷️ Coupon Applied!",
        text: `${code} applied successfully! You got ${percent}% OFF.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "❌ Invalid Coupon",
        text: `The code "${code}" is not valid.`,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="container my-5 cart-page">
      <h2 className="text-center mb-4 text-primary fw-bold">🛒 Shopping Cart</h2>

      {!cartItems.length ? (
        <div className="text-center">
          <p className="fs-5 text-muted">Your cart is empty.</p>
          <Link to="/" className="btn btn-primary mt-3">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          {/* Cart Items */}
          <div className="col-md-7 mb-4">
            <table className="table table-hover shadow-sm cart-table">
              <thead className="table-primary">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  const price = Number(item.price) || 0;
                  const qty = Number(item.quantity) || 0;
                  return (
                    <tr key={item.id}>
                      <td className="d-flex align-items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded"
                        />
                        <span>{item.name}</span>
                      </td>
                      <td>₹{price.toFixed(2)}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                          >
                            -
                          </button>
                          <span className="fw-bold">{qty}</span>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => dispatch(increaseQuantity(item.id))}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>₹{(price * qty).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              className="btn btn-outline-danger mt-2"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="col-md-5">
            <div className="card shadow p-4 cart-summary sticky-top">
              <h4 className="mb-3">Order Summary</h4>
              <p className="d-flex justify-content-between">
                <span>Subtotal:</span> <span>₹{subtotal.toFixed(2)}</span>
              </p>
              {offerDiscount > 0 && (
                <p className="d-flex justify-content-between text-success">
                  <span>Offer Discount:</span>{" "}
                  <span>-₹{offerDiscount.toFixed(2)}</span>
                </p>
              )}
              {couponDiscount > 0 && (
                <p className="d-flex justify-content-between text-success">
                  <span>Coupon Discount:</span>{" "}
                  <span>-₹{couponDiscount.toFixed(2)}</span>
                </p>
              )}
              <p className="d-flex justify-content-between">
                <span>Tax (5%):</span> <span>₹{taxAmount.toFixed(2)}</span>
              </p>
              <p className="d-flex justify-content-between">
                <span>Shipping:</span> <span>₹{shipping.toFixed(2)}</span>
              </p>
              <h5 className="d-flex justify-content-between border-top pt-3 fw-bold">
                <span>Total:</span>{" "}
                <span>₹{totalWithTaxAndShipping.toFixed(2)}</span>
              </h5>

              {/* Offer Discount */}
              <div className="mt-4 mb-3 d-flex flex-wrap gap-2">
                <button className="btn discount-btn" onClick={() => handleOfferDiscount(0.1)}>💵 10% Off</button>
                <button className="btn discount-btn" onClick={() => handleOfferDiscount(0.2)}>💵 20% Off</button>
                <button className="btn discount-btn" onClick={() => handleOfferDiscount(0.3)}>💵 30% Off</button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setOfferDiscount(0);
                    setCouponDiscountPercent(0);
                    setAppliedCoupon("");
                    setCoupon("");
                  }}
                >
                  Reset
                </button>
              </div>

              {/* Coupon */}
              <div className="mt-3 input-group">
                <span className="input-group-text bg-light">🏷️</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button className="btn btn-success" onClick={applyCoupon}>
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <small className="text-muted">{appliedCoupon}</small>
              )}

              {/* Actions */}
              <div className="mt-4 d-grid gap-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handlePlaceOrder}>
                  Place Order
                </button>
                <Link to="/" className="btn btn-outline-secondary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Modal with Timer */}
      {showQR && (
        <div className="qr-modal">
          <div className="qr-modal-content p-4 shadow-lg rounded bg-white text-center">
            <h5 className="mb-3 text-primary fw-bold">Scan to Pay</h5>
            <p className="fw-semibold">
              Amount:{" "}
              <span className="text-danger">
                ₹{totalWithTaxAndShipping.toFixed(2)}
              </span>
            </p>

            {/* Show timer */}
            <p className="text-danger fw-bold">
              ⏱️ Time Left: {Math.floor(paymentTimer / 60)}:
              {String(paymentTimer % 60).padStart(2, "0")}
            </p>

            {QRComp && (
              <QRComp
                value={`upi://pay?pa=7732026214-2@ybl&am=${totalWithTaxAndShipping.toFixed(
                  2
                )}&cu=INR&tn=Order`}
                size={220}
                includeMargin={true}
              />
            )}
            <button
              className="btn btn-secondary mt-3"
              onClick={() => setShowQR(false)}
            >
              Cancel Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
