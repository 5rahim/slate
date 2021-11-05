import { DefaultHead } from '../../components/Layout/DefaultHead'
import React, { useEffect } from 'react'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { useRouter } from 'next/router'
import { Compose } from '../../next/compose'
import { withApollo } from '../../graphql/withApollo'
import { Utils } from '../../utils'
import { useUserSessionProfile } from 'slate/hooks/use-current-user'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'


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
