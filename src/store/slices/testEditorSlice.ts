import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Gradebook_Items, Test_Questions, Tests } from '@slate/generated/graphql'
import { GlobalState } from '@slate/store/index'

interface TestEditorState {
   test: Tests | null
   testQuestions: Test_Questions[]
   gradebookItem: Gradebook_Items | null
}

const testEditorState: TestEditorState = {
   test: null,
   testQuestions: [],
   gradebookItem: null,
}

export const testEditorSlice = createSlice({
   name: 'testEditor',
   initialState: testEditorState,
   reducers: {
      setGradebookItem: (state, action: PayloadAction<Gradebook_Items | null>) => {
         state.gradebookItem = action.payload
         state.test = action.payload?.test ?? null
      },
      setTestQuestions: (state, action: PayloadAction<Test_Questions[]>) => {
         state.testQuestions = action.payload
      },


   },
})

export const TestEditorActions = testEditorSlice.actions

export const TestEditorSelectors = {
   getTestQuestionCount: (state: GlobalState) => state.testEditor.testQuestions.length,
   getTestQuestionTotalPoints: (state: GlobalState) => {
      return state.testEditor.testQuestions?.reduce((a, b) => {
         return Number(a) +  Number(b.question?.content.points)
      }, 0)
   },
   getTest: (state: GlobalState) => state.testEditor.test,
   getGradebookItem: (state: GlobalState) => state.testEditor.gradebookItem,
}


export default testEditorSlice.reducer
