import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cart'))?.cartItems || [],
  itemsPrice: JSON.parse(localStorage.getItem('cart'))?.itemsPrice || 0,
  shippingPrice: JSON.parse(localStorage.getItem('cart'))?.shippingPrice || 0,
  totalPrice: JSON.parse(localStorage.getItem('cart'))?.totalPrice || 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // Check if item already exists in cart
      const existItem = state.cartItems.find((x) => x._id === item._id);

      // Update cartItems by adding or updating the item
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate items price (sum of item price * quantity)
      const itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );

      // Calculate shipping price (if itemsPrice >= 500, no shipping, otherwise 99)
      const shippingPrice = itemsPrice >= 500 ? 0 : 99;

      // Calculate total price (itemsPrice + shippingPrice)
      const totalPrice = (itemsPrice + shippingPrice).toFixed(0);

      // Update state with the new values
      state.itemsPrice = itemsPrice;
      state.shippingPrice = shippingPrice;
      state.totalPrice = totalPrice;

      // Save the updated cart object to localStorage
      localStorage.setItem(
        'cart',
        JSON.stringify({
          cartItems: state.cartItems,
          itemsPrice: state.itemsPrice,
          shippingPrice: state.shippingPrice,
          totalPrice: state.totalPrice,
        })
      );
    },
    removeFromCart: (state, action) => {
      const id = action.payload;

      // Remove item from cartItems
      state.cartItems = state.cartItems.filter((x) => x._id !== id);

      // Calculate items price (sum of item price * quantity)
      const itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );

      // Calculate shipping price (if itemsPrice >= 500, no shipping, otherwise 99)
      const shippingPrice = itemsPrice >= 500 ? 0 : 99;

      // Calculate total price (itemsPrice + shippingPrice)
      const totalPrice = itemsPrice + shippingPrice;

      // Update state with the new values
      state.itemsPrice = itemsPrice;
      state.shippingPrice = shippingPrice;
      state.totalPrice = totalPrice;

      // Save the updated cart object to localStorage
      localStorage.setItem(
        'cart',
        JSON.stringify({
          cartItems: state.cartItems,
          itemsPrice: state.itemsPrice,
          shippingPrice: state.shippingPrice,
          totalPrice: state.totalPrice,
        })
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
