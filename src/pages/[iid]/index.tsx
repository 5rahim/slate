import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { LoadingScreen } from '@slate/components/UI/LoadingScreen'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { useUserSessionProfile } from '@slate/hooks/useCurrentUser'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { Compose } from '@slate/next/compose'
import { Utils } from '@slate/utils'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'


const Page = () => {
   
   const { t, i18n } = useTranslation(['common'], { useSuspense: false })
   
   const router = useRouter()
   
   const { profile } = useUserSessionProfile()
   
   useEffect(() => {
      
      if (profile) {
         router.push(Utils.Url.schoolLinkTo(profile.iid, '/'))
      }
      
   }, [profile])
   
   
   return <LoadingScreen />
}

export default Compose(
   withApollo(),
   withPageAuthRequired,
   withAuth({ requireActiveAccount: true }),
)(Page)

