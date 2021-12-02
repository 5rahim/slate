import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Courses } from '@slate/generated/graphql'

import type { GlobalState } from '..'

interface CourseState {
   course: Courses | null,
   isEnrolled: boolean
}

const courseState: CourseState = {
   course: null,
   isEnrolled: false,
}

export const courseSlice = createSlice({
   name: 'course',
   initialState: courseState,
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
   isEnrolled: (state: GlobalState) => state.course.isEnrolled,
}


export default courseSlice.reducer
