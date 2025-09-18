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
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

// ✅ Helper function for email validation
const isValidEmail = (email) => {
  // Simple regex for email format validation
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
};

function Cart() {
  const cartItems = useSelector((state) => state.cart ?? []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [customerEmail, setCustomerEmail] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [offerDiscount, setOfferDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [paymentTimer, setPaymentTimer] = useState(0);

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

  // Email function
  const sendOrderEmail = async (order) => {
    const ordersMapped = order.items.map((item) => ({
      image_url: item.image,
      name: item.name,
      units: item.quantity,
      price: (Number(item.price) * Number(item.quantity)).toFixed(2),
    }));

    const templateParams = {
      order_id: order.id,
      order_date: new Date(order.createdAt).toLocaleString(),
      email: customerEmail,
      subtotal: subtotal.toFixed(2),
      offer_discount: offerDiscount.toFixed(2),
      coupon_discount: couponDiscount.toFixed(2),
      cost_shipping: shipping.toFixed(2),
      cost_tax: taxAmount.toFixed(2),
      cost_total: totalWithTaxAndShipping.toFixed(2),
      orders: ordersMapped,
      orders_json: JSON.stringify(ordersMapped),
    };

    try {
      await emailjs.send(
        "service_g5ace4d", // replace
        "template_1snt3qu", // replace
        templateParams,
        "b_cLWVpw7lCIbi9E0" // replace
      );
    } catch (err) {
      console.error("Failed to send order email:", err);
    }
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

  // Apply coupon
  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    const discountMap = { SAVE10: 10, SAVE20: 20, SAVE30: 30, VIJAY10: 10, VIJAY20: 20, VIJAY30: 30 };
    const percent = discountMap[code] || 0;
    setCouponDiscountPercent(percent);
    setAppliedCoupon(percent ? `${code} applied (${percent}% OFF)` : "Invalid coupon ❌");

    if (percent > 0) {
      for (let i = 0; i < 8; i++) {
        confetti({
          particleCount: 60,
          spread: 360,
          startVelocity: 50,
          ticks: 200,
          shapes: ["circle"],
          scalar: 2,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
        });
      }
      Swal.fire({
        icon: "success",
        title: "Coupon Applied",
        text: `${code} applied successfully! You got ${percent}% OFF.`,
        timer: 1400,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Coupon",
        text: `The code "${code}" is not valid.`,
        timer: 1400,
        showConfirmButton: false,
      });
    }
  };

  // Offer discount
  const handleOfferDiscount = (percent) => {
    const discountValue = subtotal * percent;
    setOfferDiscount(discountValue);

    for (let i = 0; i < 5; i++) {
      confetti({
        particleCount: 120,
        spread: 360,
        startVelocity: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });
    }

    Swal.fire({
      icon: "success",
      title: "🎉 Offer Applied!",
      text: `You got ${percent * 100}% OFF on your subtotal.`,
      timer: 1400,
      showConfirmButton: false,
    });
  };

  // Place Order
  const handlePlaceOrder = async () => {
    if (!cartItems.length) {
      return Swal.fire("Empty Cart", "Your cart is empty!", "info");
    }
    
    // ✅ Updated email validation logic
    if (!isValidEmail(customerEmail)) {
      return Swal.fire(
        "Invalid Email",
        "Please enter a valid email address to proceed!",
        "warning"
      );
    }

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
      setPaymentTimer(120);
      return;
    } else if (method === "card") {
      Swal.fire("💳 Card Payment", "Card payment coming soon!", "info");
      return;
    } else if (method === "cod") {
      Swal.fire("📦 COD Selected", "You can pay on delivery!", "success");
    }

    const order = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      email: customerEmail,
      status: "Delivered",
      items: cartItems.map((it) => ({
        id: it.id,
        name: it.name,
        image: it.image,
        price: Number(it.price),
        quantity: Number(it.quantity),
        lineTotal: Number(it.price) * Number(it.quantity),
      })),
      pricing: {
        subtotal,
        manualDiscount: offerDiscount,
        couponDiscount,
        tax: taxAmount,
        shipping,
        total: totalWithTaxAndShipping,
      },
    };

    dispatch(addOrder(order));
    dispatch(clearCart());

    await sendOrderEmail(order);

    Swal.fire({
      icon: "success",
      title: "Order Placed!",
      text: "Your order has been placed successfully!",
      timer: 1600,
      showConfirmButton: false,
    });

    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });

    setTimeout(() => {
      navigate("/orders");
    }, 1700);
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

          <div className="col-md-5">
            <div className="card shadow p-4 cart-summary">
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
              {appliedCoupon && <small className="text-muted">{appliedCoupon}</small>}

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

      {/* QR Modal */}
      {showQR && (
        <div className="qr-modal">
          <div className="qr-modal-content p-4 shadow-lg rounded bg-white text-center">
            <h5 className="mb-3 text-primary fw-bold">Scan to Pay</h5>
            <p className="fw-semibold">
              Amount: <span className="text-danger">₹{totalWithTaxAndShipping.toFixed(2)}</span>
            </p>
            <p className="text-danger fw-bold">
              ⏱️ Time Left: {Math.floor(paymentTimer / 60)}:{String(paymentTimer % 60).padStart(2, "0")}
            </p>

            {QRComp && (
              <QRComp
                value={`upi://pay?pa=7732026214-2@ybl&am=${totalWithTaxAndShipping.toFixed(2)}&cu=INR&tn=Order`}
                size={220}
                includeMargin={true}
              />
            )}
            <button className="btn btn-secondary mt-3" onClick={() => setShowQR(false)}>
              Cancel Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;