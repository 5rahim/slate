import { AiOutlineFileDone } from '@react-icons/all-files/ai/AiOutlineFileDone'
import { BiCalendar } from '@react-icons/all-files/bi/BiCalendar'
import { BiChat } from '@react-icons/all-files/bi/BiChat'
import { BiFile } from '@react-icons/all-files/bi/BiFile'
import { BiFolder } from '@react-icons/all-files/bi/BiFolder'
import { BiGroup } from '@react-icons/all-files/bi/BiGroup'
import { BiListUl } from '@react-icons/all-files/bi/BiListUl'
import { HiOutlineSpeakerphone } from '@react-icons/all-files/hi/HiOutlineSpeakerphone'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useCurrentSchool } from '@slate/hooks/useCurrentSchool'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Menu, MenuItem, MenuList } from 'chalkui/dist/cjs/Components/Menu'
import Link from 'next/link'
import React from 'react'

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
            bgColor={cmf(['#fff', '#fff'], ['#1d1d1d', '#1d1d1d'])}
            display={['none', 'none', 'none', 'block']}
         >
            
            <Menu
               variant="custom"
               borderRadius="md"
               orientation="vertical"
               defaultColor={cmf("gray.400", "gray.300")}
               hoverColor={cmf("gray.800", "gray.200")}
               hoverBg={cmf("gray.100", "gray.700")}
               selectedColor={cmf("#138b76", "white")}
               selectedBg={cmf("rgba(0,0,0,0.05)", "gray.600")}
               size="md"
               spacing=".5rem"
               width="full"
               index={index}
            >
               <MenuList>
                  <Link href={getHref('/')}>
                     <MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><BiFolder /></Box>{t('course:Content')}</MenuItem>
                  </Link>
                  <Link href={getHref('/announcements')}>
                     <MenuItem>
                        <Box ml={-1} mr={3} transform="rotate(-25deg)" fontSize="1.6rem"><HiOutlineSpeakerphone /></Box>{t('Announcements')}
                     </MenuItem>
                  </Link>
                  <Link href={getHref('/assessments')}>
                     <MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><AiOutlineFileDone /></Box>{t('Assessments')}</MenuItem>
                  </Link>
                  {/*<MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><BiHighlight /></Box>{t('course:Quizzes')}</MenuItem>*/}
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
