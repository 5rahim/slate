import { getProviders, signIn, useSession } from 'next-auth/react'
import { DefaultHead } from '../../components/Layout/DefaultHead'
import AuthLayout from '../../components/Layout/AuthLayout'
import AuthCard from '../../ui/AuthCard'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Button } from 'chalkui/dist/cjs/React'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { IoLogoGoogle } from 'react-icons/io'
import { useRouter } from 'next/router'
import { Utils } from '../../utils'


function Page({ providers }: any) {
   
   const { t, i18n } = useTranslation(['common', 'contact', 'form', 'auth'], { useSuspense: false })
   
   const [IID, setIID] = useState<any>("")
   
   const router = useRouter()
   const { data: session, status } = useSession()
   const loading = status === "loading"
   
   useEffect(() => {
      const { host } = window.location
      let splitHost = host.split(".")
      const iid = splitHost.length === 3 ? splitHost[0] : null
      
      if (!!iid) {
         router.push(Utils.Url.baseLinkTo('/auth/signin'))
      }
   }, [])
   
   if (session) {
      router.push('/')
   }
   
   if (loading || session) {
      return <LoadingScreen />
   }
   
   return (
      
      <>
         
         <DefaultHead pageTitle={t('Sign in')} />
         
         <AuthLayout>
            
            <AuthCard title={t('Sign in')}>
               
               <Box p={3}>
                  
                  {providers && Object?.values(providers)?.map((provider: any) => (
                     <div key={provider.name}>
                        <Button leftIcon={
                           <IoLogoGoogle />} size="lg" colorScheme="primary" width="100%" onClick={() => signIn(provider.id, { callbackUrl: Utils.Url.baseLinkTo('/auth/redirect') })}>Sign
                           in with {provider.name}</Button>
                     </div>
                  ))}
               
               </Box>
            
            </AuthCard>
         
         </AuthLayout>
      
      </>
   )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: any) {
   const providers = await getProviders()
   return {
      props: { providers },
   }
}

export default Page

// export default Compose(
//    withApollo({ ssr: true }),
//    withAuth({ requireNoAuth: true }),
// )(Page)
