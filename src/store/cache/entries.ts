import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { CacheActions, CacheSelectors } from '@slate/store/slices/cacheSlice'
import { useSelector } from 'react-redux'

interface CacheEntries { [entry: string]: { read: any, write: ActionCreatorWithPayload<any> } }

export const getCacheEntries = (): CacheEntries => {
   
   return {
      units: {
         read: useSelector(CacheSelectors.readUnits),
         write: CacheActions.writeUnits,
      },
      announcements: {
         read: useSelector(CacheSelectors.readAnnouncements),
         write: CacheActions.writeAnnouncements,
      },
   }
   
}
