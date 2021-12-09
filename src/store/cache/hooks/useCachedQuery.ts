import { QueryHookCreatorReturn } from '@slate/graphql/hooks/useQueryHookCreator'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { useEffect } from 'react'

export function useCachedQuery<T>(entry: string, queryHook: QueryHookCreatorReturn<T | null>) {
   
   const [fetched, loading, empty] = queryHook
   
   const cache = useStoreCache()
   
   useEffect(() => {
      cache.write(entry, fetched, loading)
   }, [fetched, loading])
   
   return [
      cache.read(entry, fetched),
      cache.isLoading(entry, fetched, loading),
      cache.isEmpty(entry, empty, loading),
   ] as [T, boolean, boolean]
   
}
