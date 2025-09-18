import { configureStore, createSlice } from "@reduxjs/toolkit";
import Drinks from "./Drinks";
import Sweets from "./Sweets";

/* ------------------------
   Utility functions
------------------------- */
const loadState = (key, defaultValue) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveState = (key, state) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {
    console.error("Error saving to localStorage:", e);
  }
};


/* ------------------------
   Products Slice (static data)
------------------------- */
const productsSlice = createSlice({
  name: "products",
  initialState: {
    veg: [
      { id: 1, name: "Curd Rice", price: 79, image: "Image/curd.png" },
      { id: 2, name: "Dal Rice", price: 99, image: "Image/dal.png" },
      { id: 3, name: "Gobi", price: 69, image: "Image/gobi.png" },
      { id: 4, name: "Lemon Rice", price: 49, image: "Image/lemon.png" },
      { id: 5, name: "Mushroom rice", price: 249, image: "Image/mushrom.png" },
      { id: 6, name: "Noodles", price: 79, image: "Image/noodles.png" },
      { id: 7, name: "Sambar Rice", price: 89, image: "Image/sambar.png" },
      { id: 8, name: "Veg Biriyani", price: 149, image: "Image/veg biriyani.png" },
      { id: 9, name: "Veg polav", price: 199, image: "Image/veg pulao.png" },
      { id: 10, name: "Paneer rice", price: 149, image: "Image/paneer.png" },
      { id: 11, name: "Jeera Rice", price: 199, image: "Image/jeerarice.png" },
      { id: 12, name: "Spinach Rice", price: 119, image: "Image/spinachrice.png" },
      { id: 13, name: "kajju paneer Rice", price: 249, image: "Image/kajjupaneerrice.png" },
      { id: 14, name: "Gongura Rice", price: 89, image: "Image/gongurarice.png" },
      { id: 15, name: "Veg Dum Biriyani", price: 149, image: "Image/vegdumbiriyani.png" },
      { id: 16, name: "Veg Fried Rice", price: 99, image: "Image/vegfriedrice.png" },
      { id: 17, name: "coriender Rice", price: 59, image: "Image/coriendarrice.png" },
      { id: 18, name: "Pudina Rice", price: 99, image: "Image/pudinarice.png" },
      { id: 19, name: "Corn Fried Rice", price: 99, image: "Image/cornfriedrice.png" },
      { id: 20, name: "Potato Rice", price: 79, image: "Image/potato.png" },
      { id: 21, name: "Curryleaf Rice", price: 59, image: "Image/curryleafrice.png" },
      { id: 22, name: "Carrot Rice", price: 89, image: "Image/carrotrice.png" },
      { id: 23, name: "Beetroot Rice", price: 79, image: "Image/beetroot.png" },
      { id: 24, name: "Capsicum Rice", price: 99, image: "Image/capsicum.png" },
      
    ],
    nonveg: [
      { id: 1, name: "Chicken curry", price: 249, image: "Image/chicken.png" },
      { id: 2, name: "Mutton curry", price: 599, image: "Image/mutton.png" },
      { id: 3, name: "Fish fry", price: 249, image: "Image/fish.png" },
      { id: 4, name: "Prawns fry", price: 299, image: "Image/prawns.png" },
      { id: 5, name: "Chicken Lollypop", price: 399, image: "Image/chickenlollypop.png" },
      { id: 6, name: "Chicken Tikka", price: 249, image: "Image/chickentikka.png" },
      { id: 7, name: "Mutton Kabab", price: 599, image: "Image/muttonkabab.png" },
      { id: 8, name: "Prawns Masala", price: 349, image: "Image/prawnsmasala.png" },
      { id: 9, name: "Mutton Keema", price: 499, image: "Image/muttonkemma.png" },
      { id: 10, name: "Shawarma", price: 119, image: "Image/shawarma.png" },
      { id: 11, name: "Leg piece", price: 149, image: "Image/legpiece.png" },
      { id: 12, name: "Chicken fry", price: 249, image: "Image/chickenfry.png" },
      { id: 13, name: "Chicken pakoda", price: 199, image: "Image/chickenpakoda.png" },
      { id: 14, name: "Chicken Mandi", price: 299, image: "Image/chickenmandi.png" },
      { id: 15, name: "KFC", price: 299, image: "Image/kfc.png" },
      { id: 16, name: "Chicken Biriyani", price: 249, image: "Image/chickenbiriyani.png" },
      { id: 17, name: "chicken Fry Biriyani", price: 299, image: "Image/chickenfrybiriyani.png" },
      { id: 18, name: "Fish Biriyani", price: 349, image: "Image/fishbiriyani.png" },
      { id: 19, name: "Prawns Biriyani", price: 399, image: "Image/prawnsbiriyani.png" },
      { id: 20, name: "Mutton biriyani", price: 499, image: "Image/muttonbiriyani.png" },
      { id: 21, name: "Mutton Mandi biriyani", price: 599, image: "Image/muttonmandi.png" },
      { id: 22, name: "Prawns Fry biriyani", price: 349, image: "Image/prawnsfry.png" },
      { id: 23, name: "Chicken Thandori", price: 299, image: "Image/chickenthandori.png" },
      { id: 24, name: "Chicken Wings", price: 299, image: "Image/chickenwings.png" },
    ],
    Drinks: [
      { id: 1, name: "Apple juice", price: 99, image: "Image/apple.png" },
      { id: 2, name: "Blue", price: 149, image: "Image/blue.png" },
      { id: 3, name: "Cocktail", price: 199, image: "Image/cocktail.png" },
      { id: 4, name: "Lemon Juice", price: 49, image: "Image/lemonjuice.png" },
      { id: 5, name: "Mango juice", price: 79, image: "Image/mango.png" },
      { id: 6, name: "Orange juice", price: 49, image: "Image/orange.png" },
      { id: 7, name: "Pine apple juice", price: 79, image: "Image/pineapple.png" },
      { id: 8, name: "Softdrink", price: 49, image: "Image/softdrink.png" },
      { id: 9, name: "Strawberry juice", price: 99, image: "Image/strawberry.png" },
      { id: 10, name: "Watermelon juice", price: 49, image: "Image/watermelon.png" },
      { id: 11, name: "Cococola juice", price: 49, image: "Image/cococola.png" },
      { id: 12, name: "Buttermilk ", price: 49, image: "Image/buttermilk.png" },
      { id: 13, name: "Pista Milkshake ", price: 159, image: "Image/pista.png" },
      { id: 14, name: "Oreo Milkshake ", price: 149, image: "Image/oreo.png" },
      { id: 15, name: "Strawberry Milkshake ", price: 149, image: "Image/strawberrymilkshake.png" },
      { id: 16, name: "Chocolate Milkshake ", price: 129, image: "Image/chocolate.png" },
      { id: 17, name: "Honey Almond Milkshake ", price: 169, image: "Image/honeyalmond.png" },
      { id: 18, name: "Banana Milkshake ", price: 109, image: "Image/banana.png" },
      { id: 19, name: "Pineapple Milkshake ", price: 139, image: "Image/pineapplemilk.png" },
      { id: 20, name: "Blueberry Milkshake ", price: 149, image: "Image/blueberry.png" },
      { id: 21, name: "Hazelnut Milkshake ", price: 199, image: "Image/hazelnut.png" },
      { id: 22, name: "Rose Milkshake ", price: 149, image: "Image/rosemilk.png" },
      { id: 23, name: "ButterScotch Milkshake ", price: 169, image: "Image/butterscoth.png" },
      { id: 24, name: "Vanilla Milkshake ", price: 149, image: "Image/vanilla.png" },
    ],
    Sweets: [
      { id: 1, name: "Khaju burfi", price: 499, image: "Image/khajuburfi.png" },
      { id: 2, name: "Motichur laddu", price: 349, image: "Image/motichurladdu.png" },
      { id: 3, name: "Gulab jam", price: 299, image: "Image/gulabjam.png" },
      { id: 4, name: "Bhadusha", price: 199, image: "Image/bhadusha.png" },
      { id: 5, name: "Jilebi", price: 199, image: "Image/jilebi.png" },
      { id: 6, name: "Kalakand", price: 249, image: "Image/kalakand.png" },
      { id: 7, name: "Karanji", price: 179, image: "Image/karanji.png" },
      { id: 8, name: "Laddu", price: 249, image: "Image/laddu.png" },
      { id: 9, name: "Mysurpak", price: 299, image: "Image/mysurpak.png" },
      { id: 10, name: "Palakova", price: 399, image: "Image/palakova.png" },
      { id: 11, name: "Rasagula", price: 349, image: "Image/rasagula.png" },
      { id: 12, name: "Soanpapidi ", price: 199, image: "Image/soanpapidi.png" },
      { id: 13, name: "Malai khaja ", price: 349, image: "Image/malaikhaja.png" },
      { id: 14, name: "Cham Cham ", price: 199, image: "Image/chamcham.png" },
      { id: 15, name: "Malai puri ", price: 299, image: "Image/malaipuri.png" },
      { id: 16, name: "Kunafa ", price: 299, image: "Image/kunafa.png" },
      { id: 17, name: "Putharekulu ", price: 249, image: "Image/putharekulu.png" },
      { id: 18, name: "Rabdi ", price: 199, image: "Image/rabdi.png" },
      { id: 19, name: "Shrikhand ", price: 199, image: "Image/shrikhand.png" },
      { id: 20, name: "Milkpeda ", price: 349, image: "Image/milkapeda.png" },
      { id: 21, name: "kova Ladu ", price: 499, image: "Image/kovaladdu.png" },
      { id: 22, name: "Besanladdu ", price: 299, image: "Image/besanladdu.png" },
      { id: 23, name: "Halwa ", price: 349, image: "Image/halwa.png" },
      { id: 24, name: "Coconut Laddu ", price: 249, image: "Image/coconutladdu.png" },
    ],
  },
  reducers: {},
});

