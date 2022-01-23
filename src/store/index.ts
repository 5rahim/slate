import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { cacheMiddleware, loadCache } from '@slate/store/cache/middleware'
import testEditorSlice from '@slate/store/slices/testEditorSlice'
import appReducer from './slices/appSlice'
import cacheReducer from './slices/cacheSlice'
import courseReducer from './slices/courseSlice'
import schoolReducer from './slices/schoolSlice'
import unitReducer from './slices/unitSlice'
import userReducer from './slices/userSlice'


const store = configureStore({
   reducer: {
      school: schoolReducer,
      user: userReducer,
      course: courseReducer,
      app: appReducer,
      cache: cacheReducer,
      unit: unitReducer,
      testEditor: testEditorSlice,
   },
   preloadedState: loadCache(),
   middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(cacheMiddleware)
   },
})

export type GlobalState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
   GlobalState,
   unknown,
   Action<string>>

export default store
