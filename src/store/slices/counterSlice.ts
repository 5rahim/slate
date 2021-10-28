import {
   createAsyncThunk,
   createSlice,
   PayloadAction,
} from '@reduxjs/toolkit'

import type {
   AppState,
   AppThunk,
}                       from '..'
import { fetchCount }   from '../../features/counter/counterAPI'
import {
   CounterState,
   counterState,
} from '../states/counterState'

export const incrementAsync = createAsyncThunk(
   'counter/fetchCount',
   async (amount: number) => {
      const response = await fetchCount(amount)
      return response.data
   },
)

export const counterSlice = createSlice({
   name: 'counter',
   initialState: counterState as CounterState,
   reducers: {
      increment: (state) => {
         state.value += 1
      },
      decrement: (state) => {
         state.value -= 1
      },
      incrementByAmount: (state, action: PayloadAction<number>) => {
         state.value += action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(incrementAsync.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(incrementAsync.fulfilled, (state, action) => {
            state.status = 'idle'
            state.value += action.payload
         })
   },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const selectCount = (state: AppState) => state.counter.value

export const incrementIfOdd = (amount: number): AppThunk => (
   dispatch,
   getState,
) => {
   const currentValue = selectCount(getState())
   if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount))
   }
}

export default counterSlice.reducer
