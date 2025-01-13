export const updateCart = (state) => {
  {
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
    localStorage.setItem('cart', JSON.stringify(state));
  }

  return state;
};
