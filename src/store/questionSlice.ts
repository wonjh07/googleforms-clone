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
  oIdx: number;
  name: string;
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
    changeOpts: (state, action: PayloadAction<OptionsState>) => {
      state.questions[state.focus].options[action.payload.oIdx] =
        action.payload.name;
    },
    removeOpts: (state, action: PayloadAction<number>) => {
      state.questions[state.focus].options.splice(action.payload, 1);
    },
    newOpts: (state) => {
      const num = state.questions[state.focus].options.length + 1;
      state.questions[state.focus].options.push(`옵션 ${num}`);
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
    dragQuest: (state, action: PayloadAction<DndState>) => {
      const [a, b] = [action.payload.x, action.payload.y];
      const temp = { ...state.questions[a] };
      state.questions[a] = state.questions[b];
      state.questions[b] = temp;
    },
    dragOption: (state, action: PayloadAction<DndState>) => {
      const [a, b] = [action.payload.x, action.payload.y];
      const temp = state.questions[state.focus].options[a];
      state.questions[state.focus].options[a] =
        state.questions[state.focus].options[b];
      state.questions[state.focus].options[b] = temp;
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
  changeOpts,
  newOpts,
  removeOpts,
  setEssential,
  copyQuestion,
  deleteQuestion,
  setNewQuestion,
  focusOn,
  dragQuest,
  dragOption,
  setDragMod,
} = questionSlice.actions;
export default questionSlice.reducer;
