import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { AiOutlineFileDone } from '@react-icons/all-files/ai/AiOutlineFileDone'
import { AiOutlineSnippets } from '@react-icons/all-files/ai/AiOutlineSnippets'
import { BiPlus } from '@react-icons/all-files/bi/BiPlus'
import { VscChecklist } from '@react-icons/all-files/vsc/VscChecklist'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { CourseLayout } from '@slate/components/Layout/CourseLayout'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withCourse } from '@slate/middlewares/dashboard/withCourse'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { StudentOptions } from '@slate/modules/Course/Instructor/Settings/StudentOptions'
import { AssessmentList } from '@slate/modules/Course/Shared/Assessments/AssessmentList'
import { CourseContextMenu } from '@slate/modules/Course/Shared/CourseContextMenu'
import { Compose } from '@slate/next/compose'
import { Button } from 'chalkui/dist/cjs/Components/Button/Button'
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from 'chalkui/dist/cjs/Components/Dropdown/Dropdown'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import dynamic from 'next/dynamic'
import React from 'react'
import { useTranslation } from 'react-i18next'

const AssignmentCreation = dynamic(() => import('@slate/modules/Course/Instructor/Assessments/Assignments/AssignmentCreation'))

const Page = React.memo(() => {
   const { t } = useTranslation(['common'], { useSuspense: false })
   const course = useCurrentCourse()
   const { isOpen: createTestIsOpen, onOpen: createTestOnOpen, onClose: createTestOnClose } = useDisclosure()
   const { isOpen: createAssignmentIsOpen, onOpen: createAssignmentOnOpen, onClose: createAssignmentOnClose } = useDisclosure()
   
   
   return (
      <CourseLayout
         headerMenuIndex={0}
         pageTitle={course.name}
         leftPanel={
            <>
               
               <CourseContextMenu index={2} />
               
               <StudentOptions />
            
            </>
         }
      >
         
         <>
            <ModuleBox
               headerText={t('Assessments')}
               headerIcon={<AiOutlineFileDone />}
               headerAction={
                  <ComponentVisibility.AssistantAndHigher>
                     <Box mb="3">
                        
                        <Dropdown>
                           <DropdownButton
                              as={Button}
                              borderRadius="3xl"
                              colorScheme="primary"
                              leftIcon={<BiPlus />}
                           >
                              {t('Add')}
                           </DropdownButton>
                           <DropdownList>
                              <DropdownItem onClick={createAssignmentOnOpen} icon={<AiOutlineSnippets />}>
                                 {t('Assignment')}
                              </DropdownItem>
                              <DropdownItem onClick={createTestOnOpen} icon={<VscChecklist />}>
                                 {t('Test')}
                              </DropdownItem>
                           </DropdownList>
                        </Dropdown>
                        
                        {createAssignmentIsOpen && <AssignmentCreation isOpen={createAssignmentIsOpen} onClose={createAssignmentOnClose} />}
                     
                     </Box>
                  </ComponentVisibility.AssistantAndHigher>
               }
            >
               
               <AssessmentList />
            
            </ModuleBox>
         
         
         </>
      
      </CourseLayout>
   )
})

export default Compose(
   withApollo(),
   withPageAuthRequired,
   withAuth({ requireActiveAccount: true }),
   withDashboard(),
   withCourse(),
)(Page)

