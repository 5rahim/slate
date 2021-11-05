import { withApollo } from 'slate/graphql/withApollo'
import UserDashboardLayout from 'slate/components/Layout/UserDashboard/UserDashboardLayout'
import React, { useEffect } from 'react'
import { Compose } from 'slate/next/compose'
import { withAuth } from 'slate/middlewares/auth/withAuth'
import { withDashboard } from 'slate/middlewares/dashboard/withDashboard'
import { DefaultHead } from 'slate/components/Layout/DefaultHead'
import { useTranslation } from 'react-i18next'
import { DashboardPage } from 'slate/types/Next'
import { useRouter } from 'next/router'
import { withCourse } from 'slate/middlewares/dashboard/withCourse'
import { CourseHeader } from 'slate/components/Course/CourseHeader'
import { PermissionComponent } from 'slate/components/Permissions'
import { Container, DividedList, Flex, Grid, ListItem } from 'chalkui/dist/cjs/Components/Layout'
import {
   Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Dropdown, DropdownButton, DropdownItem, DropdownList, Icon, Link,
   Tag, Text,
} from 'chalkui/dist/cjs/React'
import { BiCog, BiDotsHorizontal, BiEdit, BiGroup, BiListUl, BiPalette, BiTrash } from 'react-icons/bi'
import { useColorMode } from 'chalkui/dist/cjs/ColorMode'
import { CourseModuleBox } from 'slate/components/Course/CourseModuleBox'
import { HiOutlineSpeakerphone } from 'react-icons/hi'
import { Utils } from 'slate/utils'
import Swatches from 'react-color/lib/components/swatches/Swatches'
import Circle from 'react-color/lib/components/circle/Circle'
import { useMutateCourseBackgroundColor, useMutateCourseBannerColor } from 'slate/graphql/queries/courses/hooks'
import { useApolloClient } from '@apollo/client'
import { CourseOptions } from 'slate/components/Course/Settings/CourseOptions'


