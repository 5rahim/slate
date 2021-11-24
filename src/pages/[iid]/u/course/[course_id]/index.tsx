import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { CourseLayout } from '@slate/components/Layout/CourseLayout'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withCourse } from '@slate/middlewares/dashboard/withCourse'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { AnnouncementCreation } from '@slate/modules/Course/Instructor/Announcements/AnnouncementCreation'
import { CourseOptions } from '@slate/modules/Course/Instructor/Settings/CourseOptions'
import { Customization } from '@slate/modules/Course/Instructor/Settings/Customization'
import { StudentOptions } from '@slate/modules/Course/Instructor/Settings/StudentOptions'
import { AnnouncementList } from '@slate/modules/Course/Shared/Announcements/AnnouncementList'
import { CourseContextMenu } from '@slate/modules/Course/Shared/CourseContextMenu'
import { CourseDetails } from '@slate/modules/Course/Student/CourseDetails'
import { Compose } from '@slate/next/compose'
import { DashboardPage } from '@slate/types/Next'
import { Box } from 'chalkui/dist/cjs/React'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineSpeakerphone } from 'react-icons/hi'


const Page = ({ course, iid }: DashboardPage) => {
   const { t } = useTranslation(['common'], { useSuspense: false })
   
   const router = useRouter()
   
   
   return (
      <CourseLayout
         pageTitle={course?.name}
         leftPanel={
            <>
               
               <CourseContextMenu index={0} />
               
               <StudentOptions />
            
            </>
         }
         rightPanel={
            <>
               
               <CourseDetails />
               
               <CourseOptions />
               
            </>
         }
      >
         
         <>
            <Box>
               
               <ModuleBox headerText={t('Announcements')} headerIcon={<HiOutlineSpeakerphone />} headerAction={<AnnouncementCreation />}>
                  
                  <AnnouncementList maxHeight="800px" />
               
               </ModuleBox>
            </Box>
            
            <ComponentVisibility.InstructorOnly>
               
               <Box>
                  <Customization />
               </Box>
            
            </ComponentVisibility.InstructorOnly>
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

