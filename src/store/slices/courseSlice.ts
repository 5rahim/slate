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
   courseState,
} from '../states/courseState'
import { SlateCourse } from '../../graphql/types/Course'


export const courseSlice = createSlice({
   name: 'course',
   initialState: courseState as SlateCourse,
   reducers: {
      set: (state, action: PayloadAction<any>) => {
         return action.payload
      },
   },
})

export const CourseActions = courseSlice.actions

export const CourseSelectors = {
   get: (state: GlobalState) => state.course,
}


export default courseSlice.reducer
