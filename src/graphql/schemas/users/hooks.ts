import { useLazyQueryHookCreator } from '@slate/graphql/hooks/useLazyQueryHookCreator'
import { useQueryHookCreator } from '@slate/graphql/hooks/useQueryHookCreator'
import { UserSessionProfile } from '@slate/hooks/useCurrentUser'
import { SlateUser } from '@slate/types/User'
import { GET_USER_BY_EMAIL, GET_USER_SETTINGS } from './queries'


export const getLazyUserBySessionProfile = (profile: UserSessionProfile | undefined) => {
   
   return useLazyQueryHookCreator<SlateUser | null>("users", GET_USER_BY_EMAIL, "object", {
      variables: { email: profile?.email },
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-and-network',
      debug: false,
   })
   
}

/**
 * @deprecated
 * @param {UserSessionProfile | undefined} profile
 * @returns {QueryHookCreatorReturn<SlateUser | null>}
 */
export const getUserBySessionProfile = (profile: UserSessionProfile | undefined) => {
   
   return useQueryHookCreator<SlateUser | null>("users", GET_USER_BY_EMAIL, "object", {
      variables: { email: profile?.email },
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-and-network',
      debug: false,
   })
   
}

export const getLazyUserSettings = (profile: UserSessionProfile | undefined) => {
   
   return useLazyQueryHookCreator<Pick<SlateUser, 'hour_format' | 'date_format'> | null>("users", GET_USER_SETTINGS, "object", {
      variables: { email: profile?.email },
      debug: false,
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-and-network',
   })
   
}

/**
 * @deprecated
 * @param {UserSessionProfile | undefined} profile
 * @returns {QueryHookCreatorReturn<Pick<SlateUser, "hour_format" | "date_format"> | null>}
 */
export const getUserSettings = (profile: UserSessionProfile | undefined) => {
   
   return useQueryHookCreator<Pick<SlateUser, 'hour_format' | 'date_format'> | null>("users", GET_USER_SETTINGS, "object", {
      variables: { email: profile?.email },
      debug: false,
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-and-network',
   })
   
}
