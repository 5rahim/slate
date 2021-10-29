/**
 * Check if user can access dashboard
 * Check if institute url is valid
 */

import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { LoadingScreen } from 'slate/ui/LoadingScreen'
import { useDispatch } from 'react-redux'
import { SchoolActions } from 'slate/store/slices/schoolSlice'
import { Utils } from 'slate/utils'
import { useUser } from '@auth0/nextjs-auth0'


interface WithDashboardProps {

}

export const withDashboard = (props?: WithDashboardProps) => (Component: NextPage) => {
   
   const Dashboard = (props: any) => {
   
      const { user: session, error, isLoading: loading } = useUser();
   
      const router = useRouter()
      
      const [displayPage, setDisplayPage] = useState(false)
      const [isLoading, setIsLoading] = useState<boolean>(true)
      
      const dispatch = useDispatch()
      
      const user = props.user
      const school = user.school
      
      useEffect(() => {
         if ((session && !Utils.Url.getIID()) || (session && !school) || (session && (school.short_name !== Utils.Url.getIID()))) {
            setIsLoading(true)
            router.push(Utils.Url.baseLinkTo('/auth/redirect'))
         } else if (session && (school.short_name === Utils.Url.getIID())) {
            dispatch(SchoolActions.set(user.school))
            setDisplayPage(true)
            setIsLoading(false)
         }
      }, [session])
      
      if (typeof window !== 'undefined' && loading) {
         return <LoadingScreen />
      }
      
      if (loading) {
         return <LoadingScreen />
      }
      
      return displayPage ? (
         <Component {...props} school={user.school} iid={user.school.short_name} />
      ) : <LoadingScreen />
      
      
   }
   
   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      Dashboard.getInitialProps = Component.getInitialProps
   }
   
   return Dashboard
}
