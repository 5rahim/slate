import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GlobalState } from '@slate/store/index'


export interface AppState {
   mutationIsLoading: boolean,
   studentView: boolean,
}

export const appState: AppState | {} = {
   mutationIsLoading: false,
   studentView: false,
}


export const appSlice = createSlice({
   name: 'app',
   initialState: appState as AppState,
   reducers: {
      setMutationIsLoading: (state, action: PayloadAction<any>) => {
         state.mutationIsLoading = action.payload
      },
      setStudentView: (state, action: PayloadAction<any>) => {
         state.studentView = action.payload
      },
      toggleStudentView: (state) => {
         state.studentView = !state.studentView
      },
   },
})

export const AppActions = appSlice.actions

export const AppSelectors = {
   mutationIsLoading: (state: GlobalState) => state.app.mutationIsLoading,
   studentView: (state: GlobalState) => state.app.studentView
}


export default appSlice.reducer
