import { PermissionComponent } from '@slate/components/Permissions'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { Box, Menu, MenuItem, MenuList } from 'chalkui/dist/cjs/React'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BiDetail, BiFolder, BiFolderOpen, BiHighlight } from 'react-icons/bi'
import { HiOutlineSpeakerphone } from 'react-icons/hi'

interface CourseContentMenuProps {
   index?: number
}

export function CourseContentMenu({ index = 0 }: CourseContentMenuProps) {
   
   const cmf = useCMF()
   
   const { t, i18n } = useTranslation(['common', 'course'], { useSuspense: false })
   
   const course = useCurrentCourse()
   
   
   return (
      <PermissionComponent.StudentOnly>
         <ModuleBox headerText={t('course:Course Content')} headerIcon={<BiFolderOpen />}>
      
            <Menu
               variant="custom"
               borderRadius="md"
               orientation="vertical"
               // colorScheme="primary"
               defaultColor={cmf("gray.400", "gray.300")}
               hoverColor={cmf("gray.800", "gray.200")}
               hoverBg={cmf("gray.100", "gray.700")}
               selectedColor={cmf("black", "white")}
               selectedBg={cmf("#dddddd", "gray.600")}
               size="md"
               spacing=".5rem"
               width="full"
               index={index}
            >
               <MenuList>
                  <MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><HiOutlineSpeakerphone /></Box>{t('course:Announcements')}</MenuItem>
                  <MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><BiFolder /></Box>{t('course:Content')}</MenuItem>
                  <MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><BiDetail /></Box>{t('course:Assignments')}</MenuItem>
                  <MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><BiHighlight /></Box>{t('course:Quizzes')}</MenuItem>
                  {/*<MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><BiChat /></Box>{t('course:Discussion board')}</MenuItem>*/}
                  {/*<MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><BiCalendar /></Box>{t('course:Calendar')}</MenuItem>*/}
                  {/*<MenuItem><Box ml={-1} mr={3} fontSize="1.6rem"><BiFile /></Box>{t('course:Grades')}</MenuItem>*/}
               </MenuList>
            </Menu>
   
         </ModuleBox>
      </PermissionComponent.StudentOnly>
   )
   
}
