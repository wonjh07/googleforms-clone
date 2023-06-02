import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PreviewState {
  open: boolean;
  data: any;
}

export interface AnswerState {
  data: any;
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
    setAnswers: (state, action: PayloadAction<AnswerState>) => {
      state.data = action.payload;
    },
  },
});

export const { openPreview, closePreview, setAnswers } = previewSlice.actions;
export default previewSlice.reducer;
