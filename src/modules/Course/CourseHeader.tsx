import { MediaComponent } from '@slate/components/Layout/MediaQueries/MediaComponent'
import { PermissionComponent } from '@slate/components/Permissions'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { CourseSelectors } from '@slate/store/slices/courseSlice'
import { SchoolSelectors } from '@slate/store/slices/schoolSlice'
import { Utils } from '@slate/utils'
import { useColorMode } from 'chalkui/dist/cjs/ColorMode'
import { Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Box, Menu, MenuItem, MenuList, Text } from 'chalkui/dist/cjs/React'
import { useRouter } from 'next/router'
import React from 'react'
import { BiCalendar, BiChat, BiFile, BiFolder, BiGridAlt, BiUserCheck } from 'react-icons/bi'
import { useSelector } from 'react-redux'

const CourseHeaderLink = ({ icon, children, linkTo }: any) => {
   
   const router = useRouter()
   const course = useSelector(CourseSelectors.get)
   
   const iid = useSelector(SchoolSelectors.getIID)
   
   return (
      <MenuItem onClick={() => router.push(Utils.Url.schoolLinkTo(iid, `/course/${course.id}${linkTo}`))}>
         <Box fontSize={['1.8rem', '1.6rem', '1.6rem', '1.6rem', '1.6rem']}>
            {icon}
         </Box>
         <MediaComponent.HideOnMobile>
            <Text ml={3}>{children}</Text>
         </MediaComponent.HideOnMobile>
      </MenuItem>
   )
}

interface CourseHeaderProps {
   index: number
}

export const CourseHeader = ({ index }: CourseHeaderProps) => {
   const cmf = useCMF()
   const { colorMode } = useColorMode()
   
   const router = useRouter()
   const { id } = router.query
   
   const course = useSelector(CourseSelectors.get)
   
   return (
      <>
         
         <Flex
            height={["80px", "80px", "80px", "80px"]}
            backgroundColor={course?.banner_color ?? "#4f7c6e"}
            backgroundImage={'url(/assets/patterns/memphis-mini.png)'}
            backgroundBlendMode={"color-burn"}
            color="white"
            alignItems="center"
            justifyContent="center"
            p={3}
         >
            <Box>
               <Text fontSize="2rem" fontWeight="600">{course?.name}</Text>
            </Box>
         </Flex>
         
         <Flex
            justifyContent="center"
            borderBottom={colorMode === 'light' ? "2px #f3f3f3 solid" : "2px #4d4d4d solid"}
            bgColor={colorMode === 'light' ? 'white' : 'gray.800'}
         >
            <Menu
               variant="custom"
               borderRadius="none"
               // colorScheme="primary"
               defaultColor={cmf('gray.400', 'gray.400')}
               hoverColor={cmf('black', 'gray.300')}
               hoverBg={cmf('gray.100', 'gray.700')}
               selectedColor={cmf('black', 'white')}
               selectedBg={cmf('gray.200', 'gray.600')}
               size="md"
               spacing="0"
               index={index}
            >
               <MenuList
                  width="auto"
                  height="60px"
                  sx={{
                     '& > .chalk-menus__tab[aria-selected=true]': {
                        fontWeight: '700',
                        boxShadow: colorMode === 'light' ? 'inset 0 -9px 0px -7px #525252' : 'none',
                     },
                     '& > .chalk-menus__tab': {
                        fontSize: ['2rem', '1rem', '1rem', '1rem', '1rem'],
                     },
                  }}
               >
                  <CourseHeaderLink icon={<BiGridAlt />} linkTo={'/'}>Course</CourseHeaderLink>
                  <CourseHeaderLink icon={<BiFolder />} linkTo={'/content'}>Content</CourseHeaderLink>
                  <CourseHeaderLink icon={<BiChat />} linkTo={'/discussions'}>Discussions</CourseHeaderLink>
                  <PermissionComponent.StudentOnly>
                     <CourseHeaderLink icon={<BiCalendar />} linkTo="/calendar">Calendar</CourseHeaderLink>
                     <CourseHeaderLink icon={<BiFile />} linkTo="/grades">Grades</CourseHeaderLink>
                  </PermissionComponent.StudentOnly>
                  <PermissionComponent.AssistantAndHigher>
                     <CourseHeaderLink icon={<BiFile />} linkTo="/grade-center">Grade center</CourseHeaderLink>
                     <CourseHeaderLink icon={<BiUserCheck />} linkTo="/attendance">Attendance</CourseHeaderLink>
                  </PermissionComponent.AssistantAndHigher>
               </MenuList>
            </Menu>
         </Flex>
      
      </>
   )
   
}
