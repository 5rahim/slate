import { withApollo } from '../../../../graphql/withApollo'
import UserDashboardLayout from '../../../../components/Layout/UserDashboard/UserDashboardLayout'
import React from 'react'
import { Compose } from 'slate/next/compose'
import { withAuth } from 'slate/middlewares/auth/withAuth'
import { withDashboard } from 'slate/middlewares/dashboard/withDashboard'
import { DefaultHead } from 'slate/components/Layout/DefaultHead'
import { useTranslation } from 'react-i18next'
import { DashboardPage } from 'slate/next/types'
import { useRouter } from 'next/router'
import { withCourse } from 'slate/middlewares/dashboard/withCourse'
import { CourseHeader } from 'slate/components/Course/CourseHeader'


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
   withApollo({ ssr: true }),
   withAuth({ requireAuth: true, requireActiveAccount: true }),
   withDashboard(),
   withCourse(),
)(Page)

