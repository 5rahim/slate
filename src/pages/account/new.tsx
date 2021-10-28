import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { DefaultHead } from '../../components/Layout/DefaultHead'
import withApollo from '../../graphql/withApollo'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import AuthLayout from '../../components/Layout/AuthLayout'
import { Button, FormControl, FormLabel, Input, Text } from 'chalkui/dist/cjs/React'
import { useCookies } from 'react-cookie'
import { useLazyProspectiveUser } from '../../graphql/queries/prospective_users/hooks'
import AuthCard from '../../ui/AuthCard'
import { compose } from 'redux'
import { withAuth } from '../../middlewares/auth/withAuth'

const Page: NextPage = () => {
   
   const [displayCode, setDisplayCode] = useState<boolean>(false)
   const [isLoading, setIsLoading] = useState(false)
   const [prospectiveUserData, setProspectiveUserData] = useState<any>(null)
   
   const { register, handleSubmit, formState: { errors } } = useForm()
   const { t } = useTranslation(['common', 'form'], { useSuspense: false })
   const [cookies, setCookie, removeCookie] = useCookies()
   
   const router = useRouter()
   
   const [loadProspectiveUser, { loading, data: prospectiveUser }] = useLazyProspectiveUser(prospectiveUserData?.student_id, prospectiveUserData?.code)
   
   const onSubmit = (form_data: any) => {
      setProspectiveUserData({ student_id: form_data.student_id, code: form_data.code })
   }
   
   useEffect(() => {
      setIsLoading(loading)
   }, [loading])
   
   // Load prospective user
   useEffect(() => {
      loadProspectiveUser()
   }, [prospectiveUserData])
   
   useEffect(() => {
      if (prospectiveUser) {
         setCookie('prospective-user-data', prospectiveUser)
         router.push(`/account/account-validation`)
      }
   }, [prospectiveUser])
   
   
   return (
      
      <>
         
         <DefaultHead pageTitle={t('Sign up')} />
         
         <AuthLayout>
            
            <AuthCard title={t('Sign up')}>
               
               <Box p={3}>
                  
                  <Text mb={2}>
                     Use the student ID and the code provided to you by your school to register your new account.
                  </Text>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                     
                     
                     <FormControl mb={3} id="student_id" isRequired={true}>
                        <FormLabel>{t('form:Student ID')}</FormLabel>
                        <Input {...register("student_id", { required: true })} placeholder={t('form:Student ID')} />
                     </FormControl>
                     
                     
                     <FormControl mb={3} id="code" isRequired={true}>
                        <FormLabel>{t('form:Code')}</FormLabel>
                        <Input {...register("code", { required: true })} placeholder={t('form:Code')} type={displayCode ? "text" : "password"} />
                     </FormControl>
                     
                     <Button variant="link" mb={3} onClick={() => setDisplayCode(dp => !dp)} colorScheme="secondary">{displayCode ? "Cacher le code" : "Voir le code"}</Button>
                     
                     <Button colorScheme="brand.100" width="100%" type="submit" isLoading={isLoading}>{t('form:Register my account')}</Button>
                  
                  </form>
               
               
               </Box>
            
            </AuthCard>
         
         
         </AuthLayout>
      
      </>
   
   )
}

export default compose(
   withApollo({ ssr: true }),
   withAuth({ requireNoAuth: true }),
)(Page)

