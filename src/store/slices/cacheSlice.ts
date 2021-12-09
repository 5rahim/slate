import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Announcements, Units } from '@slate/generated/graphql'
import { GlobalState } from '@slate/store/index'

export interface CacheState {
   units: Units[] | null
   announcements: Announcements[] | null
   courseId: string | null
}

export const cacheState: CacheState = {
   units: null,
   announcements: null,
   courseId: null,
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
      empty: (state) => {
         state.units = null
         state.announcements = null
      }
   },
})

export const CacheActions = cacheSlice.actions

export const CacheSelectors = {
   readUnits: (state: GlobalState) => state.cache.units,
   readAnnouncements: (state: GlobalState) => state.cache.announcements,
   readCourseId: (state: GlobalState) => state.cache.courseId,
}


export default cacheSlice.reducer
