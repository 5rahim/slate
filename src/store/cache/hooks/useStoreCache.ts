import { getCacheEntries } from '@slate/store/cache/entries'
import { CacheSelectors } from '@slate/store/slices/cacheSlice'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isDataEmpty, isEmpty } from '../utils'

/**
 * @important This does not eliminate "unnecessary" requests. It is purely for UX purposes
 * It is a cache system modeled after React Relay's "store-and-network" fetch policy
 */
export const useStoreCache = () => {
   const dispatch = useDispatch()
   const router = useRouter()
   const cachedCourseId = useSelector(CacheSelectors.readCourseId)
   
   const { course_id } = router.query
   
   // Not sure if necessary but works either way
   // Return fetched object instead of cached one when course changes
   const readObject = useCallback(<T>(cachedObject: any, fetchedObject: any): T => {
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
   
   const objects = getCacheEntries()
   
   return {
      /**
       * @example
       * cache.read('units') -> returns cached units
       * cache.read('announcements', fetchedAnnouncements) -> returns cached units OR fetchedAnnouncements when no cache entry exists
       * @param {string} entry
       * @param fetched
       * @returns {any}
       */
      read: <T>(entry: string, fetched?: any) => {
         return readObject<T>(objects[entry].read, fetched)
      },
      /**
       * Updates the entry (typically after a request)
       * This is automatically done by useCachedQuery and useCachedLazyQuery
       * @param {string} entry
       * @param fetched
       * @param {boolean} loading
       */
      write: (entry: string, fetched: any, loading: boolean) => {
         if (!loading) {
            dispatch(objects[entry].write(fetched))
         }
      },
      /**
       * Empty the entry (typically after a request)
       * @param {string} entry
       * @param fetched
       * @param {boolean} loading
       */
      empty: (entry: string) => {
         dispatch(objects[entry].write(null))
      },
      /**
       * Return Apollo's `empty` indicator when the cache is empty AND after the request has been made
       * @param {string} entry
       * @param {boolean} empty
       * @param {boolean} loading
       * @returns {boolean}
       */
      isEmpty: (entry: string, empty: boolean, loading: boolean) => {
         return isEmpty(objects[entry].read) && isDataEmpty(empty, loading)
      },
      /**
       * Show loading indicator only when the cache is empty AND there's a request being done
       * @param {string} entry
       * @param fetched
       * @param {boolean} loading
       * @returns {boolean}
       */
      isLoading: (entry: string, fetched: any, loading?: boolean) => {
         if (isEmpty(objects[entry].read) && loading) {
            return loading
         }
         return false
      },
   }
}
