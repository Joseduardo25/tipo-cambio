// /app/exchangeRate/redux/exchangeRateSlice.js
// 'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exchangeRate: { purchase_price: 3.760, sale_price: 3.789 },
  amount: 0,
  result: 0,
  isDollarToSol: true,
  isDollarSelected: false,
};

const exchangeRateSlice = createSlice({
  name: 'exchangeRate',
  initialState,
  reducers: {
    setExchangeRate: (state, action) => {
      state.exchangeRate = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setIsDollarToSol: (state, action) => {
      state.isDollarToSol = action.payload;
    },
    setIsDollarSelected: (state, action) => {
      state.isDollarSelected = action.payload;
    },
  },
});

export const {
  setExchangeRate,
  setAmount,
  setResult,
  setIsDollarToSol,
  setIsDollarSelected,
} = exchangeRateSlice.actions;

export default exchangeRateSlice.reducer;
