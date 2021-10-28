import {
   configureStore,
   ThunkAction,
   Action,
} from '@reduxjs/toolkit'

import counterReducer from './slices/counterSlice'
import schoolReducer from './slices/schoolSlice'
import userReducer from './slices/userSlice'
import courseReducer from './slices/courseSlice'

const store = configureStore({
   reducer: { counter: counterReducer, school: schoolReducer, user: userReducer, course: courseReducer },
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
   AppState,
   unknown,
   Action<string>>

export default store
