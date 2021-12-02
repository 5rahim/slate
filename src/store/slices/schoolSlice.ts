import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { GlobalState } from '..'

// TODO: Do typing
type SchoolState = any

export const schoolSlice = createSlice({
   name: 'school',
   initialState: null as SchoolState,
   reducers: {
      set: (state, action: PayloadAction<any>) => {
         return action.payload
      },
   },
})

export const SchoolActions = schoolSlice.actions

export const SchoolSelectors = {
   getName: (state: GlobalState) => state.school?.name,
   getIID: (state: GlobalState) => state.school?.short_name,
   getSchool: (state: GlobalState) => state.school
}


export default schoolSlice.reducer
