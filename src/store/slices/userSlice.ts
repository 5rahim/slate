import {
   createAsyncThunk,
   createSlice,
   PayloadAction,
} from '@reduxjs/toolkit'

import type {
   GlobalState,
   AppThunk,
} from '..'
import {
   userState,
} from '../states/userState'
import SlateUser from '../../graphql/types/User'


export const userSlice = createSlice({
   name: 'user',
   initialState: userState as SlateUser,
   reducers: {
      set: (state, action: PayloadAction<any>) => {
         return action.payload
      },
   },
})

export const UserActions = userSlice.actions

export const UserSelectors = {
   get: (state: GlobalState) => state.user,
}


export default userSlice.reducer
