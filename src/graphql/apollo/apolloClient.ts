import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import fetch from 'isomorphic-unfetch'
import { SubscriptionClient } from 'subscriptions-transport-ws'


let accessToken: any = null

const requestAccessToken = async () => {
   if (accessToken) return
   
   const res = await fetch(`http://vcap.me:3000/api/token`)
   if (res.ok) {
      const json = await res.json()
      accessToken = json.idToken
   } else {
      accessToken = null
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
   return httpLink
}

const createWSLink = () => {
   return new WebSocketLink(
      new SubscriptionClient(`wss://${process.env.NEXT_PUBLIC_API_HOST}`, {
         lazy: true,
         reconnect: true,
         connectionParams: async () => {
            await requestAccessToken() // happens on the client
            return {
               headers: accessToken ? {
                  authorization: `Bearer ${accessToken}`,
               } : {},
            }
         },
      }),
   )
}

const initCache = (initialState?: any) => {
   const cache = new InMemoryCache().restore(initialState || {})
   
   /**
    * Cache uses localStorage to save data.
    *
    * This cache is used by Apollo (graphql client).
    */
   if (typeof window !== 'undefined') {
      // persistCache({
      //    cache,
      //    storage: new LocalStorageWrapper(window.localStorage),
      // })
   }
   
   return cache
}


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
      cache: initCache(initialState),
      connectToDevTools: true,
   })
}

