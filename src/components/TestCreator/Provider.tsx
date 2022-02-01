import { Questions, Test_Questions } from '@slate/generated/graphql'
import React, { createContext } from 'react'

interface TestCreatorQuestionStates {
   testQuestion: Test_Questions | null
   data: Questions | null
   currentContent: any
   savedContent: any
}

const initialState: TestCreatorQuestionStates = {
   testQuestion: null,
   data: null,
   currentContent: {},
   savedContent: {}
}

type Action = { type: string, payload: any }
type Dispatch = (action: Action) => void

// const TestCreatorContext: any = createContext<TestCreatorQuestionStates>(initialState)

type ContextType = {
   state: TestCreatorQuestionStates
   questionDispatch: Dispatch
   testQuestion: TestCreatorQuestionStates['testQuestion']
   currentContent: TestCreatorQuestionStates['currentContent']
   savedContent: TestCreatorQuestionStates['savedContent']
   setTestQuestion: (data: Test_Questions) => void
   updateSavedContent: (content: any) => void
   updateDescription: (content: string) => void
   updateChoices: (content: any) => void
   updateAdditionalChoices: (content: any) => void
   updatePoints: (content: number) => void
   updateAnswerKeys: (content: any) => void
   updateStatus: (content: string) => void
   updatePartialCredit: (content: boolean) => void
   isTouched: boolean
   status: 'valid' | 'invalid'
} | undefined

const TestCreatorContext = createContext<ContextType>(undefined)

function textCreatorReducer(state: any, action: Action) {
   switch (action.type) {
      case 'SET_TEST_QUESTION': {
         return { ...state, testQuestion: action.payload }
      }
      case 'SET_DATA': {
         return { ...state, data: action.payload }
      }
      case 'UPDATE_SAVED_CONTENT': {
         return { ...state, savedContent: action.payload, currentContent: action.payload }
      }
      case 'UPDATE_DESCRIPTION': {
         return { ...state, currentContent: { ...state.currentContent, description: action.payload } }
      }
      case 'UPDATE_CHOICES': {
         return { ...state, currentContent: { ...state.currentContent, choices: action.payload } }
      }
      case 'UPDATE_ADDITIONAL_CHOICES': {
         return { ...state, currentContent: { ...state.currentContent, additional_choices: action.payload } }
      }
      case 'UPDATE_POINTS': {
         return { ...state, currentContent: { ...state.currentContent, points: action.payload } }
      }
      case 'UPDATE_ANSWER_KEYS': {
         return { ...state, currentContent: { ...state.currentContent, answer_keys: action.payload } }
      }
      case 'UPDATE_STATUS': {
         return { ...state, currentContent: { ...state.currentContent, status: action.payload } }
      }
      case 'UPDATE_PARTIAL_CREDIT': {
         return { ...state, currentContent: { ...state.currentContent, partial_credit: action.payload } }
      }
      default: {
         throw new Error(`Unhandled action type: ${action.type}`)
      }
   }
}

export function TestCreatorQuestionProvider({ children }: any) {
   const [state, questionDispatch] = React.useReducer(textCreatorReducer, initialState)
   const value = {
      state,
      questionDispatch,
      testQuestion: state.testQuestion,
      currentContent: state.currentContent,
      savedContent: state.savedContent,
      status: state.currentContent.status,
      setTestQuestion: (data: Test_Questions) => {
         questionDispatch({ type: 'SET_TEST_QUESTION', payload: data })
      },
      updateSavedContent: (content: any) => {
         questionDispatch({ type: 'UPDATE_SAVED_CONTENT', payload: content })
      },
      updateDescription: (content: any) => {
         questionDispatch({ type: 'UPDATE_DESCRIPTION', payload: content })
      },
      updateChoices: (content: any) => {
         questionDispatch({ type: 'UPDATE_CHOICES', payload: content })
      },
      updateAdditionalChoices: (content: any) => {
         questionDispatch({ type: 'UPDATE_ADDITIONAL_CHOICES', payload: content })
      },
      updatePoints: (content: any) => {
         questionDispatch({ type: 'UPDATE_POINTS', payload: content })
      },
      updateAnswerKeys: (content: any) => {
         questionDispatch({ type: 'UPDATE_ANSWER_KEYS', payload: content })
      },
      updateStatus: (content: string) => {
         questionDispatch({ type: 'UPDATE_STATUS', payload: content })
      },
      updatePartialCredit: (content: boolean) => {
         questionDispatch({ type: 'UPDATE_PARTIAL_CREDIT', payload: content })
      },
      isTouched: JSON.stringify(state.savedContent) !== JSON.stringify(state.currentContent)
      
   }
   return <TestCreatorContext.Provider value={value}>{children}</TestCreatorContext.Provider>
}

export function useTestCreatorQuestion() {
   const context = React.useContext<ContextType>(TestCreatorContext)
   if (context === undefined) {
      throw new Error('useTestCreator must be used within a TestCreatorProvider')
   }
   return context
}
