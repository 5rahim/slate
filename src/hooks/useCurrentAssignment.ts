import { CacheSelectors } from '@slate/store/slices/cacheSlice'
import { useSelector } from 'react-redux'

export const useCurrentAssignment = () => {
   return useSelector(CacheSelectors.readAssignment)
}
