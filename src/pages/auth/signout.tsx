import { signOut, useSession } from 'next-auth/client'
import { DefaultHead } from '../../components/Layout/DefaultHead'
import AuthLayout from '../../components/Layout/AuthLayout'
import AuthCard from '../../ui/AuthCard'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Button } from 'chalkui/dist/cjs/React'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { useRouter } from 'next/router'
import { Compose } from '../../next/compose'
import { withAuth } from '../../middlewares/auth/withAuth'
import Config from '../../constants/Config'
import { useUser } from '@auth0/nextjs-auth0'


function Page() {
   
   const { t, i18n } = useTranslation(['common', 'contact', 'form', 'auth'], { useSuspense: false })
   
   const router = useRouter()
   const [session, loading] = useSession()
   
   
   if (!session) {
      router.push('/')
   }
   
   if (loading) {
      return <LoadingScreen />
   }
   
   return (
      
      <>
         
         <DefaultHead pageTitle={t('Sign out')} />
         
         <AuthLayout>
            
            <AuthCard title={t('Sign out')}>
               
               <Box p={3}>
                  
                  <Button size="lg" colorScheme="primary" width="100%" onClick={() => signOut({ callbackUrl: `${Config.baseURL}/auth/signin` })}>Sign out</Button>
               
               </Box>
            
            </AuthCard>
         
         </AuthLayout>
      
      </>
   )
}


export default Compose(
   withAuth({  })
)(Page)
