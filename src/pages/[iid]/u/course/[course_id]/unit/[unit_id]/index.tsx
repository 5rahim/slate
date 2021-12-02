import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CourseLayout } from '@slate/components/Layout/CourseLayout'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { useCurrentUnit, useCurrentUnitName } from '@slate/hooks/useCurrentUnit'
import { useLinkHref } from '@slate/hooks/useLinkHref'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withCourse } from '@slate/middlewares/dashboard/withCourse'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { withUnit } from '@slate/middlewares/dashboard/withUnit'
import { StudentOptions } from '@slate/modules/Course/Instructor/Settings/StudentOptions'
import { UnitEdit } from '@slate/modules/Course/Instructor/Units/UnitEdit'
import { CourseContextMenu } from '@slate/modules/Course/Shared/CourseContextMenu'
import { Compose } from '@slate/next/compose'
import { DashboardPage } from '@slate/types/Next'
import { Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, useDisclosure } from 'chalkui/dist/cjs/React'
import Link from 'next/link'
import React from 'react'
import { BiEdit, BiFolderOpen } from 'react-icons/bi'

const Page = ({ user, school, course }: DashboardPage) => {
   const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure()
   const t = useTypeSafeTranslation()
   const { getCourseHref } = useLinkHref()
   const unit = useCurrentUnit()
   const unitName = useCurrentUnitName()

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
                  headerText={unitName} headerIcon={<BiFolderOpen />} headerAction={
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
                  </Flex>
               }
               >
                  
                  <Breadcrumb>
                     <BreadcrumbItem>
                        <Link href={getCourseHref('/content')}>
                           <BreadcrumbLink>{t('course:Course Content')}</BreadcrumbLink>
                        </Link>
                     </BreadcrumbItem>
                     
                     <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>{unitName}</BreadcrumbLink>
                     </BreadcrumbItem>
                  
                  </Breadcrumb>
               
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
   withUnit(),
)(Page)

