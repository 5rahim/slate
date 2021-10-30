import { onError } from '@apollo/client/link/error'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist'

let accessToken: any = null

const requestAccessToken = async () => {
   if (accessToken) return

   const res = await fetch(`http://vcap.me:3000/api/token`)
   if (res.ok) {
      const json = await res.json()
      accessToken = json.idToken
   } else {
      accessToken = 'public'
   }
}

// remove cached token on 401 from the server
const resetTokenLink = onError(({ networkError }: any) => {
   if (networkError && networkError.name === 'ServerError' && networkError.statusCode === 401) {
      accessToken = null
   }
})

const createHttpLink = (headers: any) => {
   const httpLink = new HttpLink({
      uri: `https://${process.env.NEXT_PUBLIC_API_HOST}`,
      credentials: 'include',
      headers, // auth token is fetched on the server side
      fetch,
   })
   return httpLink;
}

const createWSLink = () => {
   return new WebSocketLink(
      new SubscriptionClient(`wss://${process.env.NEXT_PUBLIC_API_HOST}`, {
         lazy: true,
         reconnect: true,
         connectionParams: async () => {
            await requestAccessToken() // happens on the client
            return {
               headers: {
                  authorization: accessToken ? `Bearer ${accessToken}` : '',
               },
            }
         },
      })
   )
}

const cache: any = new InMemoryCache()
typeof window !== 'undefined' && persistCache({
   cache,
   storage: new LocalStorageWrapper(window.localStorage),
})

export default function createApolloClient(initialState: any, headers: any) {
   const ssrMode = typeof window === 'undefined'
   let link
   if (ssrMode) {
      link = createHttpLink(headers)
   } else {
      link = createWSLink()
   }
   return new ApolloClient({
      ssrMode,
      link,
      cache: cache,
      connectToDevTools: true
   })
}



// import fetch from 'isomorphic-unfetch'
// import { SubscriptionClient } from 'subscriptions-transport-ws'
// import { ApolloClient, DefaultOptions, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
// import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist'
// import { WebSocketLink } from '@apollo/client/link/ws'
//
// const createHttpLink = (): HttpLink => {
//    const httpLink = new HttpLink({
//       uri: `https://${process.env.NEXT_PUBLIC_API_HOST}`,
//       credentials: 'include',
//       fetch,
//       headers: {
//          // 'x-hasura-role': 'user',
//          // 'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET
//       },
//    })
//    return httpLink
// }
//
// const createWSLink = (): WebSocketLink => {
//    return new WebSocketLink(
//       new SubscriptionClient(`wss://${process.env.NEXT_PUBLIC_API_HOST}`, {
//          lazy: true,
//          reconnect: true,
//       }),
//    )
// }
//
// const cache: any = new InMemoryCache()
// typeof window !== 'undefined' && persistCache({
//    cache,
//    storage: new LocalStorageWrapper(window.localStorage),
// })
//
// export default function createApolloClient(initialState: any, header: any) {
//
//
//    const ssrMode = typeof window === 'undefined'
//    let link
//    if (ssrMode) {
//       link = createHttpLink()
//    } else {
//       link = createWSLink()
//    }
//
//
//    const defaultOptions: DefaultOptions = {
//       watchQuery: {
//          fetchPolicy: 'no-cache',
//          errorPolicy: 'ignore',
//       },
//       query: {
//          fetchPolicy: 'cache-first',
//          errorPolicy: 'all',
//       },
//       // mutate: {
//       //    fetchPolicy: 'no-cache',
//       //    errorPolicy: 'all'
//       // }
//    }
//
//    return new ApolloClient({
//       ssrMode,
//       link,
//       cache: cache,
//       defaultOptions: defaultOptions,
//       connectToDevTools: true,
//    })
// }
