import {
   createAsyncThunk,
   createSlice,
   PayloadAction,
} from '@reduxjs/toolkit'

import type {
   AppState,
   AppThunk,
} from '..'
import {
   SchoolState,
   schoolState,
} from '../states/schoolState'


export const schoolSlice = createSlice({
   name: 'school',
   initialState: schoolState as SchoolState,
   reducers: {
      set: (state, action: PayloadAction<any>) => {
         return action.payload
      },
   },
})

export const SchoolActions = schoolSlice.actions

export const SchoolSelectors = {
   getName: (state: AppState) => state.school?.name,
   getIID: (state: AppState) => state.school?.short_name
}


export default schoolSlice.reducer
