import { AiOutlineSnippets } from '@react-icons/all-files/ai/AiOutlineSnippets'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentAssignment } from '@slate/hooks/useCurrentAssignment'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withAssignment } from '@slate/middlewares/dashboard/withAssignment'
import { withCourse } from '@slate/middlewares/dashboard/withCourse'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { StudentOptions } from '@slate/modules/Course/Instructor/Settings/StudentOptions'
import { CourseContextMenu } from '@slate/modules/Course/Shared/CourseContextMenu'
import { Compose } from '@slate/next/compose'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import dynamic from 'next/dynamic'
import React, { memo, useEffect } from 'react'

const CourseLayout = dynamic(() => import('@slate/components/Layout/CourseLayout'))
const AssignmentAttempts = dynamic(() => import('@slate/modules/Course/Student/Assessments/Assignments/AssignmentAttempts'))

const Page = memo(({ displayPage }: any) => {
   const t = useTypeSafeTranslation()
   const course = useCurrentCourse()
   const cmf = useCMF()
   const assignment = useCurrentAssignment()
   
   useEffect(() => {
      console.log(assignment)
   }, [assignment])
   
   return (
      <CourseLayout
         displayPage={displayPage}
         headerMenuIndex={2}
         pageTitle={assignment?.name + ' - ' + course.name}
         leftPanel={
            <>
               
               <CourseContextMenu index={2} />
               
               <StudentOptions />
            
            </>
         }
      >
         
         <>
            
            <Box>
               
               <ModuleBox
                  headerStyle
                  headerColor="#403e3d"
                  headerText={assignment?.name}
                  headerIcon={<AiOutlineSnippets />}
                  headerAction={
                     <ComponentVisibility.AssistantAndHigher>
                     
                     </ComponentVisibility.AssistantAndHigher>
                  }
               >
                  
                  <AssignmentAttempts />
               
               </ModuleBox>
            </Box>
         </>
      
      </CourseLayout>
   )
})

export default Compose(
   withApollo(),
   withAuth({ requireActiveAccount: true }),
   withDashboard(),
   withCourse(),
   withAssignment(),
)(Page)

