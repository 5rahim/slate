import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GlobalState } from '@slate/store/index'
import { AppState, appState } from '../states/appState'


export const appSlice = createSlice({
   name: 'app',
   initialState: appState as AppState,
   reducers: {
      setMutationIsLoading: (state, action: PayloadAction<any>) => {
         state.mutationIsLoading = action.payload
      },
   },
})

export const AppActions = appSlice.actions

export const AppSelectors = {
   mutationIsLoading: (state: GlobalState) => state.app.mutationIsLoading,
}


export default appSlice.reducer
