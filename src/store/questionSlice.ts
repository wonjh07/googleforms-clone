import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface QuestionState {
  questionTitle: string;
  questionType: string;
  options: string[];
}

interface SurveyState {
  title: string;
  desc: string;
  questions: QuestionState[];
}

interface TypeState {
  str: string;
  idx: number;
}

interface OptionsState {
  options: string[];
  idx: number;
}

const initialState: SurveyState = {
  title: '제목 없는 설문지',
  desc: '설문지 설명',
  questions: [
    { questionTitle: '', questionType: '단답형', options: ['옵션 1'] },
  ],
};

export const questionSlice = createSlice({
  name: 'survey',
  initialState: initialState,
  reducers: {
    getTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      console.log(state.title);
    },
    getDesc: (state, action: PayloadAction<string>) => {
      state.desc = action.payload;
      console.log(state.desc);
    },
    getType: (state, action: PayloadAction<TypeState>) => {
      state.questions[action.payload.idx].questionType = action.payload.str;
      console.log(state.questions[action.payload.idx].questionType);
    },
    getQuestionTitle: (state, action: PayloadAction<TypeState>) => {
      state.questions[action.payload.idx].questionTitle = action.payload.str;
      console.log(state.questions[action.payload.idx].questionTitle);
    },
    getOpts: (state, action: PayloadAction<OptionsState>) => {
      state.questions[action.payload.idx].options = action.payload.options;
      console.log(state.questions[action.payload.idx].options);
    },
  },
});

export const { getTitle, getDesc, getType, getQuestionTitle, getOpts } =
  questionSlice.actions;
export default questionSlice.reducer;
