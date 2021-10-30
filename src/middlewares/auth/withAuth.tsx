/**
 * Check if user is authenticated or needs to be to access page
 * Return user data
 */

import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { LoadingScreen } from 'slate/ui/LoadingScreen'
import { getUserBySession, getUserBySessionProfile } from 'slate/graphql/queries/users/hooks'
import SlateUser from 'slate/graphql/types/User'
import { useDispatch } from 'react-redux'
import { UserActions } from 'slate/store/slices/userSlice'
import { Utils } from 'slate/utils'
import { useUser } from '@auth0/nextjs-auth0'
import { useUserSessionProfile } from 'slate/hooks/use-current-user'


interface WithAuthProps {
   requireAuth?: boolean,
   requireNoAuth?: boolean,
   requireActiveAccount?: boolean,
   redirectTo?: string
}

export const withAuth = (
   {
      requireNoAuth = false,
      requireActiveAccount = false,
      redirectTo = '/',
   }: WithAuthProps) => (Component: NextPage) => {
   
   const Auth = (props: any) => {
      
      const [displayPage, setDisplayPage] = useState(false)
      
      const { profile, profileIsLoading } = useUserSessionProfile()
      
      
      const router = useRouter()
      
      const dispatch = useDispatch()
      
      const { loading: userLoading, user, error }: any = requireActiveAccount ? getUserBySessionProfile(profile) : { loading: null, user: null }
      
      
      useEffect(() => {
         
         if (requireNoAuth) {
            
            if (!profileIsLoading && !profile) {
               setDisplayPage(true)
            } else if (!profileIsLoading && profile) {
               router.push(Utils.Url.baseLinkTo('/'))
            }
            
         }
         
         if (requireActiveAccount) {
            
            if (!!user && user.is_active) {
               setDisplayPage(true)
            } else if (!!user && !user.is_active) {
               router.push(Utils.Url.baseLinkTo('/auth/new-account'))
            }
         }
         //
         if (user && !userLoading) {
            dispatch(UserActions.set(user))
         }
         
      }, [profileIsLoading, profile, error, user])
      
      
      if (typeof window !== 'undefined' && profileIsLoading) {
         return <LoadingScreen />
      }
      
      if (profileIsLoading) {
         return <LoadingScreen />
      }
      
      return displayPage ? (
         <Component {...props} user={user} />
      ) : <LoadingScreen />
   }
   
   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps
   }
   
   return Auth
}
