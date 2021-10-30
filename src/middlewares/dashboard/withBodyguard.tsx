/**
 * Check if user has the role required to view a page
 */

import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { rolesMap } from '../../utils/permissions'
import { Utils } from '../../utils'



interface WithBodyguardProps {
   authorize: string[]
}

export const withBodyguard = (
   {
      authorize: roles,
   }:
      WithBodyguardProps) => (Component: NextPage) => {
   
   const Bodyguard = (props: any) => {
      
      const router = useRouter()
      const [displayPage, setDisplayPage] = useState<boolean>(false)
      
      const userRole = props.user.role
      
      let hasAccess: number = 0
      
      // No roles required, so all roles allowed
      if (!roles) return setDisplayPage(true)
      
      
      
      useEffect(() => {
         
         if (roles.includes(userRole))
            router.push(Utils.Url.baseLinkTo('/access-denied')) // TODO
         else
            setDisplayPage(true)
         
      }, [])
      
      
      // if (typeof window !== 'undefined') {
      //    return <LoadingScreen />
      // }
      
      
      return displayPage ? (
         <Component {...props} />
      ) : <LoadingScreen />
      
      
   }
   
   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      Bodyguard.getInitialProps = Component.getInitialProps
   }
   
   return Bodyguard
}
