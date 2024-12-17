import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const existingItemIndex = state.items.findIndex(
            (item) => item.name === action.payload.name
          );
    
          if (existingItemIndex === -1) {
            // If item doesn't exist, add it to the cart
            state.items.push({ ...action.payload, quantity: 1 });
          } else {
            // If item exists, increment its quantity
            state.items[existingItemIndex].quantity += 1;
          }
    },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
          itemToUpdate.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
