// src/features/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {
    increment: (state, action) => {
      const title = action.payload?.title;
      if (title && title !== "") {
        if (state?.[title]) {
          state[title] += 1;
        } else {
          state[title] = 1;
        }
      }
    },
    decrement: (state, action) => {
      const title = action.payload?.title;
      if (title && title !== "") {
        if (state?.[title] && state[title] > 0) {
          state[title] -= 1;
        }
      }
    },
    updateQuantity: (state, action) => {
      const title = action.payload?.title;
      const quantity = action.payload?.quantity;
      if (title && title !== "") {
        state[title] = quantity;
      }
    },
    deleteProduct: (state, action) => {
      const title = action.payload?.title;
      if (title && title !== "") {
        delete state[title];
      }
    },
    incrementByAmount: (state, action) => {
      const title = action.payload?.title;
      const quantity = action.payload?.quantity;
      if (title && title !== "") {
        if (state?.[title]) {
          let updatedQuant = state[title] + quantity;
          updatedQuant = updatedQuant <= 0 ? 1 : updatedQuant; 
          state[title] = updatedQuant;
        } else {
          state[title] = quantity;
        }
      }
    },
  },
});

export const { increment, decrement, updateQuantity, deleteProduct, incrementByAmount } = cartSlice.actions;

export default cartSlice.reducer;
