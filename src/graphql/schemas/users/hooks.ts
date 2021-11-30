import { useQueryHookCreator } from '@slate/graphql/hooks/useQueryHookCreator'
import { UserSessionProfile } from '@slate/hooks/useCurrentUser'
import { SlateUser } from '@slate/types/User'
import { GET_USER_BY_EMAIL, GET_USER_SETTINGS } from './queries'


export const getUserBySessionProfile = (profile: UserSessionProfile | undefined) => {
   
   return useQueryHookCreator<SlateUser | null>("users", GET_USER_BY_EMAIL, "object", {
      variables: { email: profile?.email },
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-and-network',
      debug: false,
   })
   
}

export const getUserSettings = (profile: UserSessionProfile | undefined) => {

   return useQueryHookCreator<SlateUser | null>("users", GET_USER_SETTINGS, "object", {
      variables: { email: profile?.email },
      debug: false,
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-and-network'
   })
   
}
