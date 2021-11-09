import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SlateCourse } from '@slate/types/Course'

import type { GlobalState } from '..'
import { courseState } from '../states/courseState'


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
