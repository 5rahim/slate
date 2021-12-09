import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import cacheReducer from './slices/cacheSlice'
import courseReducer from './slices/courseSlice'
import schoolReducer from './slices/schoolSlice'
import unitReducer from './slices/unitSlice'
import userReducer from './slices/userSlice'


//MIDDLEWARE
const localStorageMiddleware = ({ getState }: any) => {
   return (next: any) => (action: any) => {
      // console.log(action)
      const result = next(action)
      if (action.type?.startsWith('user/')) {
         const state = store.getState().user
         localStorage.setItem('redux/user', JSON.stringify(state))
         
      } else if (action.type?.startsWith('cache/') && !action.type?.includes('empty')) {
         const state = store.getState().cache
         localStorage.setItem('redux/cache', JSON.stringify(state))
         
      } else if (action.type?.startsWith('course/')) {
         const state = store.getState().course
         localStorage.setItem('redux/course', JSON.stringify(state))
         
      } else if (action.type?.startsWith('unit/')) {
         const state = store.getState().unit
         localStorage.setItem('redux/unit', JSON.stringify(state))
         
      } else if (action.type?.startsWith('school/')) {
         const state = store.getState().school
         localStorage.setItem('redux/school', JSON.stringify(state))
      }
      if (action.type?.includes('empty')) {
         localStorage.setItem('redux/cache', JSON.stringify({}))
         localStorage.setItem('redux/course', JSON.stringify({}))
         localStorage.setItem('redux/unit', JSON.stringify({}))
         localStorage.setItem('redux/school', JSON.stringify({}))
      }
      // localStorage.setItem('applicationState', JSON.stringify(getState()))
      return result
   }
}

const reHydrateStore = () => {
   try {
      let state: any = {}
      if (localStorage.getItem('redux/user') !== null) {
         state['user'] = JSON.parse(localStorage.getItem('redux/user') as string)
      }
      if (localStorage.getItem('redux/cache') !== null) {
         state['cache'] = JSON.parse(localStorage.getItem('redux/cache') as string)
      }
      if (localStorage.getItem('redux/unit') !== null) {
         state['unit'] = JSON.parse(localStorage.getItem('redux/unit') as string)
      }
      if (localStorage.getItem('redux/school') !== null) {
         state['school'] = JSON.parse(localStorage.getItem('redux/school') as string)
      }
      if (localStorage.getItem('redux/course') !== null) {
         state['course'] = JSON.parse(localStorage.getItem('redux/course') as string)
      }
      if (state) {
         console.log(state)
         return state
      } else return undefined
   } catch (e) {
      return undefined
   }
}

const store = configureStore({
   reducer: {
      school: schoolReducer,
      user: userReducer,
      course: courseReducer,
      app: appReducer,
      cache: cacheReducer,
      unit: unitReducer,
   },
   preloadedState: reHydrateStore(),
   middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(localStorageMiddleware)
   },
})

export type GlobalState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
   GlobalState,
   unknown,
   Action<string>>

export default store
