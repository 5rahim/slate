import { DefaultHead } from '@slate/components/Layout/DefaultHead'
import UserDashboardLayout from '@slate/components/Layout/UserDashboard/UserDashboardLayout'
import { useMediaSizes } from '@slate/hooks/useMediaSizes'
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
   
   const {isDesktop, isTabletAndSmaller} = useMediaSizes()
   
   return (
      <>
         
         <DefaultHead pageTitle={pageTitle} />
         
            <UserDashboardLayout>
      
               <CourseHeader index={headerMenuIndex} />
      
               <Container maxW={['100%', '100%', '100%', '100%', '100rem']} mt={5} px={7} pb="5rem">
         
                  <Flex
                     gridGap={18}
                     flexDirection={["column-reverse", "column-reverse", "column-reverse", 'column-reverse', "row"]}
                  >
                     <Flex
                        flexDirection={["column", "column", "column", "row", "column"]}
                        minWidth={["100%", "100%", "100%", '20rem', '20rem']}
                        placeItems={["none", "normal", "normal", "normal", "none"]}
                        alignSelf={['normal', 'normal', 'normal', 'normal', 'flex-start']}
                        flexWrap="wrap"
                        gridGap={5}
                        sx={{
                           '& > *': {
                              flex: '1 1 32%'
                           }
                        }}
                     >
               
                        {leftPanel}
               
                        {(!isDesktop) && rightPanel}
            
                     </Flex>
            
                     <Flex flexDirection="column" gridGap={18} width={["100%", "100%", "100%"]}>
               
                        {children}
            
                     </Flex>
            
                     {(isDesktop && rightPanel) && (
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
