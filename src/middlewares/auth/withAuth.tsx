/**
 * Check if user is authenticated or needs to be to access page
 * Return user data
 */

import { NextPage } from 'next'
import { useSession } from 'next-auth/client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { getUserBySession } from '../../graphql/queries/users/hooks'
import SlateUser from '../../graphql/types/User'
import { useDispatch } from 'react-redux'
import { UserActions } from '../../store/slices/userSlice'
import { Utils } from '../../utils'


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
      
      const [displayPage, setDisplayPage] = useState(true)
      const [session, loading] = useSession()
      const router = useRouter()
      
      const dispatch = useDispatch()
      
      const { loading: userLoading, user }: any = requireActiveAccount ? getUserBySession(session) : { loading: null, user: null }
      
      
      useEffect(() => {
         
         if (requireAuth) {
            if (!loading && !session) {
               setDisplayPage(false)
               router.push(redirectTo)
            } else if(!loading && session) {
            
            }
         } else if (requireNoAuth) {
            if (!loading && session) {
               setDisplayPage(false)
               router.push(redirectTo)
            }
         }
         
         if (requireActiveAccount) {
            if (!!user) {
               if (!user.is_active) {
                  setDisplayPage(false)
                  router.push(Utils.Url.baseLinkTo('/auth/new-account'))
               }
            }
         }
         
         if(!loading && session && user && !userLoading) {
            dispatch(UserActions.set(user))
         }
         
      }, [loading, session, user, userLoading])
      
      
      if (typeof window !== 'undefined' && loading) {
         return <LoadingScreen />
      }
      
      if (loading || userLoading) {
         return <LoadingScreen />
      }
      
      return displayPage ? (
         <Component {...props} user={user as SlateUser} />
      ) : <LoadingScreen />
   }
   
   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps
   }
   
   return Auth
}
