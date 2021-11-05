import { withApollo } from 'slate/graphql/withApollo'
import React, { useEffect } from 'react'
import { Compose } from 'slate/next/compose'
import { withAuth } from 'slate/middlewares/auth/withAuth'
import { useTranslation } from 'react-i18next'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { LoadingScreen } from 'slate/ui/LoadingScreen'
import { useRouter } from 'next/router'
import { Utils } from 'slate/utils'
import { useUserSessionProfile } from 'slate/hooks/use-current-user'


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

