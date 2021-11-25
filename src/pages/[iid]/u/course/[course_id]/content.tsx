import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CourseLayout } from '@slate/components/Layout/CourseLayout'
import { MediaComponent } from '@slate/components/Layout/MediaQueries/MediaComponent'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withCourse } from '@slate/middlewares/dashboard/withCourse'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { StudentOptions } from '@slate/modules/Course/Instructor/Settings/StudentOptions'
import { CourseContextMenu } from '@slate/modules/Course/Shared/CourseContextMenu'
import { Compose } from '@slate/next/compose'
import { DashboardPage } from '@slate/types/Next'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { Box, ButtonGroup } from 'chalkui/dist/cjs/React'
import React from 'react'
import { BiFolderOpen } from 'react-icons/bi'


const Page = ({ user, school, course }: DashboardPage) => {
   
   const t = useTypeSafeTranslation()
   
   return (
      <CourseLayout
         headerMenuIndex={1}
         pageTitle={course?.name}
         leftPanel={
            <>
               
               <CourseContextMenu index={1} />
               
               <StudentOptions />
            
            </>
         }
      >
         
         <>
            <Box>
               
               <MediaComponent.ShowOnMobileOnly>
                  <Box mb="5">
                     <ButtonGroup width="100%" colorScheme="brand.100">
                        <Button borderRadius="xl" width="100%">Quizzes</Button>
                        <Button borderRadius="xl" width="100%">Assignments</Button>
                     </ButtonGroup>
                  </Box>
               </MediaComponent.ShowOnMobileOnly>
               
               <ModuleBox headerText={t('Content')} headerIcon={<BiFolderOpen />}>
               
               </ModuleBox>
            </Box>
         </>
      
      </CourseLayout>
   )
}

export default Compose(
   withPageAuthRequired,
   withApollo({ ssr: true }),
   withAuth({ requireActiveAccount: true }),
   withDashboard(),
   withCourse(),
)(Page)

