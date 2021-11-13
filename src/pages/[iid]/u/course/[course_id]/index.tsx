import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { AnnouncementCreation } from '@slate/components/Course/Instructor/Announcements/AnnouncementCreation'
import { CourseOptions } from '@slate/components/Course/Instructor/Settings/CourseOptions'
import { Customization } from '@slate/components/Course/Instructor/Settings/Customization'
import { StudentOptions } from '@slate/components/Course/Instructor/Settings/StudentOptions'
import { AnnouncementList } from '@slate/components/Course/Shared/Announcements/AnnouncementList'
import { CourseContentModule } from '@slate/components/Course/Student/CourseContentModule'
import { CourseDetailsModule } from '@slate/components/Course/Student/CourseDetailsModule'
import { GroupModule } from '@slate/components/Course/Student/GroupModule'
import { CourseLayout } from '@slate/components/Layout/CourseLayout'
import { PermissionComponent } from '@slate/components/Permissions'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { withApollo } from '@slate/graphql/withApollo'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withCourse } from '@slate/middlewares/dashboard/withCourse'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { Compose } from '@slate/next/compose'
import { DashboardPage } from '@slate/types/Next'
import { Utils } from '@slate/utils'
import { Box } from 'chalkui/dist/cjs/React'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineSpeakerphone } from 'react-icons/hi'


const Page = ({ course, iid }: DashboardPage) => {
   const { t } = useTranslation(['common'], { useSuspense: false })
   
   const router = useRouter()
   
   useEffect(() => {
      async function prefetch() {
         await router.prefetch(Utils.Url.schoolLinkTo(iid, `/course/${course?.id}/content`))
      }
      
      prefetch()
   }, [])
   
   
   return (
      <CourseLayout
         pageTitle={course?.name}
         nav={
            <>
               <PermissionComponent.StudentOnly>
                  
                  <CourseContentModule index={0} />
                  
                  <CourseDetailsModule />
                  
                  <GroupModule />
               
               </PermissionComponent.StudentOnly>
               
               <PermissionComponent.InstructorOnly>
                  
                  <CourseOptions />
                  
                  <StudentOptions />
               
               </PermissionComponent.InstructorOnly>
            </>
         }
      >
         
         <>
            <Box>
               
               <ModuleBox headerText={t('Announcements')} headerIcon={<HiOutlineSpeakerphone />}>
                  
                  <AnnouncementCreation />
                  
                  <AnnouncementList height="800px" />
               
               </ModuleBox>
            </Box>
            
            <PermissionComponent.InstructorOnly>
               
               <Box>
                  <Customization />
               </Box>
            
            </PermissionComponent.InstructorOnly>
         </>
      
      </CourseLayout>
   )
}

export default Compose(
   withPageAuthRequired,
   withApollo({ ssr: true }),
   withAuth({ requireActiveAccount: true }),
   // withCacheReset(),
   withDashboard(),
   withCourse(),
)(Page)

