import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => item._id === x._id);

      if (!existItem) {
        state.cartItems.push(item);
      } else {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      }

      // Recalculate total price and shipping price after any update
      state.itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );

      state.shippingPrice = state.itemsPrice >= 500 ? 0 : 99;
      state.totalPrice = (state.itemsPrice + state.shippingPrice).toFixed(0);

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
