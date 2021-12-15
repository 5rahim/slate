import { BiCalendarAlt } from '@react-icons/all-files/bi/BiCalendarAlt'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { Courses } from '@slate/generated/graphql'
import { DataListItem } from '@slate/graphql/DataListModule'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentSchool } from '@slate/hooks/useCurrentSchool'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
import { useLocale } from '@slate/hooks/useLocale'
import { useMediaSizes } from '@slate/hooks/useMediaSizes'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useUserRole } from '@slate/hooks/useUserRole'
import { Utils } from '@slate/utils'
import { Avatar } from 'chalkui/dist/cjs/Components/Avatar/Avatar'
import { AvatarGroup } from 'chalkui/dist/cjs/Components/Avatar/AvatarGroup'
import { Icon } from 'chalkui/dist/cjs/Components/Icon/Icon'
import { Box, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Tag } from 'chalkui/dist/cjs/Components/Tag/Tag'
import { Tooltip } from 'chalkui/dist/cjs/Components/Tooltip/Tooltip'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import { useRouter } from 'next/router'
import React from 'react'

export const CoursesListItem: DataListItem<Courses> = (props) => {
   const router = useRouter()
   const { data: course } = props
   const { iid } = useCurrentSchool()
   const locale = useLocale()
   const t = useTypeSafeTranslation()
   const { isStudent, isInstructor } = useUserRole()
   const { formatDate } = useDateFormatter()
   const cmf = useCMF()
   const { isDesktop } = useMediaSizes()
   
   let CourseTag
   let CourseInfo
   
   if (course.available) {
      CourseTag = <Tag pill colorScheme="green.500">{t('Open')}</Tag>
   } else {
      CourseTag = <Tag pill colorScheme="red.500">{t('Not available')}</Tag>
   }
   
   if (!course.available && course.duration) {
      CourseInfo = <>
         <Icon as={BiCalendarAlt} mr={1} />
         <Text>{t('Opening on')}</Text>&nbsp;
         <Text>{formatDate(Utils.Dates.parseDurationDateObject(course.duration).startDate, 'long')}</Text>
      </>
   } else if (course.duration) {
      CourseInfo = <>
         <Icon as={BiCalendarAlt} mr={1} />
         <Text>{formatDate(Utils.Dates.parseDurationDateObject(course.duration).startDate, 'long')}</Text>
         <Text>&nbsp;{t('to')}&nbsp;</Text>
         <Text>{formatDate(Utils.Dates.parseDurationDateObject(course.duration).endDate, 'long')}</Text>
      </>
   }
   
   return (
      <Box
         bgColor={cmf('#fff', 'gray.800')}
         mb={4}
         key={course?.id}
         px={6}
         py={4}
         boxShadow="sm"
         borderRadius="2xl"
         onClick={() => ( course.available || isInstructor ) && router.push(Utils.Url.schoolLinkTo(iid, `/course/${course?.id}`))}
         sx={{
            cursor: ( !course.available && isStudent ) ? 'normal' : 'pointer',
            _hover: ( !course.available && isStudent ) ? {
               // bgColor: 'transparent !important',
            } : {
               borderRadius: '2xl',
               boxShadow: isDesktop ? 'lg' : 'sm',
               transition: 'all .15s linear',
               
            },
         }}
      >
         <Flex
            alignItems="center"
            justifyContent="space-between"
         >
            
            <Box
               fontSize="md"
               sx={{
                  opacity: ( !course.available && isStudent ) ? '.6' : 1,
               }}
            >
               
               <Flex gridGap="1rem">
                  <Text fontSize="lg" fontWeight="bold">{course?.name} {course?.level}</Text>
                  
                  {CourseTag}
               
               </Flex>
               
               <Flex alignItems="center">
                  {CourseInfo}
               </Flex>
            
            </Box>
            
            <ComponentVisibility.AssistantAndHigher>
               <Box>
                  <Tooltip placement="bottom-end" label={"Students"} aria-label="Student avatars">
                     <AvatarGroup size="sm" max={5}>
                        {course?.enrollments?.map((enrollment) => {
                           return <Avatar key={enrollment?.id} src={enrollment?.student?.image as string} />
                        })}
                     </AvatarGroup>
                  </Tooltip>
               </Box>
            </ComponentVisibility.AssistantAndHigher>
            
            <ComponentVisibility.StudentOnly>
               <Box overflow="hidden">
                  <Tooltip
                     placement="bottom-end"
                     label={"Instructor: " + Utils.Names.formatLocaleFullName(locale, course?.instructor)}
                     aria-label="Instructor's name"
                  >
                     <Avatar size="sm" src={course?.instructor?.image as string} />
                  </Tooltip>
               </Box>
            </ComponentVisibility.StudentOnly>
         
         </Flex>
      </Box>
   )
   
}
