import { DefaultHead } from '@slate/components/Layout/DefaultHead'
import UserDashboardLayout from '@slate/components/Layout/UserDashboard/UserDashboardLayout'
import { CourseHeader } from '@slate/modules/Course/CourseHeader'
import { Container, Flex, Grid } from 'chalkui/dist/cjs/Components/Layout'
import React from 'react'

interface CourseLayoutProps {
   pageTitle?: string
   leftPanel?: React.ReactNode
   rightPanel?: React.ReactNode
   children?: React.ReactNode
}

export function CourseLayout({ pageTitle, leftPanel, rightPanel, children }: CourseLayoutProps) {
   
   return (
      <>
   
         <DefaultHead pageTitle={pageTitle} />
   
         <UserDashboardLayout>
      
            <CourseHeader index={0} />
      
            <Container maxW="100%" mt={5} pb="5rem">
         
               <Flex
                  gridGap={18}
                  flexDirection={["column", "column", "row"]}
               >
                  <Flex flexDirection="column" width={["100%", "100%", "30%"]} gap={5} as={Grid} alignSelf="flex-start">
               
                     {leftPanel}
            
                  </Flex>
                  
                  <Flex flexDirection="column" gridGap={18} width={["100%", "100%", "70%"]}>
   
                     {children}
   
                  </Flex>
                  {rightPanel && (
                     <Flex flexDirection="column" width={["100%", "100%", "30%"]} gap={5} as={Grid} alignSelf="flex-start">
      
                        {rightPanel}
   
                     </Flex>
                  )}
               </Flex>
      
            </Container>
   
         </UserDashboardLayout>
      
      </>
   )
   
}
