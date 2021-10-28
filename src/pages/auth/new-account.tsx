import { useSession } from 'next-auth/client'
import { DefaultHead } from '../../components/Layout/DefaultHead'
import AuthLayout from '../../components/Layout/AuthLayout'
import AuthCard from '../../ui/AuthCard'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Button, FormControl, FormLabel, Input } from 'chalkui/dist/cjs/React'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { useRouter } from 'next/router'
import { Compose } from '../../next/compose'
import { withAuth } from '../../middlewares/auth/withAuth'
import withApollo from '../../graphql/withApollo'
import { useLazyProspectiveUserByStudentID } from '../../graphql/queries/prospective_users/hooks'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { UPDATE_NEW_USER } from '../../graphql/queries/users/mutations'
import { getUserBySession } from '../../graphql/queries/users/hooks'
import { GET_USER_BY_EMAIL_QUERY } from '../../graphql/queries/users/query'
import { Utils } from '../../utils'


function Page() {
   
   const { t, i18n } = useTranslation(['common', 'contact', 'form', 'auth'], { useSuspense: false })
   
   const router = useRouter()
   const [session, loading] = useSession()
   const { register, handleSubmit, reset, formState: { errors } } = useForm()
   
   const [prospectiveUserStudentID, setProspectiveUserStudentID] = useState<any>("")
   
   const { loading: userLoading, user } = getUserBySession(session)
   
   useEffect(() => {
      console.log(user)
      if (user?.is_active) {
         router.push('/')
      }
   }, [user])
   
   const [loadProspectiveUser, { loading: queryLoading, data: prospectiveUser, error, called }] = useLazyProspectiveUserByStudentID(prospectiveUserStudentID)
   
   useEffect(() => {
      console.log('called', prospectiveUser)
   }, [prospectiveUser])
   
   const [updateNewUser] = useMutation(UPDATE_NEW_USER, {
      onError: () => {
         router.push(Utils.Url.baseLinkTo('/auth/redirect'))
      },
      onCompleted: () => {
         reset()
         // props.onClose()
         router.push(Utils.Url.baseLinkTo('/auth/redirect'))
      },
      refetchQueries: [
         { query: GET_USER_BY_EMAIL_QUERY }, // DocumentNode object parsed with gql
         'GetUserByEmail' // Query name
      ],
   })
   
   // Load prospective user
   useEffect(() => {
      loadProspectiveUser()
   }, [prospectiveUserStudentID])
   
   const onSubmit = (data: any) => {
      setProspectiveUserStudentID(data.student_id)
   }
   
   useEffect(() => {
      if (prospectiveUser && session) {
         
         updateNewUser({
            variables: {
               email: session?.user?.email,
               first_name: prospectiveUser.first_name,
               middle_name: prospectiveUser.middle_name ?? "",
               last_name: prospectiveUser.last_name,
               school_id: prospectiveUser.school_id,
               student_id: prospectiveUser.student_id,
               username: prospectiveUser.username,
               role: prospectiveUser.role
            }
         })
   
         router.push(Utils.Url.baseLinkTo('/auth/redirect'))
         
      }
   }, [prospectiveUser])
   
   
   if (loading || userLoading || user?.is_active) {
      return <LoadingScreen />
   }
   
   
   return (
      
      <>
         
         <DefaultHead pageTitle={t('Final step')} />
         
         <AuthLayout>
            
            <AuthCard title={t('Final step')}>
               
               <Box p={3}>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                     
                     <FormControl mb={3} id="student_id" isRequired={true}>
                        <FormLabel>{t('form:Confirm Student ID')}</FormLabel>
                        <Input {...register("student_id", { required: true })} placeholder={t('form:Student ID')} />
                     </FormControl>
                     
                     <Button colorScheme="brand.100" width="100%" type="submit" isLoading={queryLoading}>{t('form:Register my account')}</Button>
                  
                  </form>
               
               </Box>
            
            </AuthCard>
         
         </AuthLayout>
      
      </>
   )
}


export default Compose(
   withApollo({ ssr: true }),
   withAuth({ requireAuth: true }),
)(Page)
