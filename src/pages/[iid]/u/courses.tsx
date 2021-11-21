import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { DefaultHead } from '@slate/components/Layout/DefaultHead'
import UserDashboardLayout from '@slate/components/Layout/UserDashboard/UserDashboardLayout'
import { PermissionComponent } from '@slate/components/Permissions'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { getCourseList } from '@slate/graphql/schemas/courses/hooks'
import { useUserSessionProfile } from '@slate/hooks/useCurrentUser'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { Compose } from '@slate/next/compose'
import { SlateCourse } from '@slate/types/Course'
import { DashboardPage } from '@slate/types/Next'
import { Utils } from '@slate/utils'
import { Flex, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Avatar, AvatarGroup, Box, CelledList, Heading, Icon, ListLinkItem, Skeleton, Tag, Text, Tooltip } from 'chalkui/dist/cjs/React'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiCalendarAlt } from 'react-icons/bi'


const Page = ({ user, school, iid }: DashboardPage) => {
   
   const { t, i18n } = useTranslation(['common'], { useSuspense: false })
   const router = useRouter()
   
   const [hiddenCourses, setHiddenCourses] = useState<SlateCourse[]>([])
   
   const { profile } = useUserSessionProfile()
   
   const [courses, coursesLoading] = getCourseList()

   
   return (
      <>
         <DefaultHead pageTitle={t('Dashboard')} />
         
         <UserDashboardLayout>
            
            <Flex
               height={["100px", "100px", "200px", "200px"]}
               backgroundColor={"brand.800"}
               backgroundImage={Utils.Url.assetImageUrl('topography.png', 'patterns')}
               backgroundBlendMode={"color-burn"}
               color="white"
            >
               
               <Box width={['90%', '90%', '90%', '90%']} margin="auto">
                  
                  <Box>
                     <Heading size="2xl">{t('Your courses')}</Heading>
                  </Box>
               </Box>
            
            </Flex>
            
            <Box p={5}>
               
               <PermissionComponent.StudentOnly>
                  <Box mb={5}>
                     <Text fontSize="lg">You have {hiddenCourses.length} hidden courses</Text>
                  </Box>
               </PermissionComponent.StudentOnly>
               
               {/*TODO CHANGE LEVEL !!!!!!!!!!!!*/}
               {( courses?.length > 0 ) && (
                  <CelledList isFullWidth boxShadow="none" borderRadius="none">
                     {courses?.map((course: SlateCourse | undefined) => {
                        return (
                           <ListLinkItem
                              key={course?.id} px={6} py={4}
                              onClick={() => router.push(Utils.Url.schoolLinkTo(iid, `/course/${course?.id}`))}
                           >
                              <Flex alignItems="center" justifyContent="space-between">
                                 <Box fontSize="md">
                                    <Flex gridGap="1rem">
                                       <Text fontSize="lg" fontWeight="bold">{course?.name} {course?.level}</Text>
                                       <Tag pill colorScheme="green.500">Open</Tag>
                                    </Flex>
                                    <Flex alignItems="center"><Icon as={BiCalendarAlt} mr={1} /><Text>Closing on January 7, 2025</Text></Flex>
                                 </Box>
                                 <PermissionComponent.AssistantAndHigher>
                                    <Box>
                                       <Tooltip placement="bottom-end" label={"Students"} aria-label="Student avatars">
                                          <AvatarGroup size="sm" max={5}>
                                             {course?.enrollments?.map((enrollment) => {
                                                return <Avatar key={enrollment?.id} src={enrollment?.student?.image as string} />
                                             })}
                                          </AvatarGroup>
                                       </Tooltip>
                                    </Box>
                                 </PermissionComponent.AssistantAndHigher>
                                 <PermissionComponent.StudentOnly>
                                    <Box overflow="hidden">
                                       <Tooltip
                                          placement="bottom-end"
                                          label={"Instructor: " + Utils.Names.formatLocaleFullName(i18n.language, course?.instructor)}
                                          aria-label="Instructor's name"
                                       >
                                          <Avatar size="sm" src={course?.instructor?.image as string} />
                                       </Tooltip>
                                    </Box>
                                 </PermissionComponent.StudentOnly>
                              </Flex>
                           </ListLinkItem>
                        )
                     })}
                  </CelledList>
               )}
               {( coursesLoading ) && (
                  <Stack>
                     <Skeleton height="80px" borderRadius="md" />
                  </Stack>
               )}
            </Box>
         
         
         </UserDashboardLayout>
      </>
   )
}

export default Compose(
   withPageAuthRequired,
   withApollo({ ssr: true }),
   withAuth({ requireActiveAccount: true }),
   withDashboard(),
)(Page)

