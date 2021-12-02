import { Announcements, Units } from '@slate/generated/graphql'
import { CacheActions, CacheSelectors } from '@slate/store/slices/cacheSlice'
import { useDispatch, useSelector } from 'react-redux'

function isEmpty(obj: any) {
   if(typeof obj === 'object') {
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

function readObject(cachedObject: any, fetchedObject: any) {
   return isEmpty(cachedObject) ? fetchedObject : cachedObject
}

export const useGlobalCache = () => {
   const dispatch = useDispatch()
   const units: Units[] | null = useSelector(CacheSelectors.readUnits)
   const announcements: Announcements[] | null = useSelector(CacheSelectors.readAnnouncements)
   return {
   
      /** Units **/
      writeUnits: (fetched: Units[] | null): void => {
         if(!isEmpty(fetched)) {
            dispatch(CacheActions.writeUnits(fetched))
         }
      },
      readUnits: (fetched: Units[] | null): Units[] | null => {
         return readObject(units, fetched)
      },
      /** Announcements **/
      writeAnnouncements: (fetched: Announcements[] | null): void => {
         if(!isEmpty(fetched)) {
            dispatch(CacheActions.writeAnnouncements(fetched))
         }
      },
      readAnnouncements: (fetched: Announcements[] | null): Announcements[] | null => {
         return readObject(announcements, fetched)
      },
      
      
      isDataLoading: (fetched: any, loading: boolean) => {
         if(isEmpty(units) && isEmpty(fetched)) {
            return loading
         }
         return false
      },
      isDataEmpty: (fetched: any, empty: boolean) => {
         if(isEmpty(units) && isEmpty(fetched)) {
            return empty
         }
         return false
      }
   }
}
