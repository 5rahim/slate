import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Modules, Units } from '@slate/generated/graphql'
import type { GlobalState } from '..'

interface UnitState {
   unit: Units | null,
   isAllowed: boolean,
   openedFolder: Modules | null,
   shouldOpenFolder: Modules | null
}

const unitState: UnitState = {
   unit: null,
   isAllowed: false,
   openedFolder: null,
   shouldOpenFolder: null
}

export const unitSlice = createSlice({
   name: 'unit',
   initialState: unitState,
   reducers: {
      setUnit: (state, action: PayloadAction<Units | null>) => {
         state.unit = action.payload
      },
      setIsAllowed: (state, action: PayloadAction<boolean>) => {
         state.isAllowed = action.payload
      },
      setOpenedFolder: (state, action: PayloadAction<Modules | null>) => {
         state.openedFolder = action.payload
      },
      setShouldOpenFolder: (state, action: PayloadAction<Modules | null>) => {
         state.shouldOpenFolder = action.payload
      },
   },
})

export const UnitActions = unitSlice.actions

export const UnitSelectors = {
   getAll: (state: GlobalState) => state.unit,
   getUnit: (state: GlobalState) => state.unit.unit,
   isAllowed: (state: GlobalState) => state.unit.isAllowed,
   openedFolder: (state: GlobalState) => state.unit.openedFolder,
   shouldOpenFolder: (state: GlobalState) => state.unit.shouldOpenFolder
}


export default unitSlice.reducer
