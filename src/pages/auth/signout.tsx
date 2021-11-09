import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import AuthCard from '@slate/components/UI/AuthCard'
import { withApollo } from '@slate/graphql/withApollo'
import { withCacheReset } from '@slate/middlewares/dashboard/withCacheReset'
import { Utils } from '@slate/utils'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Button } from 'chalkui/dist/cjs/React'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import AuthLayout from '../../components/Layout/AuthLayout'
import { DefaultHead } from '../../components/Layout/DefaultHead'
import { Compose } from '../../next/compose'


function Page() {
   
   const { t, i18n } = useTranslation(['common', 'contact', 'form', 'auth'], { useSuspense: false })
   
   const router = useRouter()
   
   return (
      
      <>
         
         <DefaultHead pageTitle={t('Sign out')} />
         
         <AuthLayout>
            
            <AuthCard title={t('Sign out')}>
               
               <Box p={3}>
                  
                  <Button size="lg" colorScheme="primary" width="100%" as="a" href={Utils.Url.linkToLogout()}>{t('Sign out')}</Button>
               
               </Box>
            
            </AuthCard>
         
         </AuthLayout>
      
      </>
   )
}


export default Compose(
   withApollo({ ssr: false }),
   withPageAuthRequired,
   withCacheReset(),
)(Page)
