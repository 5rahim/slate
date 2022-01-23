import { UserProfile, useUser } from '@auth0/nextjs-auth0'
import { Users } from '@slate/generated/graphql'
import { SlateRoles } from '@slate/types/User'
import { Utils } from '@slate/utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserSelectors } from '../store/slices/userSlice'

export const useCurrentUser = () => {
   return useSelector(UserSelectors.getUser) as Users
}

export type UserSessionProfile = UserProfile & { iid: string, role: SlateRoles }

export const useUserSessionProfile = (): { profile: UserSessionProfile | undefined, profileIsLoading: boolean } => {
   
   const { user: data, isLoading: profileIsLoading } = useUser()
   
   const router = useRouter()
   
   const [profile, setProfile] = useState<UserSessionProfile | undefined>(undefined)
   
   useEffect(() => {
      
      if (data && !data.hasOwnProperty('http://slate.red/school')) {
         router.push(Utils.Url.linkToLogout())
      }
      
      if (data && !profileIsLoading && data.hasOwnProperty('http://slate.red/school')) {
         
         // let newData = data
         // delete newData['http://slate.red/school']
         // delete newData['http://slate.red/role']
         // delete newData['https://hasura.io/jwt/claims']
         
         setProfile({
            ...data,
            iid: ( data as any )['http://slate.red/school'].iid ?? null,
            role: ( data as any )['http://slate.red/role'] ?? null,
         })
      }
      
   }, [data, profileIsLoading])
   
   return { profile, profileIsLoading }
   
}
