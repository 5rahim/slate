import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Announcements, Assignments, GetCourseEnrollmentsQuery, Gradebook_Items, Modules, Units } from '@slate/generated/graphql'
import { GlobalState } from '@slate/store/index'

export type ValidEnrollments = GetCourseEnrollmentsQuery['course_enrollment']

export interface CacheState {
   units: Units[] | null
   announcements: Announcements[] | null
   courseId: string | null
   modules: Modules[] | null
   enrollments: ValidEnrollments | null
   gradebookItems: Gradebook_Items[] | null
   assignment: Assignments | null
}

export const cacheState: CacheState = {
   units: null,
   announcements: null,
   courseId: null,
   modules: null,
   enrollments: null,
   gradebookItems: null,
   assignment: null
}

export const cacheSlice = createSlice({
   name: 'cache',
   initialState: cacheState as CacheState,
   reducers: {
      writeUnits: (state, action: PayloadAction<Units[] | null>) => {
         state.units = action.payload
      },
      writeAnnouncements: (state, action: PayloadAction<Announcements[] | null>) => {
         state.announcements = action.payload
      },
      writeCourseId: (state, action: PayloadAction<string | null>) => {
         state.courseId = action.payload
      },
      writeModules: (state, action: PayloadAction<Modules[] | null>) => {
         state.modules = action.payload
      },
      writeEnrollments: (state, action: PayloadAction<ValidEnrollments | null>) => {
         state.enrollments = action.payload
      },
      writeGradebookItems: (state, action: PayloadAction<Gradebook_Items[] | null>) => {
         state.gradebookItems = action.payload
      },
      writeAssignment: (state, action: PayloadAction<Assignments | null>) => {
         state.assignment = action.payload
      },
      empty: (state) => {
         state.units = null
         state.announcements = null
         state.enrollments = null
         state.gradebookItems = null
         state.assignment = null
      }
   },
})

export const CacheActions = cacheSlice.actions

export const CacheSelectors = {
   readUnits: (state: GlobalState) => state.cache.units,
   readAnnouncements: (state: GlobalState) => state.cache.announcements,
   readModules: (state: GlobalState) => state.cache.modules,
   readCourseId: (state: GlobalState) => state.cache.courseId,
   readEnrollments: (state: GlobalState) => state.cache.enrollments,
   readGradebookItems: (state: GlobalState) => state.cache.gradebookItems,
   readAssignment: (state: GlobalState): Assignments | null => state.cache.assignment,
}


export default cacheSlice.reducer
