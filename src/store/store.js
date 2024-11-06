
import { configureStore } from '@reduxjs/toolkit';
import exchangeRateReducer from '../redux/slice/slice';

const store = configureStore({
  reducer: {
    exchangeRate: exchangeRateReducer,
  },
});

export default store;

