import { DefaultHead } from '@slate/components/Layout/DefaultHead'
import UserDashboardLayout from '@slate/components/Layout/UserDashboard/UserDashboardLayout'
import { CourseHeader } from '@slate/modules/Course/CourseHeader'
import { Container, Flex, Grid } from 'chalkui/dist/cjs/Components/Layout'
import React from 'react'

interface CourseLayoutProps {
   pageTitle?: string
   leftPanel?: React.ReactNode
   children?: React.ReactNode
}

export function CourseLayout({ pageTitle, leftPanel, children }: CourseLayoutProps) {
   
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
               
                     {leftPanel}
            
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
