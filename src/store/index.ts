import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './questionSlice';
import previewReducer from './previewSlice';

export const store = configureStore({
  reducer: { survey: questionReducer, preview: previewReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
