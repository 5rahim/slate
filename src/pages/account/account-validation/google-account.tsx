import { useMutation } from '@apollo/client'
import AuthLayout from '@slate/components/Layout/AuthLayout'
import { DefaultHead } from '@slate/components/Layout/DefaultHead'
import AuthCard from '@slate/components/UI/AuthCard'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { UPDATE_PROSPECTIVE_USER_EMAIL } from '@slate/graphql/schemas/prospective_users/mutations'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { Compose } from '@slate/next/compose'
import { Utils } from '@slate/utils'
import { Box, ListItem, UnorderedList } from 'chalkui/dist/cjs/Components/Layout'
import { Alert, AlertDescription, AlertIcon, Button, FormControl, FormLabel, Input, Text } from 'chalkui/dist/cjs/React'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'


const Page: NextPage = () => {
   
   const { t, i18n } = useTranslation(['common', 'contact', 'form', 'auth'], { useSuspense: false })
   
   const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm()
   
   const [cookies, setCookie, removeCookie] = useCookies(['prospective-user-data'])
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const router = useRouter()
   const [prospectiveUser, setProspectiveUser] = useState<any>(null)
   
   useEffect(() => {
      
      console.log(cookies['prospective-user-data'])
      
      setProspectiveUser(cookies['prospective-user-data'])
      
      if (!cookies['prospective-user-data']) {
         router.push(`/account/new`)
      }
      
   }, [])
   
   const [updateProspectiveUserEmail, { loading }] = useMutation(UPDATE_PROSPECTIVE_USER_EMAIL, {
      onError: () => {
      
      },
      onCompleted: () => {
         setIsLoading(true)
         window.location.href = Utils.Url.schoolLinkTo(prospectiveUser.school.short_name, '/')
         removeCookie('prospective-user-data')
         // @ts-ignore
         removeCookie('account-validation-step')
      },
   })
   
   const onSubmit = (data: any) => {
      updateProspectiveUserEmail({
         variables: { student_id: prospectiveUser.student_id, email: data.email.toLowerCase().trim(), registration_step: 3 },
      })
   }
   
   function handleNextStep() {
      // router.push(Utils.Url.linkToLogin())
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
                           <ListItem>Your Google account's name will not be used by Slate</ListItem>
                           <ListItem>Your email address will remain private</ListItem>
                           <ListItem>You will need your Google account to sign in to your Slate account</ListItem>
                           <ListItem>Your Gmail address will be used to contact you and for you to receive notifications</ListItem>
                        </Trans>
                     </UnorderedList>
                  </Box>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                     
                     <Text>
                        <strong></strong>
                     </Text>
                     
                     <Alert mb={2} status="error" variant="secondary">
                        {/*<AlertIcon />*/}
                        <AlertDescription>
                           {t('auth:validation.Valid email address')}
                        </AlertDescription>
                     </Alert>
                     
                     <FormControl mb={3} id="student_id" isRequired={true}>
                        <FormLabel>{t('form:Email address')}</FormLabel>
                        <Input {...register("email", { required: true })} type="email" placeholder={t('form:Email address')} />
                     </FormControl>
                     
                     <Button
                        isLoading={loading || isLoading} width="100%" colorScheme="brand.700" mb={2}
                        type="submit"
                     >{t('auth:validation.Continue')}</Button>
                  
                  </form>
                  
                  <Button
                     mt={5} width="100%" colorScheme="red.500" variant="link" as="a" target="_blank"
                     href="https://accounts.google.com/signup"
                  >{t('auth:validation.I don\'t have a Google account')}</Button>
               
               
               </Box>
            
            </AuthCard>
         
         </AuthLayout>
      
      </>
   
   )
}


export default Compose(
   withApollo(),
   withAuth({ requireNoAuth: true }),
)(Page)
