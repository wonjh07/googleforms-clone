import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PreviewState {
  data: any;
}

export interface InitAnswerState {
  data: any;
}

export interface AnswerState {
  idx: number;
  answer: string;
}

const initialState: PreviewState = {
  data: [],
};

export const previewSlice = createSlice({
  name: 'preview',
  initialState: initialState,
  reducers: {
    initAnswers: (state, action: PayloadAction<InitAnswerState>) => {
      state.data = action.payload;
    },
    setAnswers: (state, action: PayloadAction<AnswerState>) => {
      state.data[action.payload.idx] = action.payload.answer;
    },
    setMultiAnswers: (state, action: PayloadAction<AnswerState>) => {
      state.data[action.payload.idx][action.payload.answer] =
        !state.data[action.payload.idx][action.payload.answer];
    },
  },
});

export const { initAnswers, setAnswers, setMultiAnswers } =
  previewSlice.actions;
export default previewSlice.reducer;
