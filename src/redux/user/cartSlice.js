import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCart: null,
  
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartData: (state, action) => {
      state.currentCart = action.payload 
    }
  }
});

export const { setCartData } = cartSlice.actions;

export default cartSlice.reducer;
