import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;

      const existItemIndex = state.cartItems.findIndex(
        (item) => item._id === newItem._id
      );

      if (existItemIndex !== -1) {
        state.cartItems[existItemIndex].quantity += newItem.quantity;
        state.cartItems[existItemIndex].subtotal +=
          newItem.price * newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }

      let total = 0;
      state.cartItems.forEach((item) => {
        total += item.subtotal;
      });

      const cartData = {
        cartItems: state.cartItems,
        total: total,
      };

      localStorage.setItem("cartData", JSON.stringify(cartData));

      console.log(
        "Contenido final del carrito: ",
        JSON.stringify(state.cartItems)
      );
      console.log("Total: ", total);
      console.log("Datos del carrito guardados en localStorage: ",localStorage.getItem("cartData"));
    },
    removeItem: (state, action) => {
      const _id = action.payload._id;
      state.cartItems = state.cartItems.filter((item) => item._id !== _id);
    },
    getCartData: (state, action) => {
      const cartData = JSON.parse(localStorage.getItem("cartData"));
      if (cartData) {
        state.cartItems = cartData.cartItems;
      }
    },
  },
});

export const { addItem, removeItem, getCartData } = cartSlice.actions;
export default cartSlice.reducer;
