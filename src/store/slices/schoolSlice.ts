import {
   createAsyncThunk,
   createSlice,
   PayloadAction,
} from '@reduxjs/toolkit'

import type {
   GlobalState,
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
   getName: (state: GlobalState) => state.school?.name,
   getIID: (state: GlobalState) => state.school?.short_name
}


export default schoolSlice.reducer
