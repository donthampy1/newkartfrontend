import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    priceRange: [10000, 120000],
    brand: '',
    screenSize: '',
    processor: '',
    storage: ''
  }
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    }
  }
});

export const { setFilters, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
