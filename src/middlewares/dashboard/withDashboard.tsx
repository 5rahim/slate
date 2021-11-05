/**
 * Check if user can access dashboard
 * Check if institute url is valid
 */

import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { LoadingScreen } from 'slate/ui/LoadingScreen'
import { useDispatch } from 'react-redux'
import { SchoolActions } from 'slate/store/slices/schoolSlice'
import { Utils } from 'slate/utils'


interface WithDashboardProps {

}

export const withDashboard = (props?: WithDashboardProps) => (Component: NextPage) => {
   
   const Dashboard = (props: any) => {
      
      const router = useRouter()
      const { iid } = router.query
      
      const [displayPage, setDisplayPage] = useState(false)
      
      const dispatch = useDispatch()
      
      
      const user = props.user
      const school = user.school
      
      useEffect(() => {
         
         if (school.short_name !== iid) {
            
            router.push(Utils.Url.baseLinkTo('/auth/redirect'))
            
         } else if (school.short_name === iid) {
            
            dispatch(SchoolActions.set(user.school))
            setDisplayPage(true)
            
         }
      }, [])
      
      
      return displayPage ? (
         <Component {...props} school={user.school} iid={user.school.short_name} />
         // <Component {...props}/>
      ) : <LoadingScreen />
      
      
   }
   
   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      Dashboard.getInitialProps = Component.getInitialProps
   }
   
   return Dashboard
}
