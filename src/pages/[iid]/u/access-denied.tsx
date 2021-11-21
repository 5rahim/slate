import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import AuthLayout from '@slate/components/Layout/AuthLayout'
import { DefaultHead } from '@slate/components/Layout/DefaultHead'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withCacheReset } from '@slate/middlewares/dashboard/withCacheReset'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { Compose } from '@slate/next/compose'
import { DashboardPage } from '@slate/types/Next'
import { Utils } from '@slate/utils'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Button } from 'chalkui/dist/cjs/React'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Page({ iid }: DashboardPage) {
   
   const { t, i18n } = useTranslation(['common'], { useSuspense: false })
   
   const router = useRouter()
   
   return (
      
      <>
         
         <DefaultHead pageTitle={t('Access Denied')} />
         
         <AuthLayout>
            
            <Box
               p={5}
               bgColor={'brand.600'}
               color={"white"}
               backgroundImage={'url(/assets/patterns/seigaiha.png)'}
               backgroundBlendMode={"color-burn"}
               fontSize={"xl"}
               boxShadow="xl"
               textAlign={'center'}
            >
               {t('Access Denied')}
            </Box>
            
            <Box bgColor="brand.800">
               
               <Box p={3}>
                  
                  <Button
                     colorScheme="gray.400" width="full" size="lg"
                     onClick={() => router.push(Utils.Url.schoolLinkTo(iid, '/'))}
                  >{t('Go to the home page')}</Button>
               
               </Box>
            
            </Box>
         
         </AuthLayout>
      
      </>
   )
   
}

export default Compose(
   withPageAuthRequired,
   withApollo({ ssr: true }),
   withCacheReset(),
   withAuth({ requireActiveAccount: true }),
   withDashboard(),
)(Page)
