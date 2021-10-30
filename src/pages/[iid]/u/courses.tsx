import { withApollo } from 'slate/graphql/withApollo'
import UserDashboardLayout from 'slate/components/Layout/UserDashboard/UserDashboardLayout'
import React, { useEffect, useState } from 'react'
import { Compose } from 'slate/next/compose'
import { withAuth } from 'slate/middlewares/auth/withAuth'
import { withDashboard } from 'slate/middlewares/dashboard/withDashboard'
import { DefaultHead } from 'slate/components/Layout/DefaultHead'
import { useTranslation } from 'react-i18next'
import { Avatar, AvatarGroup, Box, CelledList, Heading, Icon, ListLinkItem, Tag, Text, Tooltip } from 'chalkui/dist/cjs/React'
import { Flex } from 'chalkui/dist/cjs/Components/Layout'
import { DashboardPage } from 'slate/next/types'
import { SlateCourse } from 'slate/graphql/types/Course'
import { Permissions } from 'slate/utils/permissions'
import { BiCalendarAlt } from 'react-icons/bi'
import { PermissionComponent } from 'slate/components/Permissions'
import { Utils } from 'slate/utils'
import { useRouter } from 'next/router'


const Page = ({ user, school, iid }: DashboardPage) => {
   
   const { t, i18n } = useTranslation(['common'], { useSuspense: false })
   const router = useRouter()
   const [courses, setCourses] = useState<SlateCourse[]>([])
   const [hiddenCourses, setHiddenCourses] = useState<SlateCourse[]>([])
   
   useEffect(() => {
      if (Permissions.only(user, 'instructor')) {
         
         user?.own_courses && setCourses(user.own_courses as SlateCourse[])
         
      } else if (Permissions.only(user, 'student')) {
         
         const enrollments = user?.enrolled_courses ?? []
         let courses: any = []
         let hiddenCourses: any = []
         for (const enrollment of enrollments) {
            if(enrollment.course.available) courses.push(enrollment.course)
            else hiddenCourses.push(enrollment.course)
         }
         user?.enrolled_courses && setCourses(courses)
         setHiddenCourses(hiddenCourses)
         
      }
   }, [])
   
   return (
      <>
         <DefaultHead pageTitle={t('Dashboard')} />
         
         <UserDashboardLayout>
            
            <Flex
               height={["100px", "100px", "200px", "200px"]}
               backgroundColor={"brand.800"}
               backgroundImage={'url(assets/patterns/topography.png)'}
               backgroundBlendMode={"color-burn"}
               color="white"
            >
               
               <Box width={['90%', '90%', '90%', '90%']} margin="auto">
                  
                  <Box>
                     <Heading size="2xl">{t('Your courses')}</Heading>
                  </Box>
               </Box>
            
            </Flex>
            
            You have {hiddenCourses.length} hidden courses
            
            <Box p={5}>
               {/*TODO CHANGE LEVEL !!!!!!!!!!!!*/}
               {courses?.length > 0 && (
                  <CelledList isFullWidth boxShadow="none" borderRadius="none">
                     {courses?.map((course: SlateCourse) => {
                        return (
                           <ListLinkItem key={course.id} px={6} py={4} onClick={() => router.push(Utils.Url.schoolLinkTo(iid, `/course/${course.id}`))}>
                              <Flex alignItems="center" justifyContent="space-between">
                                 <Box fontSize="md">
                                    <Flex gridGap="1rem">
                                       <Text fontSize="lg" fontWeight="bold">{course.name} {course.level}</Text>
                                       <Tag pill colorScheme="green.500">Open</Tag>
                                    </Flex>
                                    <Flex alignItems="center"><Icon as={BiCalendarAlt} mr={1} /><Text>Closing on January 7, 2025</Text></Flex>
                                 </Box>
                                 <PermissionComponent.AssistantAndHigher>
                                    <Box>
                                       <Tooltip placement="bottom-end" label={"Students"} aria-label="Student avatars">
                                          <AvatarGroup size="sm" max={5}>
                                             {course.enrollments?.map((enrollment) => {
                                                return <Avatar key={enrollment.id} src={enrollment.student?.image} />
                                             })}
                                          </AvatarGroup>
                                       </Tooltip>
                                    </Box>
                                 </PermissionComponent.AssistantAndHigher>
                                 <PermissionComponent.StudentOnly>
                                    <Box overflow="hidden">
                                       <Tooltip placement="bottom-end" label={"Instructor: " + Utils.Names.formatLocaleFullName(i18n.language, course.instructor)} aria-label="Instructor's name">
                                          <Avatar size="sm" src={course.instructor.image} />
                                       </Tooltip>
                                    </Box>
                                 </PermissionComponent.StudentOnly>
                              </Flex>
                           </ListLinkItem>
                        )
                     })}
                  </CelledList>
               )}
            </Box>
         
         
         </UserDashboardLayout>
      </>
   )
}

export default Compose(
   withApollo({ ssr: true }),
   withAuth({ requireAuth: true, requireActiveAccount: true }),
   withDashboard(),
)(Page)

