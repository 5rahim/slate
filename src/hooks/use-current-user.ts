import { useSelector } from 'react-redux'
import { UserSelectors } from '../store/slices/userSlice'
import { UserProfile, useUser } from '@auth0/nextjs-auth0'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Utils } from 'slate/utils'

export const useCurrentUser = () => {
   return useSelector(UserSelectors.get)
}

export type UserSessionProfile = UserProfile & { iid: string, role: string }

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
            iid: (data as any)['http://slate.red/school'].iid ?? null,
            role: (data as any)['http://slate.red/role'] ?? null,
         })
      }
      
   }, [data, profileIsLoading])
   
   return { profile, profileIsLoading }
   
}
