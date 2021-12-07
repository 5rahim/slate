import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { BiEdit } from '@react-icons/all-files/bi/BiEdit'
import { BiEditAlt } from '@react-icons/all-files/bi/BiEditAlt'
import { BiEraser } from '@react-icons/all-files/bi/BiEraser'
import { BiFolderOpen } from '@react-icons/all-files/bi/BiFolderOpen'
import { BiHeading } from '@react-icons/all-files/bi/BiHeading'
import { BiLink } from '@react-icons/all-files/bi/BiLink'
import { BiPlus } from '@react-icons/all-files/bi/BiPlus'
import { RiArticleLine } from '@react-icons/all-files/ri/RiArticleLine'
import { RiFile3Line } from '@react-icons/all-files/ri/RiFile3Line'
import { RiMistFill } from '@react-icons/all-files/ri/RiMistFill'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { CourseLayout } from '@slate/components/Layout/CourseLayout'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentUnit, useCurrentUnitName } from '@slate/hooks/useCurrentUnit'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
import { useLinkHref } from '@slate/hooks/useLinkHref'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withCourse } from '@slate/middlewares/dashboard/withCourse'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { withUnit } from '@slate/middlewares/dashboard/withUnit'
import { StudentOptions } from '@slate/modules/Course/Instructor/Settings/StudentOptions'
import { UnitEdit } from '@slate/modules/Course/Instructor/Units/UnitEdit'
import { CourseContextMenu } from '@slate/modules/Course/Shared/CourseContextMenu'
import { UnitContent } from '@slate/modules/Course/Shared/Units/UnitContent'
import { Compose } from '@slate/next/compose'
import { DashboardPage } from '@slate/types/Next'
import { Alert, AlertDescription, AlertIcon } from 'chalkui/dist/cjs/Components/Alert'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from 'chalkui/dist/cjs/Components/Breadcrumb'
import { Button } from 'chalkui/dist/cjs/Components/Button/Button'
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from 'chalkui/dist/cjs/Components/Dropdown/Dropdown'
import { Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import Link from 'next/link'
import React from 'react'

const Page = ({ course }: DashboardPage) => {
   const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure()
   const t = useTypeSafeTranslation()
   const { getCourseHref } = useLinkHref()
   const unit = useCurrentUnit()
   const unitName = useCurrentUnitName()
   const cmf = useCMF()
   const { formatDate } = useDateFormatter()
   
   return (
      <CourseLayout
         headerMenuIndex={1}
         pageTitle={unitName + ' | ' + course?.name}
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
                                 <DropdownItem icon={<RiArticleLine />}>
                                    {t('Document')}
                                 </DropdownItem>
                                 <DropdownItem icon={<BiHeading />}>
                                    {t('Text header')}
                                 </DropdownItem>
                                 <DropdownItem icon={<RiFile3Line />}>
                                    {t('File')}
                                 </DropdownItem>
                                 <DropdownItem icon={<BiLink />}>
                                    {t('Link')}
                                 </DropdownItem>
                                 <DropdownItem icon={<RiMistFill />}>
                                    {t('Message')}
                                 </DropdownItem>
                                 <DropdownItem icon={<BiEditAlt />}>
                                    {t('Quiz')}
                                 </DropdownItem>
                                 <DropdownItem icon={<BiEraser />}>
                                    {t('Assignment')}
                                 </DropdownItem>
                              </DropdownList>
                           </Dropdown>
                        
                        </Flex>
                     </ComponentVisibility.InstructorOnly>
                  }
               >
                  
                  <Breadcrumb
                     bgColor={cmf('gray.100', 'gray.700')}
                     padding="2"
                     borderRadius="md"
                     mb="3"
                  >
                     <BreadcrumbItem>
                        <Link href={getCourseHref('/content')}>
                           <BreadcrumbLink>{t('course:Course Content')}</BreadcrumbLink>
                        </Link>
                     </BreadcrumbItem>
                     
                     <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>{unitName}</BreadcrumbLink>
                     </BreadcrumbItem>
                  
                  </Breadcrumb>
                  
                  {unit.archived && <Alert mb="3" status="warning" variant="secondary">
                      <AlertIcon />
                      <AlertDescription>{t('course:options.unit.is archived')}</AlertDescription>
                  </Alert>}
                  
                  {!unit.archived && !unit.available && !unit.is_scheduled && <Alert mb="3" status="warning" variant="secondary">
                      <AlertIcon />
                      <AlertDescription>{t('course:options.unit.not available')}</AlertDescription>
                  </Alert>}
                  
                  {!unit.archived && !unit.available && unit.is_scheduled && <Alert mb="3" status="info" variant="secondary">
                      <AlertIcon />
                      <AlertDescription>{t('course:options.unit.will be available')} {formatDate(unit.publish_on, 'short with hours')}</AlertDescription>
                  </Alert>}
                  
                  <UnitContent />
               
               </ModuleBox>
            </Box>
         </>
      
      </CourseLayout>
   )
}

export default Compose(
   withApollo(),
   withPageAuthRequired,
   withAuth({ requireActiveAccount: true }),
   withDashboard(),
   withCourse(),
   withUnit(),
)(Page)

