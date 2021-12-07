import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { Users } from '@slate/generated/graphql'
import { SlateUser } from '@slate/types/User'

import type { GlobalState } from '..'

type UserSettingsState = Pick<SlateUser, 'hour_format' | 'date_format'> | null

interface UserState {
   user: any | null,
   settings: UserSettingsState
}

const userState: UserState = {
   user: null,
   settings: null
}

export const userSlice = createSlice({
   name: 'user',
   initialState: userState,
   reducers: {
      setUser: (state, action: PayloadAction<any>) => {
         state.user = action.payload
      },
      setSettings: (state, action: PayloadAction<UserSettingsState>) => {
         state.settings = action.payload
      },
   },
})

export const UserActions = userSlice.actions

export const UserSelectors = {
   getUser: (state: GlobalState) => state.user.user as any,
   getSettings: (state: GlobalState) => state.user.settings
}


export default userSlice.reducer
