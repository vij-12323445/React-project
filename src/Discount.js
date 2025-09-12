
// Example list of valid discount codes
const discountCodes = {
  SAVE10: 10,   // 10% off
  SAVE20: 20,   // 20% off
  WELCOME50: 50 // 50% off
};

// Function to apply discount
function applyDiscount(totalAmount, code) {
  code = code.toUpperCase(); // make case-insensitive
  if (discountCodes[code]) {
    let discountPercent = discountCodes[code];
    let discountAmount = (totalAmount * discountPercent) / 100;
    let finalAmount = totalAmount - discountAmount;

    return {
      success: true,
      discountPercent,
      discountAmount,
      finalAmount
    };
  } else {
    return {
      success: false,
      message: "Invalid discount code!"
    };
  }
}

// Example usage:
let cartTotal = 1000; // ₹1000
let enteredCode = "SAVE20";

let result = applyDiscount(cartTotal, enteredCode);

if (result.success) {
  console.log(`Discount Applied: ${result.discountPercent}%`);
  console.log(`You saved: ₹${result.discountAmount}`);
  console.log(`Final Price: ₹${result.finalAmount}`);
} else {
  console.log(result.message);
}
