import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PreviewState {
  open: boolean;
  data: any;
}

export interface InitAnswerState {
  data: any;
}

export interface AnswerState {
  idx: number;
  answer: any;
}

const initialState: PreviewState = {
  open: false,
  data: [],
};

export const previewSlice = createSlice({
  name: 'survey',
  initialState: initialState,
  reducers: {
    openPreview: (state) => {
      state.open = true;
    },
    closePreview: (state) => {
      state.open = false;
    },
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

export const {
  openPreview,
  closePreview,
  initAnswers,
  setAnswers,
  setMultiAnswers,
} = previewSlice.actions;
export default previewSlice.reducer;
