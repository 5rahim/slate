/**
 * Check if user is authenticated or needs to be to access page
 * Return user data
 */

import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { LoadingScreen } from 'slate/ui/LoadingScreen'
import { getUserBySession } from 'slate/graphql/queries/users/hooks'
import SlateUser from 'slate/graphql/types/User'
import { useDispatch } from 'react-redux'
import { UserActions } from 'slate/store/slices/userSlice'
import { Utils } from 'slate/utils'
import { useUser } from '@auth0/nextjs-auth0'


interface WithAuthProps {
   requireAuth?: boolean,
   requireNoAuth?: boolean,
   requireActiveAccount?: boolean,
   redirectTo?: string
}

export const withAuth = (
   {
      requireAuth = false,
      requireNoAuth = false,
      requireActiveAccount = false,
      redirectTo = '/',
   }: WithAuthProps) => (Component: NextPage) => {
   
   const Auth = (props: any) => {
      
      const { user: session, error, isLoading: loading } = useUser();
      
      const [displayPage, setDisplayPage] = useState(false)

      
      const router = useRouter()
      
      const dispatch = useDispatch()
      //
      // const { loading: userLoading, user }: any = requireActiveAccount ? getUserBySession(session) : { loading: null, user: null }
      //
      //
   
      
      useEffect(() => {
   
         console.log(session, loading)

         if (requireAuth) {
            if (!loading && session) {
               setDisplayPage(true)
            } else if(!loading && !session) {
               router.push(Utils.Url.linkToLogin())
            }
         } else if (requireNoAuth) {
            if (!loading && !session) {
               setDisplayPage(true)
               // router.push(redirectTo)
            } else if (!loading && session) {
               router.push(Utils.Url.baseLinkTo('/'))
            }
         }
         
         // if (requireActiveAccount) {
         //    if (!!user) {
         //       if (!user.is_active) {
         //          setDisplayPage(false)
         //          router.push(Utils.Url.baseLinkTo('/auth/new-account'))
         //       }
         //    }
         // }
         //
         // if (!loading && session && user && !userLoading) {
         //    dispatch(UserActions.set(user))
         // }

      }, [loading, session])


      if (typeof window !== 'undefined' && loading) {
         return <LoadingScreen />
      }

      if (loading) {
         return <LoadingScreen />
      }
      
      return displayPage ? (
         <Component {...props} />
      ) : <LoadingScreen />
   }
   
   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps
   }
   
   return Auth
}