const Page = ({ course, iid }: DashboardPage) => {
   
   const { t } = useTranslation(['common', 'course'], { useSuspense: false })
   
   const client = useApolloClient()
   const { colorMode } = useColorMode()
   
   const router = useRouter()
   
   const [updateBannerColor] = useMutateCourseBannerColor()
   const [updateBackgroundColor] = useMutateCourseBackgroundColor()
   
   
   function handleBannerColorChange(value: any) {
      
      updateBannerColor({ id: course?.id, banner_color: value.hex })
      
   }
   
   function handleBackgroundColorChange(value: any) {
      
      updateBackgroundColor({ id: course?.id, background_color: value.hex })
      
   }
   
   
   useEffect(() => {
      async function prefetch() {
         await router.prefetch(Utils.Url.schoolLinkTo(iid, `/course/${course?.id}/content`))
      }
      
      prefetch()
   }, [])
   
   
   return (
      <>
         <DefaultHead pageTitle={t('Dashboard')} />
         
         <UserDashboardLayout bgColor={course?.background_color as string}>
            {/*<IndexHeader />*/}
            
            <CourseHeader index={0} />
            
            <Container maxW="container.xl" mt={5}>
               
               <PermissionComponent.InstructorOnly>
                  <Flex
                     gridGap={18}
                     flexDirection={["column-reverse", "column-reverse", "row"]}
                  >
                     <Flex flexDirection="column" width={["100%", "100%", "40%"]} gap={20} as={Grid} alignSelf="flex-start">
                        
                        <CourseOptions />
                        
                        <CourseModuleBox headerText="Student Options" headerIcon={<BiCog />}>
                           <DividedList spacing={2} width="full">
                              <ListItem>
                                 <Flex alignItems="center">
                                    <Box as={BiGroup} width="40px" fontSize="1.6rem" />
                                    <Box fontSize="md">
                                       <Text fontSize="lg" fontWeight="700">Roster</Text>
                                       <Text>Manage your students | <Link>View</Link></Text>
                                    </Box>
                                 </Flex>
                              </ListItem>
                              <ListItem>
                                 <Flex alignItems="center">
                                    <Box as={BiGroup} width="40px" fontSize="1.6rem" />
                                    <Box fontSize="md">
                                       <Text fontSize="lg" fontWeight="700">Groups</Text>
                                       <Text>Manage student groups | <Link>Edit</Link></Text>
                                    </Box>
                                 </Flex>
                              </ListItem>
                              <ListItem>
                                 <Flex alignItems="center">
                                    <Box as={BiListUl} width="40px" fontSize="1.6rem" />
                                    <Box fontSize="md">
                                       <Text fontSize="lg" fontWeight="700">Attendance</Text>
                                       <Text>Manage student attendance | <Link>Manage</Link></Text>
                                    </Box>
                                 </Flex>
                              </ListItem>
                           </DividedList>
                        </CourseModuleBox>
                     
                     </Flex>
                     
                     <Flex flexDirection="column" gridGap={18} width={["100%", "100%", "60%"]}>
                        <Box>
                           
                           <CourseModuleBox headerText="Announcements" headerIcon={<HiOutlineSpeakerphone />}>
                              
                              <DividedList spacing={2} width="100%" overflowY={"auto"} height="500px" pr={1}>
                                 <ListItem
                                    sx={{
                                       _hover: {
                                          // bgColor: colorMode === 'light' ? 'gray.100' : 'gray.800'
                                       },
                                    }}
                                 >
                                    <Flex alignItems="center">
                                       <Box fontSize="md">
                                          <Flex justifyContent="space-between">
                                             <Flex mb={3} gridGap=".5rem" flexDirection={['column', 'row']}>
                                                <Text fontSize="lg" fontWeight="bold">Bojack Horseman</Text>
                                                <Box>
                                                   <Tag variant="primary" pill colorScheme="black">Not published</Tag>
                                                   <Tag pill colorScheme="orange.500">Draft</Tag>
                                                </Box>
                                             </Flex>
                                             
                                             
                                             <Dropdown>
                                                <DropdownButton
                                                   as={Box}
                                                   aria-label="Options"
                                                   size="lg"
                                                   variant="outline"
                                                   cursor="pointer"
                                                   color={colorMode === 'light' ? 'gray.300' : 'gray.300'}
                                                   _hover={{
                                                      color: colorMode === 'light' ? 'black' : 'white',
                                                   }}
                                                >
                                                   <Box
                                                      fontSize="1.4rem"
                                                   >
                                                      <Icon as={BiDotsHorizontal} />
                                                   </Box>
                                                
                                                </DropdownButton>
                                                <DropdownList>
                                                   <DropdownItem icon={<BiEdit />}>
                                                      {t('Edit')}
                                                   </DropdownItem>
                                                   <DropdownItem icon={<BiTrash />}>
                                                      {t('Delete')}
                                                   </DropdownItem>
                                                </DropdownList>
                                             </Dropdown>
                                          
                                          </Flex>
                                          <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cum delectus dolorum, eaque earum,
                                                enim facilis ipsam magnam minima modi molestias nisi officia officiis pariatur perferendis saepe
                                                tempore
                                                ut, vel!</Text>
                                       </Box>
                                    </Flex>
                                 </ListItem>
                                 <ListItem
                                    sx={{
                                       _hover: {
                                          // bgColor: colorMode === 'light' ? 'gray.100' : 'gray.800'
                                       },
                                    }}
                                 >
                                    <Flex alignItems="center">
                                       <Box fontSize="md">
                                          <Flex justifyContent="space-between">
                                             <Flex mb={3} gridGap=".5rem" flexDirection={['column', 'row']}>
                                                <Text fontSize="lg" fontWeight="bold">Bojack Horseman</Text>
                                                <Box>
                                                   <Tag variant="primary" pill colorScheme="black">Not published</Tag>
                                                   <Tag pill colorScheme="orange.500">Draft</Tag>
                                                </Box>
                                             </Flex>
                                             
                                             
                                             <Dropdown>
                                                <DropdownButton
                                                   as={Box}
                                                   aria-label="Options"
                                                   size="lg"
                                                   variant="outline"
                                                   cursor="pointer"
                                                   color={colorMode === 'light' ? 'gray.300' : 'gray.300'}
                                                   _hover={{
                                                      color: colorMode === 'light' ? 'black' : 'white',
                                                   }}
                                                >
                                                   <Box
                                                      fontSize="1.4rem"
                                                   >
                                                      <Icon as={BiDotsHorizontal} />
                                                   </Box>
                                                
                                                </DropdownButton>
                                                <DropdownList>
                                                   <DropdownItem icon={<BiEdit />}>
                                                      {t('Edit')}
                                                   </DropdownItem>
                                                   <DropdownItem icon={<BiTrash />}>
                                                      {t('Delete')}
                                                   </DropdownItem>
                                                </DropdownList>
                                             </Dropdown>
                                          
                                          </Flex>
                                          <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cum delectus dolorum, eaque earum,
                                                enim facilis ipsam magnam minima modi molestias nisi officia officiis pariatur perferendis saepe
                                                tempore
                                                ut, vel!</Text>
                                       </Box>
                                    </Flex>
                                 </ListItem>
                                 <ListItem
                                    sx={{
                                       _hover: {
                                          // bgColor: colorMode === 'light' ? 'gray.100' : 'gray.800'
                                       },
                                    }}
                                 >
                                    <Flex alignItems="center">
                                       <Box fontSize="md">
                                          <Flex justifyContent="space-between">
                                             <Flex mb={3} gridGap=".5rem" flexDirection={['column', 'row']}>
                                                <Text fontSize="lg" fontWeight="bold">Bojack Horseman</Text>
                                                <Box>
                                                   <Tag variant="primary" pill colorScheme="black">Not published</Tag>
                                                   <Tag pill colorScheme="orange.500">Draft</Tag>
                                                </Box>
                                             </Flex>
                                             
                                             
                                             <Dropdown>
                                                <DropdownButton
                                                   as={Box}
                                                   aria-label="Options"
                                                   size="lg"
                                                   variant="outline"
                                                   cursor="pointer"
                                                   color={colorMode === 'light' ? 'gray.300' : 'gray.300'}
                                                   _hover={{
                                                      color: colorMode === 'light' ? 'black' : 'white',
                                                   }}
                                                >
                                                   <Box
                                                      fontSize="1.4rem"
                                                   >
                                                      <Icon as={BiDotsHorizontal} />
                                                   </Box>
                                                
                                                </DropdownButton>
                                                <DropdownList>
                                                   <DropdownItem icon={<BiEdit />}>
                                                      {t('Edit')}
                                                   </DropdownItem>
                                                   <DropdownItem icon={<BiTrash />}>
                                                      {t('Delete')}
                                                   </DropdownItem>
                                                </DropdownList>
                                             </Dropdown>
                                          
                                          </Flex>
                                          <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cum delectus dolorum, eaque earum,
                                                enim facilis ipsam magnam minima modi molestias nisi officia officiis pariatur perferendis saepe
                                                tempore
                                                ut, vel!</Text>
                                       </Box>
                                    </Flex>
                                 </ListItem>
                                 <ListItem
                                    sx={{
                                       _hover: {
                                          // bgColor: colorMode === 'light' ? 'gray.100' : 'gray.800'
                                       },
                                    }}
                                 >
                                    <Flex alignItems="center">
                                       <Box fontSize="md">
                                          <Flex justifyContent="space-between">
                                             <Flex mb={3} gridGap=".5rem" flexDirection={['column', 'row']}>
                                                <Text fontSize="lg" fontWeight="bold">Bojack Horseman</Text>
                                                <Box>
                                                   <Tag variant="primary" pill colorScheme="black">Not published</Tag>
                                                   <Tag pill colorScheme="orange.500">Draft</Tag>
                                                </Box>
                                             </Flex>
                                             
                                             
                                             <Dropdown>
                                                <DropdownButton
                                                   as={Box}
                                                   aria-label="Options"
                                                   size="lg"
                                                   variant="outline"
                                                   cursor="pointer"
                                                   color={colorMode === 'light' ? 'gray.300' : 'gray.300'}
                                                   _hover={{
                                                      color: colorMode === 'light' ? 'black' : 'white',
                                                   }}
                                                >
                                                   <Box
                                                      fontSize="1.4rem"
                                                   >
                                                      <Icon as={BiDotsHorizontal} />
                                                   </Box>
                                                
                                                </DropdownButton>
                                                <DropdownList>
                                                   <DropdownItem icon={<BiEdit />}>
                                                      {t('Edit')}
                                                   </DropdownItem>
                                                   <DropdownItem icon={<BiTrash />}>
                                                      {t('Delete')}
                                                   </DropdownItem>
                                                </DropdownList>
                                             </Dropdown>
                                          
                                          </Flex>
                                          <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cum delectus dolorum, eaque earum,
                                                enim facilis ipsam magnam minima modi molestias nisi officia officiis pariatur perferendis saepe
                                                tempore
                                                ut, vel!</Text>
                                       </Box>
                                    </Flex>
                                 </ListItem>
                                 <ListItem
                                    sx={{
                                       _hover: {
                                          // bgColor: colorMode === 'light' ? 'gray.100' : 'gray.800'
                                       },
                                    }}
                                 >
                                    <Flex alignItems="center">
                                       <Box fontSize="md">
                                          <Flex justifyContent="space-between">
                                             <Flex mb={3} gridGap=".5rem" flexDirection={['column', 'row']}>
                                                <Text fontSize="lg" fontWeight="bold">Bojack Horseman</Text>
                                                <Box>
                                                   <Tag variant="primary" pill colorScheme="black">Not published</Tag>
                                                   <Tag pill colorScheme="orange.500">Draft</Tag>
                                                </Box>
                                             </Flex>
                                             
                                             
                                             <Dropdown>
                                                <DropdownButton
                                                   as={Box}
                                                   aria-label="Options"
                                                   size="lg"
                                                   variant="outline"
                                                   cursor="pointer"
                                                   color={colorMode === 'light' ? 'gray.300' : 'gray.300'}
                                                   _hover={{
                                                      color: colorMode === 'light' ? 'black' : 'white',
                                                   }}
                                                >
                                                   <Box
                                                      fontSize="1.4rem"
                                                   >
                                                      <Icon as={BiDotsHorizontal} />
                                                   </Box>
                                                
                                                </DropdownButton>
                                                <DropdownList>
                                                   <DropdownItem icon={<BiEdit />}>
                                                      {t('Edit')}
                                                   </DropdownItem>
                                                   <DropdownItem icon={<BiTrash />}>
                                                      {t('Delete')}
                                                   </DropdownItem>
                                                </DropdownList>
                                             </Dropdown>
                                          
                                          </Flex>
                                          <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cum delectus dolorum, eaque earum,
                                                enim facilis ipsam magnam minima modi molestias nisi officia officiis pariatur perferendis saepe
                                                tempore
                                                ut, vel!</Text>
                                       </Box>
                                    </Flex>
                                 </ListItem>
                                 <ListItem
                                    sx={{
                                       _hover: {
                                          // bgColor: colorMode === 'light' ? 'gray.100' : 'gray.800'
                                       },
                                    }}
                                 >
                                    <Flex alignItems="center">
                                       <Box fontSize="md">
                                          <Flex justifyContent="space-between">
                                             <Flex mb={3} gridGap=".5rem" flexDirection={['column', 'row']}>
                                                <Text fontSize="lg" fontWeight="bold">Bojack Horseman</Text>
                                                <Box>
                                                   <Tag variant="primary" pill colorScheme="black">Not published</Tag>
                                                   <Tag pill colorScheme="orange.500">Draft</Tag>
                                                </Box>
                                             </Flex>
                                             
                                             
                                             <Dropdown>
                                                <DropdownButton
                                                   as={Box}
                                                   aria-label="Options"
                                                   size="lg"
                                                   variant="outline"
                                                   cursor="pointer"
                                                   color={colorMode === 'light' ? 'gray.300' : 'gray.300'}
                                                   _hover={{
                                                      color: colorMode === 'light' ? 'black' : 'white',
                                                   }}
                                                >
                                                   <Box
                                                      fontSize="1.4rem"
                                                   >
                                                      <Icon as={BiDotsHorizontal} />
                                                   </Box>
                                                
                                                </DropdownButton>
                                                <DropdownList>
                                                   <DropdownItem icon={<BiEdit />}>
                                                      {t('Edit')}
                                                   </DropdownItem>
                                                   <DropdownItem icon={<BiTrash />}>
                                                      {t('Delete')}
                                                   </DropdownItem>
                                                </DropdownList>
                                             </Dropdown>
                                          
                                          </Flex>
                                          <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cum delectus dolorum, eaque earum,
                                                enim facilis ipsam magnam minima modi molestias nisi officia officiis pariatur perferendis saepe
                                                tempore
                                                ut, vel!</Text>
                                       </Box>
                                    </Flex>
                                 </ListItem>
                                 <ListItem
                                    sx={{
                                       _hover: {
                                          // bgColor: colorMode === 'light' ? 'gray.100' : 'gray.800'
                                       },
                                    }}
                                 >
                                    <Flex alignItems="center">
                                       <Box fontSize="md">
                                          <Flex justifyContent="space-between">
                                             <Flex mb={3} gridGap=".5rem" flexDirection={['column', 'row']}>
                                                <Text fontSize="lg" fontWeight="bold">Bojack Horseman</Text>
                                                <Box>
                                                   <Tag variant="primary" pill colorScheme="black">Not published</Tag>
                                                   <Tag pill colorScheme="orange.500">Draft</Tag>
                                                </Box>
                                             </Flex>
                                             
                                             
                                             <Dropdown>
                                                <DropdownButton
                                                   as={Box}
                                                   aria-label="Options"
                                                   size="lg"
                                                   variant="outline"
                                                   cursor="pointer"
                                                   color={colorMode === 'light' ? 'gray.300' : 'gray.300'}
                                                   _hover={{
                                                      color: colorMode === 'light' ? 'black' : 'white',
                                                   }}
                                                >
                                                   <Box
                                                      fontSize="1.4rem"
                                                   >
                                                      <Icon as={BiDotsHorizontal} />
                                                   </Box>
                                                
                                                </DropdownButton>
                                                <DropdownList>
                                                   <DropdownItem icon={<BiEdit />}>
                                                      {t('Edit')}
                                                   </DropdownItem>
                                                   <DropdownItem icon={<BiTrash />}>
                                                      {t('Delete')}
                                                   </DropdownItem>
                                                </DropdownList>
                                             </Dropdown>
                                          
                                          </Flex>
                                          <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cum delectus dolorum, eaque earum,
                                                enim facilis ipsam magnam minima modi molestias nisi officia officiis pariatur perferendis saepe
                                                tempore
                                                ut, vel!</Text>
                                       </Box>
                                    </Flex>
                                 </ListItem>
                                 <ListItem
                                    sx={{
                                       _hover: {
                                          // bgColor: colorMode === 'light' ? 'gray.100' : 'gray.800'
                                       },
                                    }}
                                 >
                                    <Flex alignItems="center">
                                       <Box fontSize="md">
                                          <Flex justifyContent="space-between">
                                             <Flex mb={3} gridGap=".5rem" flexDirection={['column', 'row']}>
                                                <Text fontSize="lg" fontWeight="bold">Bojack Horseman</Text>
                                                <Box>
                                                   <Tag variant="primary" pill colorScheme="black">Not published</Tag>
                                                   <Tag pill colorScheme="orange.500">Draft</Tag>
                                                </Box>
                                             </Flex>
                                             
                                             
                                             <Dropdown>
                                                <DropdownButton
                                                   as={Box}
                                                   aria-label="Options"
                                                   size="lg"
                                                   variant="outline"
                                                   cursor="pointer"
                                                   color={colorMode === 'light' ? 'gray.300' : 'gray.300'}
                                                   _hover={{
                                                      color: colorMode === 'light' ? 'black' : 'white',
                                                   }}
                                                >
                                                   <Box
                                                      fontSize="1.4rem"
                                                   >
                                                      <Icon as={BiDotsHorizontal} />
                                                   </Box>
                                                
                                                </DropdownButton>
                                                <DropdownList>
                                                   <DropdownItem icon={<BiEdit />}>
                                                      {t('Edit')}
                                                   </DropdownItem>
                                                   <DropdownItem icon={<BiTrash />}>
                                                      {t('Delete')}
                                                   </DropdownItem>
                                                </DropdownList>
                                             </Dropdown>
                                          
                                          </Flex>
                                          <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cum delectus dolorum, eaque earum,
                                                enim facilis ipsam magnam minima modi molestias nisi officia officiis pariatur perferendis saepe
                                                tempore
                                                ut, vel!</Text>
                                       </Box>
                                    </Flex>
                                 </ListItem>
                              </DividedList>
                           
                           </CourseModuleBox>
                        </Box>
                        
                        <Box colSpan={3}>
                           <CourseModuleBox headerText="Customization" headerIcon={<BiPalette />}>
                              <Accordion allowToggle>
                                 <AccordionItem>
                                    <h2>
                                       <AccordionButton>
                                          <Box flex="1" textAlign="left">
                                             Banner color
                                          </Box>
                                          <AccordionIcon />
                                       </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                       <Flex
                                          alignItems="center"
                                          gridGap=".5rem"
                                          mb={5}
                                       >
                                          Current color: <Box width="30px" height="30px" borderRadius="md" bgColor={course?.banner_color as string} />
                                       </Flex>
                                       <Swatches onChangeComplete={handleBannerColorChange} />
                                    </AccordionPanel>
                                 </AccordionItem>
                                 
                                 <AccordionItem>
                                    <h2>
                                       <AccordionButton>
                                          <Box flex="1" textAlign="left">
                                             Background Color
                                          </Box>
                                          <AccordionIcon />
                                       </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                       <Flex
                                          alignItems="center"
                                          gridGap=".5rem"
                                          mb={5}
                                       >
                                          Current color: <Box width="30px" height="30px" borderRadius="md"
                                                              bgColor={course?.background_color as string} />
                                       </Flex>
                                       <Circle colors={['#f9f9f9', '#f5f2f0', '#bfbfbf', '#42454c', '#2a2928']}
                                               onChangeComplete={handleBackgroundColorChange} />
                                    </AccordionPanel>
                                 </AccordionItem>
                              </Accordion>
                           </CourseModuleBox>
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

