import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { BiEdit } from '@react-icons/all-files/bi/BiEdit'
import { BiFolderOpen } from '@react-icons/all-files/bi/BiFolderOpen'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { CourseLayout } from '@slate/components/Layout/CourseLayout'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useCurrentUnit, useCurrentUnitName } from '@slate/hooks/useCurrentUnit'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
import { useLinkHref } from '@slate/hooks/useLinkHref'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withCourse } from '@slate/middlewares/dashboard/withCourse'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { withUnit } from '@slate/middlewares/dashboard/withUnit'
import { StudentOptions } from '@slate/modules/Course/Instructor/Settings/StudentOptions'
import { UnitModuleCreation } from '@slate/modules/Course/Instructor/Units/Modules/UnitModuleCreation'
import { UnitEdit } from '@slate/modules/Course/Instructor/Units/UnitEdit'
import { CourseContextMenu } from '@slate/modules/Course/Shared/CourseContextMenu'
import { UnitContent } from '@slate/modules/Course/Shared/Units/UnitContent'
import { Compose } from '@slate/next/compose'
import { Button } from 'chalkui/dist/cjs/Components/Button/Button'
import { Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import React from 'react'

const Page = React.memo(() => {
   const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure()
   const t = useTypeSafeTranslation()
   const { getCourseHref } = useLinkHref()
   const unit = useCurrentUnit()
   const course = useCurrentCourse()
   const unitName = useCurrentUnitName()
   const cmf = useCMF()
   const { formatDate } = useDateFormatter()
   
   return (
      <CourseLayout
         headerMenuIndex={1}
         pageTitle={unitName + ' - ' + course.name}
         leftPanel={
            <>
               
               <CourseContextMenu index={1} />
               
               <StudentOptions />
            
            </>
         }
      >
         
         <>
            
            <UnitEdit
               isOpen={editIsOpen}
               onClose={editOnClose}
               data={unit}
            />
            
            <Box>
               
               <ModuleBox
                  headerText={unitName}
                  headerIcon={<BiFolderOpen />}
                  headerAction={
                     <ComponentVisibility.InstructorOnly>
                        <Flex gridGap=".5rem">
                           <Button
                              onClick={editOnOpen}
                              variant="outline"
                              borderRadius="3xl"
                              colorScheme="primary"
                              leftIcon={<BiEdit />}
                           >
                              {t('Edit')}
                           </Button>
                           
                           <UnitModuleCreation />
                        
                        </Flex>
                     </ComponentVisibility.InstructorOnly>
                  }
               >
                  
                  <UnitContent />
               
               </ModuleBox>
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
   withUnit(),
)(Page)

