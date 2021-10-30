import { QueryResult, useQuery } from '@apollo/client'
import { getSingleObject, handleQueryError, queryReturn } from '../../utils'
import { GET_USER_BY_EMAIL_QUERY } from './query'
import { UserSessionProfile } from 'slate/hooks/use-current-user'


export const useGetUserByEmailQuery = (email: string | null | undefined): QueryResult => {
   
   const res = useQuery(GET_USER_BY_EMAIL_QUERY, {
      variables: { email },
   })
   
   handleQueryError(res)
   
   return queryReturn('users', res, "single")
   
}

// TODO: DEPRECATED
export const getUserBySession = (session: any): QueryResult & { user: any } => {
   
   const res = useQuery(GET_USER_BY_EMAIL_QUERY, {
      variables: { email: session?.email },
      fetchPolicy: 'cache-first',
   })
   
   const { loading, error, data, networkStatus, refetch, called, client, previousData, fetchMore, startPolling, stopPolling, updateQuery, subscribeToMore, variables } = res
   
   handleQueryError(res)
   
   const user = getSingleObject(data?.users)
   
   return { loading, error, data, user, networkStatus, refetch, called, client, previousData, fetchMore, startPolling, stopPolling, updateQuery, subscribeToMore, variables }
   
}

export const getUserBySessionProfile = (profile: UserSessionProfile | undefined): QueryResult & { user: any } => {

   const res = useQuery(GET_USER_BY_EMAIL_QUERY, {
      variables: { email: profile?.email },
      fetchPolicy: 'cache-first',
   })
   
   
   const { loading, error, data, networkStatus, refetch, called, client, previousData, fetchMore, startPolling, stopPolling, updateQuery, subscribeToMore, variables } = res
   
   handleQueryError(res)
   
   const user = getSingleObject(data?.users)
   
   return { loading, error, data, user, networkStatus, refetch, called, client, previousData, fetchMore, startPolling, stopPolling, updateQuery, subscribeToMore, variables }
   
}
