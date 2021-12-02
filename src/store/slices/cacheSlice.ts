import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Units } from '@slate/generated/graphql'
import { GlobalState } from '@slate/store/index'

export interface CacheState {
   units: Units[] | null,
}

export const cacheState: CacheState | {} = {
   units: false,
}

export const cacheSlice = createSlice({
   name: 'cache',
   initialState: cacheState as CacheState,
   reducers: {
      writeUnits: (state, action: PayloadAction<Units[] | null>) => {
         state.units = action.payload
      },
   },
})

export const CacheActions = cacheSlice.actions

export const CacheSelectors = {
   readUnits: (state: GlobalState) => state.cache.units,
}


export default cacheSlice.reducer
