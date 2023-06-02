import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface QuestionState {
  questionTitle: string;
  questionType: string;
  options: string[];
  essential: boolean;
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

interface EssentialState {
  essential: boolean;
  idx: number;
}

const initialState: SurveyState = {
  title: '제목 없는 설문지',
  desc: '설문지 설명',
  questions: [
    {
      questionTitle: '',
      questionType: '단답형',
      options: ['옵션 1'],
      essential: false,
    },
  ],
};

export const questionSlice = createSlice({
  name: 'survey',
  initialState: initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDesc: (state, action: PayloadAction<string>) => {
      state.desc = action.payload;
    },
    setType: (state, action: PayloadAction<TypeState>) => {
      state.questions[action.payload.idx].questionType = action.payload.str;
    },
    setQuestionTitle: (state, action: PayloadAction<TypeState>) => {
      state.questions[action.payload.idx].questionTitle = action.payload.str;
    },
    setOpts: (state, action: PayloadAction<OptionsState>) => {
      state.questions[action.payload.idx].options = action.payload.options;
    },
    setEssential: (state, action: PayloadAction<EssentialState>) => {
      state.questions[action.payload.idx].essential = action.payload.essential;
    },
    copyQuestion: (state, action: PayloadAction<number>) => {
      state.questions.push(state.questions[action.payload]);
    },
    deleteQuestion: (state, action: PayloadAction<number>) => {
      state.questions.splice(action.payload, 1);
    },
  },
});

export const {
  setTitle,
  setDesc,
  setType,
  setQuestionTitle,
  setOpts,
  setEssential,
  copyQuestion,
  deleteQuestion,
} = questionSlice.actions;
export default questionSlice.reducer;
