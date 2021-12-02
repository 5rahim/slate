import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Units } from '@slate/generated/graphql'
import type { GlobalState } from '..'

interface UnitState {
   unit: Units | null,
   isAllowed: boolean
}

const unitState: UnitState = {
   unit: null,
   isAllowed: false,
}

export const unitSlice = createSlice({
   name: 'unit',
   initialState: unitState,
   reducers: {
      setUnit: (state, action: PayloadAction<Units>) => {
         state.unit = action.payload
      },
      setIsAllowed: (state, action: PayloadAction<boolean>) => {
         state.isAllowed = action.payload
      },
      
   },
})

export const UnitActions = unitSlice.actions

export const UnitSelectors = {
   getAll: (state: GlobalState) => state.unit,
   getUnit: (state: GlobalState) => state.unit.unit,
   isAllowed: (state: GlobalState) => state.unit.isAllowed,
}


export default unitSlice.reducer
