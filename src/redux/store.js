import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
// Import your slices here
// import exampleSlice from './features/exampleSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
      },
});

export default store;