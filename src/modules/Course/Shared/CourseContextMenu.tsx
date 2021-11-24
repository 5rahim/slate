import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useCurrentSchool } from '@slate/hooks/useCurrentSchool'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Box, Menu, MenuItem, MenuList } from 'chalkui/dist/cjs/React'
import Link from 'next/link'
import React from 'react'
import { BiCalendar, BiChat, BiDetail, BiFile, BiFolder, BiGroup, BiHighlight, BiListUl } from 'react-icons/bi'
import { HiOutlineSpeakerphone } from 'react-icons/hi'

interface CourseContextMenuProps {
   index?: number
}

export function CourseContextMenu({ index = 0 }: CourseContextMenuProps) {
   
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const { id } = useCurrentCourse()
   const { iid } = useCurrentSchool()
   
   function getHref(to: string) {
      return {
         pathname: '/[iid]/u/course/[course_id]' + to,
         query: { course_id: id, iid },
      }
   }
   
   
   return (
      <ComponentVisibility.All>
         <ModuleBox
            minimizeOnMobile={true}
            headerText={t('course:Course Menu')}
            headerIcon={<BiListUl />}
            bgColor={cmf(['antiquewhite', '#fff'], ['gray.700', 'gray.700'])}
         >
            
            <Menu
               variant="custom"
               borderRadius="md"
               orientation="vertical"
               defaultColor={cmf("gray.400", "gray.300")}
               hoverColor={cmf("gray.800", "gray.200")}
               hoverBg={cmf("gray.100", "gray.700")}
               selectedColor={cmf("black", "white")}
               selectedBg={cmf("rgba(255,255,255,0.5)", "gray.600")}
               size="md"
               spacing=".5rem"
               width="full"
               index={index}
            >
               <MenuList>
                  <Link href={getHref('/')}>
                     <MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><HiOutlineSpeakerphone /></Box>{t('course:Announcements')}</MenuItem>
                  </Link>
                  <Link href={getHref('/content')}>
                     <MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><BiFolder /></Box>{t('course:Content')}</MenuItem>
                  </Link>
                  <MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><BiDetail /></Box>{t('course:Assignments')}</MenuItem>
                  <MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><BiHighlight /></Box>{t('course:Quizzes')}</MenuItem>
                  <MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><BiChat /></Box>{t('course:Discussion board')}</MenuItem>
                  <MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><BiCalendar /></Box>{t('course:Calendar')}</MenuItem>
                  <MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><BiFile /></Box>{t('course:Grades')}</MenuItem>
                  <ComponentVisibility.StudentOnly>
                     <MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><BiGroup /></Box>{t('course:Group')}</MenuItem>
                  </ComponentVisibility.StudentOnly>
                  
                  <ComponentVisibility.AssistantAndHigher>
                     <MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><BiGroup /></Box>{t('course:Groups')}</MenuItem>
                  </ComponentVisibility.AssistantAndHigher>
               
               
               </MenuList>
            </Menu>
         
         </ModuleBox>
      </ComponentVisibility.All>
   )
   
}
