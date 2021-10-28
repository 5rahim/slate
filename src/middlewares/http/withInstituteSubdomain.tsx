import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { useCurrentSchool, useCurrentSchoolQuery } from '../../graphql/queries/schools/hooks'
import { Utils } from '../../utils'

export const withInstituteSubdomain = () => (Component: NextPage) => {
   
   const redirect = (router: NextRouter) => {
      router.push(Utils.Url.baseLinkTo(''))
      return <LoadingScreen />
   }
   
   const Subdomain = (props: any) => {
   
      const router = useRouter()
   
      if (typeof window !== 'undefined') {
         
         const { host } = window.location
         let splitHost = host.split(".")
         const iid = splitHost.length === 3 ? splitHost[0] : null
         
         // Check iid
         if(!iid) return redirect(router)
         
         // Check if institute exists
         const { loading, data } = useCurrentSchoolQuery(iid)
         
         if(loading) {
            return <LoadingScreen />
         }
         if(!loading && !data) {
            return redirect(router)
         }
         
         return <Component {...props} iid={iid} school={data} />
      }
      
      return redirect(router)
      
   }
   
   return Subdomain
}

