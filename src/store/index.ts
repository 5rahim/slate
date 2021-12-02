import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import cacheReducer from './slices/cacheSlice'

import courseReducer from './slices/courseSlice'
import schoolReducer from './slices/schoolSlice'
import userReducer from './slices/userSlice'

const store = configureStore({
   reducer: {
      school: schoolReducer,
      user: userReducer,
      course: courseReducer,
      app: appReducer,
      cache: cacheReducer
   },
})

export type GlobalState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
   GlobalState,
   unknown,
   Action<string>>

export default store
