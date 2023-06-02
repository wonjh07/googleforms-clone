import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './questionSlice';

export const store = configureStore({
  reducer: { survey: questionReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
