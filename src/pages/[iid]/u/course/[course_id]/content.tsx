import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CourseHeader } from '@slate/components/Course/CourseHeader'
import { DefaultHead } from '@slate/components/Layout/DefaultHead'
import UserDashboardLayout from '@slate/components/Layout/UserDashboard/UserDashboardLayout'
import { withApollo } from '@slate/graphql/withApollo'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withCourse } from '@slate/middlewares/dashboard/withCourse'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { Compose } from '@slate/next/compose'
import { DashboardPage } from '@slate/types/Next'


const Page = ({ user, school, course }: DashboardPage) => {
   
   const { t, i18n } = useTranslation(['common'], { useSuspense: false })
   
   const router = useRouter()
   const { id } = router.query
   
   return (
      <>
         <DefaultHead pageTitle={t('Course Content | Geology 121')} />
         
         <UserDashboardLayout>
            {/*<IndexHeader />*/}
            
            <CourseHeader index={1} />
            
            Content
         
         </UserDashboardLayout>
      </>
   )
}

export default Compose(
   withPageAuthRequired,
   withApollo({ ssr: true }),
   withAuth({ requireActiveAccount: true }),
   withDashboard(),
   withCourse(),
)(Page)

