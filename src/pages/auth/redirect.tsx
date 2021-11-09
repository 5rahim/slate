import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { LoadingScreen } from '@slate/components/UI/LoadingScreen'
import { useUserSessionProfile } from '@slate/hooks/use-current-user'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { DefaultHead } from '../../components/Layout/DefaultHead'
import { withApollo } from '../../graphql/withApollo'
import { Compose } from '../../next/compose'
import { Utils } from '../../utils'


function Page() {
   
   const router = useRouter()
   
   const { profile, profileIsLoading } = useUserSessionProfile()
   
   useEffect(() => {
      
      if (profile && profile?.iid) {
         router.push(Utils.Url.schoolLinkTo(profile?.iid, '/'))
      } else if (profile && !profile?.iid) {
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
   withPageAuthRequired,
   withApollo({ ssr: true }),
)(Page)
