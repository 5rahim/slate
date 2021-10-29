import fetch from 'isomorphic-unfetch'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { ApolloClient, DefaultOptions, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist'
import { WebSocketLink } from '@apollo/client/link/ws'

const createHttpLink = (): HttpLink => {
   const httpLink = new HttpLink({
      uri: `https://${process.env.NEXT_PUBLIC_API_HOST}`,
      credentials: 'include',
      fetch,
      headers: {
         // 'x-hasura-role': 'user',
         // 'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET
      },
   })
   return httpLink
}

const createWSLink = (): WebSocketLink => {
   return new WebSocketLink(
      new SubscriptionClient(`wss://${process.env.NEXT_PUBLIC_API_HOST}`, {
         lazy: true,
         reconnect: true,
      }),
   )
}

const cache: any = new InMemoryCache()
typeof window !== 'undefined' && persistCache({
   cache,
   storage: new LocalStorageWrapper(window.localStorage),
})

export default function createApolloClient(initialState: any, header: any) {
   
   
   const ssrMode = typeof window === 'undefined'
   let link
   if (ssrMode) {
      link = createHttpLink()
   } else {
      link = createWSLink()
   }
   
   
   const defaultOptions: DefaultOptions = {
      watchQuery: {
         fetchPolicy: 'no-cache',
         errorPolicy: 'ignore',
      },
      query: {
         fetchPolicy: 'cache-first',
         errorPolicy: 'all',
      },
      // mutate: {
      //    fetchPolicy: 'no-cache',
      //    errorPolicy: 'all'
      // }
   }
   
   return new ApolloClient({
      ssrMode,
      link,
      cache: cache,
      defaultOptions: defaultOptions,
      connectToDevTools: true,
   })
}
