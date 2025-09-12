import { AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "./Store";

const CartTableBody = ({ cartItems }) => {
  const dispatch = useDispatch();

  return (
    <tbody>
      <AnimatePresence>
        {cartItems.map((item) => (
          <motion.tr
            key={item.id}
            className="align-middle"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <td className="d-flex align-items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded shadow-sm"
                style={{ objectFit: "cover" }}
              />
              <span className="fw-semibold">{item.name}</span>
            </td>
            <td>₹{item.price.toFixed(2)}</td>
            <td>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                >
                  –
                </button>
                <motion.span
                  key={item.quantity}
                  className="fs-5 fw-medium"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.quantity}
                </motion.span>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => dispatch(increaseQuantity(item.id))}
                >
                  +
                </button>
              </div>
            </td>
            <td>₹{(item.price * item.quantity).toFixed(2)}</td>
            <td>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => dispatch(removeFromCart(item.id))}
                title="Remove item"
              >
                Remove
              </button>
            </td>
          </motion.tr>
        ))}
      </AnimatePresence>
    </tbody>
  );
};

export default CartTableBody;
