import store from '@slate/store/index'

/**
 * Redux middleware
 */

export const cacheMiddleware = ({ getState }: any) => {
   return (next: any) => (action: any) => {
      const result = next(action)
   
      if (action.type?.startsWith('user/')) {
         const state = store.getState().user
         localStorage.setItem('redux/user', JSON.stringify(state))
      }
      if (action.type?.startsWith('app/')) {
         const state = store.getState().app
         localStorage.setItem('redux/app', JSON.stringify(state))
         
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
      } else if (action.type?.includes('empty')) {
         localStorage.setItem('redux/cache', JSON.stringify({}))
         // localStorage.setItem('redux/course', JSON.stringify({}))
         localStorage.setItem('redux/unit', JSON.stringify({}))
      }
      return result
   }
}

export const loadCache = () => {
   try {
      let state: any = {}
      if (localStorage.getItem('redux/app') !== null) {
         state['app'] = JSON.parse(localStorage.getItem('redux/app') as string)
      }
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
         return state
      } else return undefined
   }
   catch (e) {
      return undefined
   }
}