/* ------------------------
   Cart Slice (persistent)
------------------------- */
const cartSlice = createSlice({
  name: "cart",
  initialState: loadState("cart", []),
  reducers: {
    addToCart: (state, action) => {
      let item = state.find((item) => item.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      saveState("cart", state);
    },
    removeFromCart: (state, action) => {
      const newState = state.filter((p) => p.id !== action.payload);
      saveState("cart", newState);
      return newState;
    },
    clearCart: () => {
      saveState("cart", []);
      return [];
    },
    increaseQuantity: (state, action) => {
      let item = state.find((p) => p.id === action.payload);
      if (item) item.quantity += 1;
      saveState("cart", state);
    },
    decreaseQuantity: (state, action) => {
      let item = state.find((p) => p.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          const newState = state.filter((p) => p.id !== action.payload);
          saveState("cart", newState);
          return newState;
        }
      }
      saveState("cart", state);
    },
  },
});

/* ------------------------
   Orders Slice (persistent)
------------------------- */
const ordersSlice = createSlice({
  name: "orders",
  initialState: loadState("orders", []),
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
      saveState("orders", state);
    },
    clearOrders: () => {
      saveState("orders", []);
      return [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;
export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

/* ------------------------
   Store
------------------------- */
const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    orders: ordersSlice.reducer,
  },
});

export default store;
