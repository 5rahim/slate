import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CourseLayout } from '@slate/components/Layout/CourseLayout'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { useLinkHref } from '@slate/hooks/useLinkHref'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withCourse } from '@slate/middlewares/dashboard/withCourse'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { StudentOptions } from '@slate/modules/Course/Instructor/Settings/StudentOptions'
import { UnitCreation } from '@slate/modules/Course/Instructor/Units/UnitCreation'
import { CourseContextMenu } from '@slate/modules/Course/Shared/CourseContextMenu'
import { Compose } from '@slate/next/compose'
import { DashboardPage } from '@slate/types/Next'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from 'chalkui/dist/cjs/React'
import Link from 'next/link'
import React from 'react'
import { BiFolderOpen } from 'react-icons/bi'


const Page = ({ user, school, course }: DashboardPage) => {
   
   const t = useTypeSafeTranslation()
   
   const {getCourseHref} = useLinkHref()
   
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
               
               <ModuleBox headerText={t('Week') + ' #'} headerIcon={<BiFolderOpen />} headerAction={<UnitCreation />}>
   
                  <Breadcrumb>
                     <BreadcrumbItem>
                        <Link href={getCourseHref('/content')}>
                           <BreadcrumbLink>{t('course:Course Content')}</BreadcrumbLink>
                        </Link>
                     </BreadcrumbItem>
      
                     <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>Week #</BreadcrumbLink>
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
)(Page)

