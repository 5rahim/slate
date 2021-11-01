import React, { useEffect, useState } from 'react'
import { Box, BoxProps, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { useColorMode } from 'chalkui/dist/cjs/ColorMode'
import { UserDashboardSideNav } from './UserDashboardSideNav'
import { Header } from '../Header'
import { Drawer, DrawerContent, DrawerOverlay, Spinner, useToast, Text } from 'chalkui/dist/cjs/React'
import { useDispatch, useSelector } from 'react-redux'
import { AppActions, AppSelectors } from 'slate/store/slices/appSlice'
import { CourseSelectors } from 'slate/store/slices/courseSlice'

interface UserDashboardLayoutOptions {
   children?: React.ReactNode
   bgColor?: string
}

type UserDashboardLayoutProps = UserDashboardLayoutOptions & BoxProps


const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({ children, bgColor = '#f9f9f9', ...rest }: UserDashboardLayoutProps) => {
   const { colorMode } = useColorMode()
   const toast = useToast()
   
   const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false)
   
   const mutationIsLoading = useSelector(AppSelectors.mutationIsLoading)
   const course = useSelector(CourseSelectors.get)
   
   useEffect(() => {
   
      // mutationIsLoading && toast({
      //    duration: 10000,
      //    position: "bottom",
      //    render: () => (
      //       <Box
      //          bgColor={colorMode === 'light' ? 'white' : 'gray.700'}
      //          color={colorMode === 'light' ? 'black' : 'white'}
      //          p={3}
      //          borderRadius="md"
      //          boxShadow="lg"
      //          border="2px solid"
      //          borderColor="orange.200"
      //       >
      //          <Flex alignItems="center" gridGap=".5rem">
      //             <Spinner size="sm"/>
      //             <Text fontWeight="bold">Loading...</Text>
      //          </Flex>
      //       </Box>
      //    ),
      // })
      
      // !mutationIsLoading && toast.closeAll({ positions: ['bottom'] })
      
   }, [mutationIsLoading])

   
   return (
      <>
         <Box>
            
            <Box
               position="fixed"
               right=".5rem"
               top=".5rem"
               zIndex="9999"
               bgColor="gray.700"
               w="40px"
               h="40px"
               borderRadius="md"
               color="#fff"
               display={mutationIsLoading ? "flex" : "none"}
               alignItems="center"
               justifyContent="center"
            >
               <Spinner size="md"/>
            </Box>
            
            <UserDashboardSideNav as="nav" display={['none', null, 'block']} maxWidth="15rem" width="full" />
   
            <Drawer placement={'left'} onClose={() => setDrawerIsOpen(false)} isOpen={drawerIsOpen}>
               <DrawerOverlay>
                  <DrawerContent>
                     <UserDashboardSideNav width="full" />
                  </DrawerContent>
               </DrawerOverlay>
            </Drawer>
            
            <Box as="main" pl={[0, null, '15rem']}>
               
               <Header openDrawer={() => setDrawerIsOpen(true)} />
               
               <Box
                  as="section"
                  backgroundColor={colorMode === 'light' ? course.background_color : 'gray.900'}
                  // backgroundImage={'url(/assets/patterns/memphis-mini.png)'}
                  minHeight="calc(100vh - 4rem)"
               >
                  <Box {...rest}>
                     {children}
                  </Box>
               </Box>
            </Box>
         </Box>
      </>
   )
}

export default UserDashboardLayout
