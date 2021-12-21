import { QueryLazyOptions } from '@apollo/client'
import { LazyQueryHookCreatorReturn } from '@slate/graphql/hooks/useLazyQueryHookCreator'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { useEffect } from 'react'
import { isEmpty } from '../utils'

export function useCachedLazyQuery<T>(entry: string, queryHook: LazyQueryHookCreatorReturn<T | null>) {
   
   const [fetch, fetched, loading, empty] = queryHook
   
   const cache = useStoreCache()
   
   useEffect(() => {
      !isEmpty(fetched) && cache.write(entry, fetched, loading) // todo: remove isEmpty
   }, [fetched, loading])
   
   return [
      (options?: ( QueryLazyOptions<any> | undefined )) => {
         fetch && fetch(options)
      },
      cache.read(entry, fetched),
      cache.isLoading(entry, fetched, loading),
      cache.isEmpty(entry, empty, loading),
   ] as [( (options?: ( QueryLazyOptions<any> | undefined )) => void ), T, boolean, boolean]
   
}
