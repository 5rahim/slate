import React from 'react'
import { useInstituteRoute } from '../hooks/use-institute-route'
import { LoadingScreen } from '../ui/LoadingScreen'

interface DashboardWrapper {
   children: React.ReactNode,
   role?: any
}

export const DashboardWrapper: React.FC<DashboardWrapper> = (props) => {
   
   const { children } = props
   
   const [loading, displayPage] = useInstituteRoute()
   
   return !displayPage ? (
      <LoadingScreen />
   ) : (
      <>
         {children}
      </>
   )
   
}
