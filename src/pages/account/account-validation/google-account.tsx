import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { DefaultHead } from '../../../components/Layout/DefaultHead'
import withApollo from '../../../graphql/withApollo'
import { Box, ListItem, UnorderedList } from 'chalkui/dist/cjs/Components/Layout'
import AuthLayout from '../../../components/Layout/AuthLayout'
import { Alert, AlertDescription, AlertIcon, Button, Text } from 'chalkui/dist/cjs/React'
import { useCookies } from 'react-cookie'
import AuthCard from '../../../ui/AuthCard'
import { Compose } from '../../../next/compose'
import { withAuth } from '../../../middlewares/auth/withAuth'
import { Utils } from '../../../utils'


const Page: NextPage = () => {
   
   const { t, i18n } = useTranslation(['common', 'contact', 'form', 'auth'], { useSuspense: false })
   
   const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm()
   
   const [cookies, setCookie, removeCookie] = useCookies(['prospective-user-data'])
   
   const [step, setStep] = useState<number>(0)
   
   const [isActive, setActive] = useState<boolean>(true)
   const router = useRouter()
   const [isLoading, setIsLoading] = useState(false)
   const [formSubmitted, setFormSubmitted] = useState(false)
   const [prospectiveUser, setProspectiveUser] = useState<any>(null)
   
   useEffect(() => {
      
      setProspectiveUser(cookies['prospective-user-data'])
      
      if (!cookies['prospective-user-data']) {
         router.push(`/account/sign-up`)
      }
      
   }, [])
   
   const onSubmit = (data: any) => {
      setIsLoading(true)
      setCookie('prospective-user-data', data)
   }
   
   function handleNextStep() {
      router.push(Utils.Url.baseLinkTo('/auth/signin'))
   
   }
   
   
   return (
      
      <>
         
         <DefaultHead pageTitle={t('Account validation')} />
         
         <AuthLayout>
            
            <AuthCard title={t('Account validation')}>
               
               <Box p={3}>
                  
                  <Alert mb={2} status="warning" variant="secondary">
                     <AlertIcon />
                     <AlertDescription>
                        {Utils.Names.formatLocaleNames(i18n.language, prospectiveUser?.first_name, prospectiveUser?.last_name)}, {t('auth:validation.You need a google account')}
                        {/*<Button ml={2} variant="link" colorScheme="green.700" as="a" target="_blank" href="https://accounts.google.com/signup/v2/webcreateaccount?hl=en&flowName=GlifWebSignIn&flowEntry=SignUp">Don't have one? Create an account.</Button>*/}
                     </AlertDescription>
                  </Alert>
                  
                  <Box mb={3}>
                     <Text>
                        <strong>{t('auth:validation.What you need to know')}</strong>
                     </Text>
                     <UnorderedList>
                        <Trans ns="auth" i18nKey="validation.whatYouNeedToKnow">
                           <ListItem>Your Google account's name and profile picture will not be used by Slate</ListItem>
                           <ListItem>Your email address will remain private</ListItem>
                           <ListItem>You will need your Google account to sign in to your Slate account</ListItem>
                           <ListItem>Your Gmail address will be used to contact you and for you to receive notifications</ListItem>
                        </Trans>
                     </UnorderedList>
                  </Box>
                  
                  <Button width="100%" colorScheme="brand.700" mb={2} onClick={handleNextStep}>{t('auth:validation.I have a Google account')}</Button>
                  <Button width="100%" colorScheme="red.500" variant="link" as='a' target="_blank" href="https://accounts.google.com/signup">{t('auth:validation.I don\'t have a Google account')}</Button>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                  
                  
                  </form>
               
               </Box>
            
            </AuthCard>
         
         </AuthLayout>
      
      </>
   
   )
}


export default Compose(
   withApollo({ ssr: true }),
   withAuth({ requireNoAuth: true })
)(Page)
