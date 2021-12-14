import AuthLayout from '@slate/components/Layout/AuthLayout'
import AuthCard from '@slate/components/UI/AuthCard'
import { useUserSessionProfile } from '@slate/hooks/useCurrentUser'
import { Utils } from '@slate/utils'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Button } from 'chalkui/dist/cjs/React'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { DefaultHead } from '../components/Layout/DefaultHead'
import { withApollo } from '../graphql/apollo/withApollo'
import { Compose } from '../next/compose'


const Page = React.memo(() => {
   
   const { t, i18n } = useTranslation(['common'], { useSuspense: false })
   
   const { profile } = useUserSessionProfile()
   
   // useEffect(() => {
   // console.log(profile)
   // }, [profile])
   
   
   return (
      <>
         <DefaultHead pageTitle={t('Slate')} />
         
         <AuthLayout>
            {!!profile ? (
               <AuthCard title={t('You are logged in')}>
                  <Box p={5}>
                     
                     <Button mb={3} width="full" colorScheme="brand.100" as="a" href="/api/auth/logout">{t('Logout')}</Button>
                     
                     <Button
                        width="full" colorScheme="brand.100" as="a"
                        href={Utils.Url.schoolLinkTo(profile?.iid, '/')}
                     >{t('Go to the dashboard')}</Button>
                  </Box>
               </AuthCard>
            ) : (
               <Button width="full" colorScheme="brand.100" as="a" href="/api/auth/login">{t('Login')}</Button>
            )}
         </AuthLayout>
      
      </>
   )
})

export default Compose(
   withApollo(),
)(Page)

