import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : { cartItems: [] };

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

        // calculate total price
        state.itemsPrice = state.cartItems.reduce(
          (acc, item) => acc + item.price * item.qty,
          0
        );

        // calculate shipping price
        state.shippingPrice = state.itemsPrice >= 500 ? 0 : 99;

        // calculate total price
        state.totalPrice = (
          Number(state.itemsPrice) + Number(state.shippingPrice)
        ).toFixed(0);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
