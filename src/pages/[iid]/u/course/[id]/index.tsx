import { Container, Flex, Grid } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/React'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { HiOutlineSpeakerphone } from 'react-icons/hi'
import { CourseHeader } from 'slate/components/Course/CourseHeader'
import { CourseOptions } from 'slate/components/Course/Instructor/Settings/CourseOptions'
import { Customization } from 'slate/components/Course/Instructor/Settings/Customization'
import { StudentOptions } from 'slate/components/Course/Instructor/Settings/StudentOptions'
import { AnnouncementList } from 'slate/components/Course/Shared/Announcements/AnnouncementList'
import { DefaultHead } from 'slate/components/Layout/DefaultHead'
import UserDashboardLayout from 'slate/components/Layout/UserDashboard/UserDashboardLayout'
import { PermissionComponent } from 'slate/components/Permissions'
import { ModuleBox } from 'slate/components/UI/Course/ModuleBox'
import { withApollo } from 'slate/graphql/withApollo'
import { withAuth } from 'slate/middlewares/auth/withAuth'
import { withCourse } from 'slate/middlewares/dashboard/withCourse'
import { withDashboard } from 'slate/middlewares/dashboard/withDashboard'
import { Compose } from 'slate/next/compose'
import { DashboardPage } from 'slate/types/Next'
import { Utils } from 'slate/utils'


const Page = ({ course, iid }: DashboardPage) => {
   
   const router = useRouter()
   
   useEffect(() => {
      async function prefetch() {
         await router.prefetch(Utils.Url.schoolLinkTo(iid, `/course/${course?.id}/content`))
      }
      
      prefetch()
   }, [])
   
   
   return (
      <>
         <DefaultHead pageTitle={course?.name} />
         
         <UserDashboardLayout>
            {/*<IndexHeader />*/}
            
            <CourseHeader index={0} />
            
            <Container maxW="container.xl" mt={5}>
               
               <PermissionComponent.InstructorOnly>
                  <Flex
                     gridGap={18}
                     flexDirection={["column-reverse", "column-reverse", "row"]}
                  >
                     <Flex flexDirection="column" width={["100%", "100%", "40%"]} gap={5} as={Grid} alignSelf="flex-start">
                        
                        <CourseOptions />
                        
                        <StudentOptions />
                     
                     </Flex>
                     
                     <Flex flexDirection="column" gridGap={18} width={["100%", "100%", "60%"]}>
                        <Box>
                           
                           <ModuleBox headerText="Announcements" headerIcon={<HiOutlineSpeakerphone />}>
                              
                              <AnnouncementList height="500px" />
                           
                           </ModuleBox>
                        </Box>
                        
                        <Box>
                           <Customization />
                        </Box>
                     </Flex>
                  </Flex>
               </PermissionComponent.InstructorOnly>
            
            </Container>
         
         </UserDashboardLayout>
      </>
   )
}

export default Compose(
   withApollo({ ssr: true }),
   withAuth({ requireAuth: true, requireActiveAccount: true }),
   // withCacheReset(),
   withDashboard(),
   withCourse(),
)(Page)

