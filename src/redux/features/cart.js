import { createSlice } from "@reduxjs/toolkit";



const calculateTotal = (cartItems) => {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.subtotal;
  });
  return total;
};




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
    },
    removeItem: (state, action) => {
      const _id = action.payload._id;
      state.cartItems = state.cartItems.filter((item) => item._id !== _id);
    
      // Actualizar el localStorage después de eliminar un elemento del carrito
      const cartData = {
        cartItems: state.cartItems,
        total: calculateTotal(state.cartItems),
      };
      localStorage.setItem("cartData", JSON.stringify(cartData));
    },
    getCartData: (state, action) => {
      // Solo cargar datos si el carrito está vacío
      if (state.cartItems.length === 0) {
        const cartData = JSON.parse(localStorage.getItem("cartData"));
        if (cartData) {
          state.cartItems = cartData.cartItems;
        }
      }
    },
    updateQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;

      const itemToUpdate = state.cartItems.find((item) => item._id === itemId);

      if (itemToUpdate) {
        // Actualizar la cantidad y el subtotal
        itemToUpdate.quantity = newQuantity;
        itemToUpdate.subtotal = itemToUpdate.price * newQuantity;
      }

      // Actualizar el total y guardar en localStorage
      let total = 0;
      state.cartItems.forEach((item) => {
        total += item.subtotal;
      });

      const cartData = {
        cartItems: state.cartItems,
        total: total,
      };

      localStorage.setItem("cartData", JSON.stringify(cartData));
    },
    cleanCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartData");
    }
  },
});

export const { addItem, removeItem, getCartData, updateQuantity, cleanCart } =
  cartSlice.actions;
export default cartSlice.reducer;
