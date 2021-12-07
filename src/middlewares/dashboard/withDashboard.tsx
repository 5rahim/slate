/**
 * Check if user can access dashboard
 * Check if institute url is valid
 */

import { LoadingScreen } from '@slate/components/UI/LoadingScreen'
import { SchoolActions, SchoolSelectors } from '@slate/store/slices/schoolSlice'
import { Utils } from '@slate/utils'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


interface WithDashboardProps {

}

export const withDashboard = (props?: WithDashboardProps) => (Component: NextPage) => {
   
   const Dashboard = (props: any) => {
      
      const router = useRouter()
      const { iid } = router.query
      
      const [displayPage, setDisplayPage] = useState(false)
      
      const dispatch = useDispatch()
      
      const storedIID = useSelector(SchoolSelectors.getIID)
      
      const user = props.user
      const school = user.school
      
      useEffect(() => {
         
         if (school.short_name !== iid) {
            router.push(Utils.Url.baseLinkTo('/auth/redirect'))
            return
         }
         
         if(!storedIID) {
            dispatch(SchoolActions.set(user.school))
         }
         setDisplayPage(true)
         
      }, [storedIID])
      
      
      return storedIID || displayPage ? (
         <Component {...props} school={user.school} iid={user.school.short_name} />
         // <Component {...props}/>
      ) : <LoadingScreen text="withDashboard" />
      
      
   }
   
   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      Dashboard.getInitialProps = Component.getInitialProps
   }
   
   return Dashboard
}
