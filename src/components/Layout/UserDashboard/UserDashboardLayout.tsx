import React, { useEffect, useState } from 'react'
import { Box, BoxProps } from 'chalkui/dist/cjs/Components/Layout'
import { useColorMode } from 'chalkui/dist/cjs/ColorMode'
import { UserDashboardSideNav } from './UserDashboardSideNav'
import { Header } from '../Header'
import { Drawer, DrawerContent, DrawerOverlay, Spinner } from 'chalkui/dist/cjs/React'
import { useSelector } from 'react-redux'
import { AppSelectors } from 'slate/store/slices/appSlice'

interface UserDashboardLayoutOptions {
   children?: React.ReactNode
   bgColor?: string
}

type UserDashboardLayoutProps = UserDashboardLayoutOptions & BoxProps


const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({ children, bgColor = '#f9f9f9', ...rest }: UserDashboardLayoutProps) => {
   const { colorMode } = useColorMode()
   
   
   const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false)
   
   const mutationIsLoading = useSelector(AppSelectors.mutationIsLoading)
   
   useEffect(() => {
      console.log(mutationIsLoading)
   }, [mutationIsLoading])
   
   return (
      <>
         <Box>
            
            <Box
               position="fixed"
               right=".5rem"
               top=".5rem"
               zIndex="9999"
               bgColor="brand.800"
               p={2}
               borderRadius="md"
               color="#fff"
               display={mutationIsLoading ? "block" : "none"}
            >
               <Spinner size="lg"/>
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
                  backgroundColor={colorMode === 'light' ? bgColor : 'gray.900'}
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
