import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { BiArchive } from '@react-icons/all-files/bi/BiArchive'
import { BiFolderOpen } from '@react-icons/all-files/bi/BiFolderOpen'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { CourseLayout } from '@slate/components/Layout/CourseLayout'
import { MediaComponent } from '@slate/components/Layout/MediaQueries/MediaComponent'
import { useStudentPicker } from '@slate/components/StudentPicker/useStudentPicker'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withCourse } from '@slate/middlewares/dashboard/withCourse'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { StudentOptions } from '@slate/modules/Course/Instructor/Settings/StudentOptions'
import { CourseContextMenu } from '@slate/modules/Course/Shared/CourseContextMenu'
import { UnitList } from '@slate/modules/Course/Shared/Units/UnitList'
import { CourseDetails } from '@slate/modules/Course/Student/CourseDetails'
import { Compose } from '@slate/next/compose'
import { DashboardPage } from '@slate/types/Next'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { ButtonGroup } from 'chalkui/dist/cjs/Components/Button/ButtonGroup'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Flex } from 'chalkui/dist/cjs/Components/Layout/Flex'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import dynamic from 'next/dynamic'
import React from 'react'

const CourseOptions = dynamic(() => import('@slate/modules/Course/Instructor/Settings/CourseOptions'))
const UnitArchive = dynamic(() => import('@slate/modules/Course/Instructor/Units/UnitArchive'))
const UnitCreation = dynamic(() => import('@slate/modules/Course/Instructor/Units/UnitCreation'))
const StudentPicker = dynamic(() => import('@slate/components/StudentPicker'))
const Customization = dynamic(() => import('@slate/modules/Course/Instructor/Settings/Customization'))


const Page = React.memo(({ user, school, course }: DashboardPage) => {
   const { isOpen: archiveIsOpen, onOpen: archiveOnOpen, onClose: archiveOnClose } = useDisclosure()
   const { isOpen: createIsOpen, onOpen: createOnOpen, onClose: createOnClose } = useDisclosure()
   
   const t = useTypeSafeTranslation()
   
   const { studentPickerProps } = useStudentPicker('[]')
   
   return (
      <CourseLayout
         headerMenuIndex={0}
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
               
               <MediaComponent.ShowOnTabletAndSmaller>
                  <Box mb="5">
                     <ButtonGroup width="100%" colorScheme="brand.100">
                        <Button borderRadius="xl" width="100%">{t('Quizzes')}</Button>
                        <Button borderRadius="xl" width="100%">{t('Assignments')}</Button>
                     </ButtonGroup>
                  </Box>
               </MediaComponent.ShowOnTabletAndSmaller>
               
               <ModuleBox
                  headerText={t('Content')}
                  headerIcon={<BiFolderOpen />}
                  headerAction={
                  <Flex gridGap=".5rem">
                     
                     <ComponentVisibility.InstructorOnly>
                        <Button
                           onClick={archiveOnOpen}
                           variant="outline"
                           borderRadius="3xl"
                           colorScheme="primary"
                           leftIcon={<BiArchive />}
                        >
                           {t('course:Archive')}
                        </Button>
                        
                        {archiveIsOpen && <UnitArchive isOpen={archiveIsOpen} onClose={archiveOnClose} />}
                        
                        
                        <Box>
                           
                           <Button
                              borderRadius="2rem"
                              colorScheme="brand.100"
                              size="md"
                              onClick={createOnOpen}
                           >
                              {t('Create')}
                           </Button>
                        
                        </Box>
                        
                        {createIsOpen && <UnitCreation isOpen={createIsOpen} onClose={createOnClose} />}
                     </ComponentVisibility.InstructorOnly>
                  </Flex>
               }
               >
                  
                  <ComponentVisibility.AssistantAndHigher>
                     <StudentPicker {...studentPickerProps} />
                  </ComponentVisibility.AssistantAndHigher>
                  
                  <UnitList />
               
               </ModuleBox>
   
               <ComponentVisibility.InstructorOnly>
      
                  <Box mt="1rem">
                     <Customization />
                  </Box>
   
               </ComponentVisibility.InstructorOnly>
               
            </Box>
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

