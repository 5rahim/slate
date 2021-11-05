import { UserSessionProfile } from 'slate/hooks/use-current-user'
import { SlateUser } from 'slate/types/User'
import { QueryHookCreator, useQueryHookCreator } from '../../utils'
import { GET_USER_BY_EMAIL_QUERY } from './queries'


export const getUserBySessionProfile: QueryHookCreator<SlateUser | null> = (profile: UserSessionProfile | undefined) => {
   
   return useQueryHookCreator<SlateUser | null>("users", GET_USER_BY_EMAIL_QUERY, "object", {
      variables: { email: profile?.email },
      debug: false,
   })
   
}
