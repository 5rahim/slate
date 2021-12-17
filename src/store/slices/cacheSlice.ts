import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Announcements, GetCourseEnrollmentsQuery, Modules, Units } from '@slate/generated/graphql'
import { GlobalState } from '@slate/store/index'

export type ValidEnrollments = GetCourseEnrollmentsQuery['course_enrollment']

export interface CacheState {
   units: Units[] | null
   announcements: Announcements[] | null
   courseId: string | null
   modules: Modules[] | null
   enrollments: ValidEnrollments | null
}

export const cacheState: CacheState = {
   units: null,
   announcements: null,
   courseId: null,
   modules: null,
   enrollments: null
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
      empty: (state) => {
         state.units = null
         state.announcements = null
         state.enrollments = null
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
}


export default cacheSlice.reducer
