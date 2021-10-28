import { QueryResult, QueryTuple, useLazyQuery, useQuery } from '@apollo/client'

import { getSingleObject, handleLazyQueryError, handleQueryError, lazyQueryReturn, queryReturn } from '../../utils'
import { GET_USER_BY_EMAIL_QUERY } from './query'
import { Session } from 'next-auth'


export const useGetUserByEmailQuery = (email: string | null | undefined): QueryResult => {
   
   const res = useQuery(GET_USER_BY_EMAIL_QUERY, {
      variables: { email },
   })
   
   handleQueryError(res)
   
   return queryReturn('users', res, "single")
   
}

export const getUserBySession = (session: any): QueryResult & { user: any } => {
   
   const res = useQuery(GET_USER_BY_EMAIL_QUERY, {
      variables: { email: session?.user?.email },
      fetchPolicy: 'cache-first',
   })
   
   const { loading, error, data, networkStatus, refetch, called, client, previousData, fetchMore, startPolling, stopPolling, updateQuery, subscribeToMore, variables } = res
   
   handleQueryError(res)
   
   const user = getSingleObject(data?.users)
   
   return { loading, error, data, user, networkStatus, refetch, called, client, previousData, fetchMore, startPolling, stopPolling, updateQuery, subscribeToMore, variables }
   
}
