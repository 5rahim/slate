import { useSession } from 'next-auth/client'
import { DefaultHead } from '../../components/Layout/DefaultHead'
import AuthLayout from '../../components/Layout/AuthLayout'
import AuthCard from '../../ui/AuthCard'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Button, FormControl, FormLabel, Input } from 'chalkui/dist/cjs/React'
import { useTranslation } from 'react-i18next'
import AuthLayout from 'slate/components/Layout/AuthLayout'
import { DefaultHead } from 'slate/components/Layout/DefaultHead'
import AuthCard from 'slate/components/UI/AuthCard'
import { LoadingScreen } from 'slate/components/UI/LoadingScreen'
import { useLazyProspectiveUserByStudentID } from 'slate/graphql/queries/prospective_users/hooks'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { UPDATE_NEW_USER } from 'slate/graphql/queries/users/mutations'
import { getUserBySessionProfile } from 'slate/graphql/queries/users/hooks'
import { GET_USER_BY_EMAIL_QUERY } from 'slate/graphql/queries/users/queries'
import { Utils } from 'slate/utils'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useUserSessionProfile } from 'slate/hooks/use-current-user'
import { Compose } from 'slate/next/compose'
import { Utils } from 'slate/utils'


function Page() {
   
   const { t, i18n } = useTranslation(['common', 'contact', 'form', 'auth'], { useSuspense: false })
   
   const router = useRouter()
   
   const { profile, profileIsLoading } = useUserSessionProfile()
   const { register, handleSubmit, reset, formState: { errors } } = useForm()
   
   const [prospectiveUserStudentID, setProspectiveUserStudentID] = useState<any>("")
   
   const [user, userLoading] = getUserBySessionProfile(profile)
   
   /**
    * If the account is already activated, redirect the user
    */
   useEffect(() => {
      if (user?.is_active) {
         router.push(Utils.Url.schoolLinkTo(profile?.iid, '/'))
      }
   }, [user])
   
   /**
    * Query prospective user after form is submitted
    */
   const [loadProspectiveUser, {
      loading: queryLoading, data: prospectiveUser, error, called,
   }] = useLazyProspectiveUserByStudentID(prospectiveUserStudentID)
   
   
   /**
    * Mutation: Update the user's info and redirect
    */
   const [updateNewUser] = useMutation(UPDATE_NEW_USER, {
      onError: (error) => {
         // router.push(Utils.Url.baseLinkTo('/auth/redirect'))
      },
      onCompleted: () => {
         reset()
         // props.onClose()
         router.push(Utils.Url.baseLinkTo('/auth/redirect'))
      },
      refetchQueries: [
         { query: GET_USER_BY_EMAIL_QUERY }, // DocumentNode object parsed with gql
         'GetUserByEmail', // Query name
      ],
   })
   
   const [activateProspectiveUser] = useMutation(ACTIVATE_PROSPECTIVE_USER)
   
   // Load prospective user
   useEffect(() => {
      loadProspectiveUser()
   }, [prospectiveUserStudentID])
   
   const onSubmit = (data: any) => {
      setProspectiveUserStudentID(data.student_id)
   }
   
   useEffect(() => {
      if (prospectiveUser && profile) {
         
         updateNewUser({
            variables: {
               email: profile.email,
               first_name: prospectiveUser.first_name,
               middle_name: prospectiveUser.middle_name ?? "",
               last_name: prospectiveUser.last_name,
               school_id: prospectiveUser.school_id,
               student_id: prospectiveUser.student_id,
               username: prospectiveUser.username,
            },
         })
         
         activateProspectiveUser({
            variables: {
               student_id: prospectiveUser.student_id,
            },
         })
         
         // router.push(Utils.Url.baseLinkTo('/auth/redirect'))
         
      }
   }, [prospectiveUser])
   
   
   if (profileIsLoading || userLoading || user?.is_active) {
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
   withPageAuthRequired,
   withApollo({ ssr: true }),
)(Page)
