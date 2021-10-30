import { QueryHookCreator, useQueryHookCreator } from '../../utils'
import { GET_USER_BY_EMAIL_QUERY } from './queries'
import { UserSessionProfile } from 'slate/hooks/use-current-user'
import SlateUser from 'slate/graphql/types/User'


export const getUserBySessionProfile: QueryHookCreator<SlateUser | null> = (profile: UserSessionProfile | undefined) => {
   
   return useQueryHookCreator<SlateUser | null>("users", GET_USER_BY_EMAIL_QUERY, {
      variables: { email: profile?.email },
      objectOrArray: "object",
      debug: false
   })
   
}
