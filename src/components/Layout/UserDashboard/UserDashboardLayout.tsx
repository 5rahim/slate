import { StudentViewPortal } from '@slate/components/StudentViewPortal'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useStoreCacheConfig } from '@slate/store/cache/hooks/useStoreCacheConfig'
import { AppSelectors } from '@slate/store/slices/appSlice'
import { useColorMode } from 'chalkui/dist/cjs/ColorMode'
import { Box, BoxProps, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Drawer, DrawerContent, DrawerOverlay } from 'chalkui/dist/cjs/Components/Modal/Drawer'
import { Spinner } from 'chalkui/dist/cjs/Components/Spinner/Spinner'
import { useToast } from 'chalkui/dist/cjs/Components/Toast/UseToast'
import { Text } from 'chalkui/dist/cjs/Components/Typography'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Header } from '../Header'
import { UserDashboardSideNav } from './UserDashboardSideNav'

interface UserDashboardLayoutOptions {
   children?: React.ReactNode
}

type UserDashboardLayoutProps = UserDashboardLayoutOptions & BoxProps


const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({ children, ...rest }: UserDashboardLayoutProps) => {
   const { colorMode } = useColorMode()
   useStoreCacheConfig()
   const cmf = useCMF()
   const toast = useToast()
   const t = useTypeSafeTranslation()
   const { query } = useRouter()
   const { course_id } = query
   
   const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false)
   
   const mutationIsLoading = useSelector(AppSelectors.mutationIsLoading)
   const course = useCurrentCourse()
   
   try {
      useEffect(() => {
         window.addEventListener('offline', () => {
            // @ts-ignore
            toast.closeAll(['bottom'])
            toast({
               duration: 9999999,
               position: "bottom",
               render: () => (
                  <Box
                     bgColor={colorMode === 'light' ? 'red.500' : 'gray.700'}
                     color={colorMode === 'light' ? '#fff' : 'white'}
                     p={3}
                     borderRadius="md"
                     boxShadow="lg"
                     border="2px solid"
                     borderColor="red.600"
                  >
                     <Flex alignItems="center" gridGap=".5rem">
                        <Spinner size="sm" />
                        <Text fontWeight="bold">{t('No internet connection')}</Text>
                     </Flex>
                  </Box>
               ),
            })
         })
         window.addEventListener('online', () => {
            // @ts-ignore
            toast.closeAll(['bottom'])
         })
      }, [window])
   } catch (e) {
      console.log(e)
   }
   
   
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
               <Spinner size="md" />
            </Box>
            
            <StudentViewPortal />
            
            <UserDashboardSideNav as="nav" display={['none', null, 'block']} maxWidth="6rem" width="full" />
            
            <Drawer placement={'left'} onClose={() => setDrawerIsOpen(false)} isOpen={drawerIsOpen}>
               <DrawerOverlay>
                  <DrawerContent>
                     <UserDashboardSideNav width="full" />
                  </DrawerContent>
               </DrawerOverlay>
            </Drawer>
            
            <Box as="main" pl={[0, null, '6rem']}>
               
               <Header openDrawer={() => setDrawerIsOpen(true)} />
               
               <Box
                  as="section"
                  backgroundColor={!!course_id ? cmf(course.background_color, 'gray.900') : '#f9f9f9'}
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
