// src/CartTableBody.jsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "./Store";

const rowVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.05, type: "spring", stiffness: 200, damping: 18 },
  }),
  exit: { opacity: 0, y: -10, scale: 0.96, transition: { duration: 0.2 } },
};

const CartTableBody = ({ cartItems = [] }) => {
  const dispatch = useDispatch();

  return (
    <tbody>
      <AnimatePresence initial={false}>
        {cartItems.map((item, index) => (
          <motion.tr
            key={item.id}
            custom={index}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ scale: 1.01, backgroundColor: "rgba(0,0,0,0.02)" }}
            style={{ transformOrigin: "center" }}
          >
            {/* Product */}
            <td className="d-flex align-items-center gap-3">
              <motion.img
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded shadow-sm"
                style={{ objectFit: "cover" }}
                whileHover={{ scale: 1.06, rotate: 2 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
              />
              <span className="fw-semibold">{item.name}</span>
            </td>

            {/* Price */}
            <td>₹{Number(item.price || 0).toFixed(2)}</td>

            {/* Quantity */}
            <td>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <motion.button
                  className="btn btn-sm btn-outline-primary"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                >
                  -
                </motion.button>

                <motion.span
                  key={item.quantity}
                  className="fs-5 fw-medium"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 14 }}
                >
                  {Number(item.quantity || 0)}
                </motion.span>

                <motion.button
                  className="btn btn-sm btn-outline-primary"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch(increaseQuantity(item.id))}
                >
                  +
                </motion.button>
              </div>
            </td>

            {/* Line total */}
            <td>₹{(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)}</td>

            {/* Remove */}
            <td>
              <motion.button
                className="btn btn-sm btn-danger"
                onClick={() => dispatch(removeFromCart(item.id))}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🗑 Remove
              </motion.button>
            </td>
          </motion.tr>
        ))}
      </AnimatePresence>
    </tbody>
  );
};

export default CartTableBody;
