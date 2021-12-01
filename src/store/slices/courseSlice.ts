import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SlateCourse } from '@slate/types/Course'

import type { GlobalState } from '..'


export const courseSlice = createSlice({
   name: 'course',
   initialState: { course: null, isEnrolled: false } as { course: SlateCourse | null, isEnrolled: boolean },
   reducers: {
      set: (state, action: PayloadAction<any>) => {
         state.course = action.payload
      },
      setIsEnrolled: (state, action: PayloadAction<boolean>) => {
         state.isEnrolled = action.payload
      },
      
   },
})

export const CourseActions = courseSlice.actions

export const CourseSelectors = {
   getAll: (state: GlobalState) => state.course,
   getCourse: (state: GlobalState) => state.course.course,
   isEnrolled: (state: GlobalState) => state.course.isEnrolled
}


export default courseSlice.reducer
