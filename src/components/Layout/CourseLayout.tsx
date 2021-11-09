import { CourseHeader } from '@slate/components/Course/CourseHeader'
import { AnnouncementCreation } from '@slate/components/Course/Instructor/Announcements/AnnouncementCreation'
import { CourseOptions } from '@slate/components/Course/Instructor/Settings/CourseOptions'
import { Customization } from '@slate/components/Course/Instructor/Settings/Customization'
import { StudentOptions } from '@slate/components/Course/Instructor/Settings/StudentOptions'
import { AnnouncementList } from '@slate/components/Course/Shared/Announcements/AnnouncementList'
import { CourseContentModule } from '@slate/components/Course/Student/CourseContentModule'
import { CourseDetailsModule } from '@slate/components/Course/Student/CourseDetailsModule'
import { GroupModule } from '@slate/components/Course/Student/GroupModule'
import { DefaultHead } from '@slate/components/Layout/DefaultHead'
import UserDashboardLayout from '@slate/components/Layout/UserDashboard/UserDashboardLayout'
import { PermissionComponent } from '@slate/components/Permissions'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { Container, Flex, Grid } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/React'
import React from 'react'
import { HiOutlineSpeakerphone } from 'react-icons/hi'

interface CourseLayoutProps {
   pageTitle?: string
   nav?: React.ReactNode
   children?: React.ReactNode
}

export function CourseLayout({ pageTitle, nav, children }: CourseLayoutProps) {
   
   return (
      <>
   
         <DefaultHead pageTitle={pageTitle} />
   
         <UserDashboardLayout>
      
            <CourseHeader index={0} />
      
            <Container maxW="container.2xl" mt={5}>
         
               <Flex
                  gridGap={18}
                  flexDirection={["column-reverse", "column-reverse", "row"]}
               >
                  <Flex flexDirection="column" width={["100%", "100%", "30%"]} gap={5} as={Grid} alignSelf="flex-start">
               
                     {nav}
            
                  </Flex>
            
                  <Flex flexDirection="column" gridGap={18} width={["100%", "100%", "70%"]}>
                     
                     {children}
                  
                  </Flex>
               </Flex>
      
            </Container>
   
         </UserDashboardLayout>
      
      </>
   )
   
}
