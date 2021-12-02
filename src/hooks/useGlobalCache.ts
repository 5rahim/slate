import { Announcements, Units } from '@slate/generated/graphql'
import { CacheActions, CacheSelectors } from '@slate/store/slices/cacheSlice'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function isEmpty(obj: any) {
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



export const useGlobalCache = () => {
   const dispatch = useDispatch()
   const units: Units[] | null = useSelector(CacheSelectors.readUnits)
   const announcements: Announcements[] | null = useSelector(CacheSelectors.readAnnouncements)
   const router = useRouter()
   const cachedCourseId = useSelector(CacheSelectors.readCourseId)
   
   const { course_id } = router.query
   
   useEffect(() => {
      dispatch(CacheActions.writeCourseId(course_id ? course_id as string : null))
      if(cachedCourseId !== course_id) {
         dispatch(CacheActions.empty())
      }
   }, [course_id, cachedCourseId])
   
   function readObject(cachedObject: any, fetchedObject: any) {
      if(cachedCourseId !== course_id) {
         return fetchedObject
      } else {
         return isEmpty(cachedObject) ? fetchedObject : cachedObject
      }
   }
   
   return {
      
      /** Units **/
      writeUnits: (fetched: Units[] | null, loading: boolean): void => {
         if (!loading) {
            dispatch(CacheActions.writeUnits(fetched))
         }
      },
      readUnits: (fetched: Units[] | null): Units[] | null => {
         return readObject(units, fetched)
      },
      /** Announcements **/
      writeAnnouncements: (fetched: Announcements[] | null, loading: boolean): void => {
         if (!loading) {
            dispatch(CacheActions.writeAnnouncements(fetched))
         }
      },
      readAnnouncements: (fetched: Announcements[] | null): Announcements[] | null => {
         return readObject(announcements, fetched)
      },
      
      
      isDataLoading: (fetched: any, loading: boolean) => {
         if (isEmpty(units) && loading) {
            return loading
         }
         return false
      },
      isDataEmpty: (empty: boolean, loading: boolean) => {
         if (!loading) {
            return empty
         }
         return false
      },
   }
}
