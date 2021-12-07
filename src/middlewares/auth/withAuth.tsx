import { LoadingScreen } from '@slate/components/UI/LoadingScreen'
import { getLazyUserBySessionProfile } from '@slate/graphql/schemas/users/hooks'
import { useCurrentUser, useUserSessionProfile } from '@slate/hooks/useCurrentUser'
import { UserActions } from '@slate/store/slices/userSlice'
import { Utils } from '@slate/utils'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'


interface WithAuthProps {
   requireNoAuth?: boolean,
   requireActiveAccount?: boolean,
}

/**
 * Secures page for unauthenticated users only using "requireNoAuth"
 * Secures page for activated user accounts only using "requireActiveAccount"
 * Stores user data
 * @param {boolean | undefined} requireNoAuth
 * @param {boolean | undefined} requireActiveAccount
 * @returns {(Component: NextPage) => (props: any) => (JSX.Element)}
 */
export const withAuth = (
   {
      requireNoAuth = false,
      requireActiveAccount = false,
   }: WithAuthProps) => (Component: NextPage) => {
   
   const Auth = (props: any) => {
      
      const [displayPage, setDisplayPage] = useState(false)
      
      const { profile, profileIsLoading } = useUserSessionProfile()
      
      
      const router = useRouter()
      
      const dispatch = useDispatch()
      
      const storedUser = useCurrentUser()
   
      const [fetchUser, user, userLoading] = getLazyUserBySessionProfile(profile)
   
      
      useEffect(() => {
         if(!storedUser && requireActiveAccount) {
            fetchUser && fetchUser()
         }
      }, [storedUser])
      
      /**
       * Stored user acts like a cached object to accelerate loading
       */
      useEffect(() => {
         if (requireActiveAccount) {
            
            if (storedUser && storedUser.is_active) {
               setDisplayPage(true)
            }
         }
         
      }, [storedUser])
      
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
            dispatch(UserActions.setUser(user))
         }
         
      }, [profileIsLoading, profile, user, storedUser])

      
      return displayPage ? (
         <Component {...props} user={storedUser ?? user} />
      ) : <LoadingScreen text="withAuth" />
   }
   
   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps
   }
   
   return Auth
}
