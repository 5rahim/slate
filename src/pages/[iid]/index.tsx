import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LoadingScreen } from '@slate/components/UI/LoadingScreen'
import { withApollo } from '@slate/graphql/withApollo'
import { useUserSessionProfile } from '@slate/hooks/use-current-user'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { Compose } from '@slate/next/compose'
import { Utils } from '@slate/utils'


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
   withApollo({ ssr: true }),
   withPageAuthRequired,
   withAuth({ requireActiveAccount: true }),
)(Page)

