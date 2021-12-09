import { QueryLazyOptions } from '@apollo/client'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { LazyQueryHookCreatorReturn } from '@slate/graphql/hooks/useLazyQueryHookCreator'
import { QueryHookCreatorReturn } from '@slate/graphql/hooks/useQueryHookCreator'
import { CacheActions, CacheSelectors } from '@slate/store/slices/cacheSlice'
import { CourseActions } from '@slate/store/slices/courseSlice'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


export function useCachedEntry<T>(entry: string, queryHook: QueryHookCreatorReturn<T | null>) {
   
   const [fetched, loading, empty] = queryHook
   
   const cache = useGlobalCache()
   
   useEffect(() => {
      cache.writeEntry(entry, fetched, loading)
   }, [fetched, loading])
   
   return [
      cache.readEntry(entry, fetched),
      cache.isEntryLoading(entry, fetched, loading),
      cache.hasNoEntry(entry, empty, loading),
   ] as [T, boolean, boolean]
   
}

export function useLazyCachedEntry<T>(entry: string, queryHook: LazyQueryHookCreatorReturn<T | null>) {
   
   const [fetch, fetched, loading, empty] = queryHook
   
   const cache = useGlobalCache()
   
   useEffect(() => {
      cache.writeEntry(entry, fetched, loading)
   }, [fetched, loading])
   
   return [
      (options?: ( QueryLazyOptions<any> | undefined )) => {
         fetch && fetch(options)
      },
      cache.readEntry(entry, fetched),
      cache.isEntryLoading(entry, fetched, loading),
      cache.hasNoEntry(entry, empty, loading),
   ] as [( (options?: ( QueryLazyOptions<any> | undefined )) => void ), T, boolean, boolean]
   
}


/**
 * @important This does not eliminate "unnecessary" requests. It is purely for UX purposes
 * It is a fake cache system to simulate Apollo's "cache-and-network" for the fetch policy
 * Use Redux to store fetched data so that we can display the "old" data before making a new request to the database
 * This allows us to bypass the loading state
 */
export const useGlobalCache = () => {
   const dispatch = useDispatch()
   const router = useRouter()
   const cachedCourseId = useSelector(CacheSelectors.readCourseId)
   
   const { course_id } = router.query
   
   const readObject = useCallback((cachedObject: any, fetchedObject: any) => {
      if (cachedCourseId !== course_id) {
         return fetchedObject
      } else {
         return isEmpty(cachedObject) ? fetchedObject : cachedObject
      }
   }, [cachedCourseId, course_id])
   
   /**
    *
    * Cache entries
    *
    */
   
   const objects: { [entry: string]: { read: any, write: ActionCreatorWithPayload<any> } } = {
      units: {
         read: useSelector(CacheSelectors.readUnits),
         write: CacheActions.writeUnits,
      },
      announcements: {
         read: useSelector(CacheSelectors.readAnnouncements),
         write: CacheActions.writeAnnouncements,
      },
   }
   
   return {
      readEntry: (entry: string, fetched?: any) => {
         return readObject(objects[entry].read, fetched)
      },
      writeEntry: (entry: string, fetched: any, loading: boolean) => {
         if (!loading) {
            dispatch(objects[entry].write(fetched))
         }
      },
      hasNoEntry: (entry: string, empty: boolean, loading: boolean) => {
         return isEmpty(objects[entry].read) && isDataEmpty(empty, loading)
      },
      isEntryLoading: (entry: string, fetched: any, loading?: boolean) => {
         if (isEmpty(objects[entry].read) && loading) {
            return loading
         }
         return false
      },
   }
}


export const useGlobalCacheConfig = () => {
   const dispatch = useDispatch()
   const router = useRouter()
   const { course_id } = router.query
   const cachedCourseId = useSelector(CacheSelectors.readCourseId)
   useEffect(() => {
      dispatch(CacheActions.writeCourseId(course_id ? course_id as string : null))
      /**
       * Empty the cache when we switch courses
       */
      console.log()
      if (!!course_id && cachedCourseId !== course_id) {
         dispatch(CacheActions.empty())
      }
      /**
       * Empty course course cache if there's no course_id
       */
      if(!course_id) {
         dispatch(CourseActions.empty())
      }
   }, [course_id, cachedCourseId])
}


function isEmpty(obj: any) {
   if (!obj)
      return true
   if (typeof obj === 'object') {
      return !obj ? true : Object.keys(obj).length === 0
   } else if (Array.isArray(obj)) {
      return !!obj ? obj.length > 0 : true
   } else {
      return true
   }
}

function hasObject(cachedObject: any, fetchedObject: any) {
   return !isEmpty(isEmpty(cachedObject) ? fetchedObject : cachedObject)
}

function isDataEmpty(empty: boolean, loading: boolean) {
   if (!loading) {
      return empty
   }
   return false
}
