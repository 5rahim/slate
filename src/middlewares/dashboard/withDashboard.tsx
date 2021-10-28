/**
 * Check if user can access dashboard
 * Check if institute url is valid
 */

import { NextPage } from 'next'
import { useSession } from 'next-auth/client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { getUserBySession } from '../../graphql/queries/users/hooks'
import { useCurrentSchoolQuery } from '../../graphql/queries/schools/hooks'
import { useDispatch } from 'react-redux'
import { SchoolActions } from '../../store/slices/schoolSlice'
import { Utils } from '../../utils'


interface WithDashboardProps {

}

export const withDashboard = (props?: WithDashboardProps) => (Component: NextPage) => {
   
   const Dashboard = (props: any) => {
      
      const [session, loading] = useSession()
      const router = useRouter()
   
      const [displayPage, setDisplayPage] = useState(false)
      const [isLoading, setIsLoading] = useState<boolean>(true)
      
      const dispatch = useDispatch()
      
      const user = props.user
      const school = user.school
      
      useEffect(() => {
         if((session && !Utils.Url.getIID()) || (session && !school) || (session && (school.short_name !== Utils.Url.getIID()))) {
            setIsLoading(true)
            router.push(Utils.Url.baseLinkTo('/auth/redirect'))
         } else if(session && (school.short_name === Utils.Url.getIID())) {
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
