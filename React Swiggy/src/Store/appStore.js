import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const appStore = configureStore({
  reducer: {
    cart: cartReducer, // cartReducer is the reducer for the cart slice
  }
});


export default appStore;