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
   headerMenuIndex: number
}

export function CourseLayout({ pageTitle, leftPanel, rightPanel, headerMenuIndex, children }: CourseLayoutProps) {
   
   return (
      <>
         
         <DefaultHead pageTitle={pageTitle} />
         
         <UserDashboardLayout>
            
            <CourseHeader index={headerMenuIndex} />
            
            <Container maxW={['100%', '100%', '100%', '100%', '90%']} mt={[5, 5, 10]} px={[5, 5, 10]} pb="5rem">
               
               <Flex
                  gridGap={18}
                  flexDirection={["column", "column", "column", 'column', "row"]}
               >
                  <Flex
                     flexDirection={["column", "column", "column", "row", "column"]}
                     minWidth={["100%", "100%", "100%", '20rem', '20rem']}
                     gridGap={5}
                     placeItems={["none", "none", "none", "flex-start", "none"]}
                     // as={Grid}
                     // alignSelf="flex-start"
                  >
                     
                     {leftPanel}
                  
                  </Flex>
                  
                  <Flex flexDirection="column" gridGap={18} width={["100%", "100%", "100%"]}>
                     
                     {children}
                  
                  </Flex>
                  {rightPanel && (
                     <Flex flexDirection="column" minWidth={["100%", "100%", '100%', "20rem"]} gap={5} as={Grid} alignSelf="flex-start">
                        
                        {rightPanel}
                     
                     </Flex>
                  )}
               </Flex>
            
            </Container>
         
         </UserDashboardLayout>
      
      </>
   )
   
}
