import { useSelector } from 'react-redux'
import { UserSelectors } from '../store/slices/userSlice'
import { UserContext, UserProfile, useUser } from '@auth0/nextjs-auth0'
import { useEffect, useState } from 'react'

export const useCurrentUser = () => {
   return useSelector(UserSelectors.get)
}

type UserSessionProfile = UserProfile & { iid: string, role: string }

export const useUserSessionProfile = (): { profile: UserSessionProfile | undefined, profileIsLoading: boolean } => {
   
   const { user: data, isLoading: profileIsLoading } = useUser()
   
   const [profile, setProfile] = useState<UserSessionProfile | undefined>(undefined)
   
   useEffect(() => {
      
      if (data && !profileIsLoading) {
         
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
