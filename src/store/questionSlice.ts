import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface QuestionState {
  questionTitle: string;
  questionType: string;
  id: string;
  options: string[];
  essential: boolean;
}

interface SurveyState {
  title: string;
  desc: string;
  status: 'home' | 'preview' | 'result';
  focus: number;
  draggable: boolean;
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

interface DndState {
  x: number;
  y: number;
}

const initialState: SurveyState = {
  title: '제목 없는 설문지',
  desc: '설문지 설명',
  status: 'home',
  focus: 0,
  draggable: false,
  questions: [
    {
      questionTitle: '',
      questionType: '단답형',
      id: Math.random().toString(36).substring(7),
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
    setEssential: (state, action: PayloadAction<number>) => {
      state.questions[action.payload].essential =
        !state.questions[action.payload].essential;
    },
    copyQuestion: (state) => {
      const copyQuest = { ...state.questions[state.focus] };
      copyQuest.id = Math.random().toString(36).substring(7);
      state.questions.splice(state.focus + 1, 0, copyQuest);
      state.focus += 1;
    },
    deleteQuestion: (state) => {
      state.questions.splice(state.focus, 1);
      if (state.questions.length === state.focus) {
        state.focus -= 1;
      }
    },
    setNewQuestion: (state) => {
      const newQuest = { ...initialState.questions[0] };
      newQuest.id = Math.random().toString(36).substring(7);
      state.questions.splice(state.focus + 1, 0, newQuest);
      state.focus += 1;
    },
    focusOn: (state, action: PayloadAction<number>) => {
      state.focus = action.payload;
    },
    changeIdx: (state, action: PayloadAction<DndState>) => {
      const [a, b] = [action.payload.x, action.payload.y];
      const temp = { ...state.questions[a] };
      state.questions[a] = state.questions[b];
      state.questions[b] = temp;
    },
    setDragMod: (state, action: PayloadAction<boolean>) => {
      state.draggable = action.payload;
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
  setNewQuestion,
  focusOn,
  changeIdx,
  setDragMod,
} = questionSlice.actions;
export default questionSlice.reducer;
