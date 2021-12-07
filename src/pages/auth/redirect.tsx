import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { DefaultHead } from '@slate/components/Layout/DefaultHead'
import { LoadingScreen } from '@slate/components/UI/LoadingScreen'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { useUserSessionProfile } from '@slate/hooks/useCurrentUser'
import { Compose } from '@slate/next/compose'
import { Utils } from '@slate/utils'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'


function Page() {
   
   const router = useRouter()
   
   const { profile, profileIsLoading } = useUserSessionProfile()
   
   useEffect(() => {
      
      if (profile && profile.iid) {
         router.push(Utils.Url.schoolLinkTo(profile.iid, '/'))
      } else if (profile && !profile.iid) {
         router.push(Utils.Url.baseLinkTo('/auth/new-account'))
      }
      
   }, [profile, profileIsLoading])
   
   if (profileIsLoading || !profile) {
      return <LoadingScreen />
   }
   
   
   return (
      
      <>
         
         <DefaultHead pageTitle={"Redirect"} />
      
      </>
   )
}


export default Compose(
   withApollo(),
   withPageAuthRequired,
)(Page)
