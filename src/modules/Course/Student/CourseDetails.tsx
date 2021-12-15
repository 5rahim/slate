import { BiBookContent } from '@react-icons/all-files/bi/BiBookContent'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { MenuCelledList, MenuCelledListItem } from '@slate/components/UI/MenuCelledList'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { Utils } from '@slate/utils'
import { Avatar } from 'chalkui/dist/cjs/Components/Avatar/Avatar'
import { Box, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function CourseDetails() {
   const { t, i18n } = useTranslation(['common', 'course'], { useSuspense: false })
   
   const course = useCurrentCourse()
   
   
   return (
      <ComponentVisibility.StudentAndAssistant>
         <ModuleBox headerText={t('course:Course Details')} headerIcon={<BiBookContent />}>
            
            <Box mb="2">
               <Text mb="2" fontSize="xl">{t('course:Instructor')}:</Text>
               
               <Flex alignItems="center" gridGap=".5rem" mb="2">
                  <Avatar src={course?.instructor?.image as string} size="sm" />
                  <Text fontSize="xl">{Utils.Names.formatLocaleFullName(i18n.language, course?.instructor)}</Text>
               </Flex>
               
               <MenuCelledList mt="2">
                  
                  <MenuCelledListItem>
                     {t('course:Message instructor')}
                  </MenuCelledListItem>
                  
                  <ComponentVisibility.StudentOnly>
                     <MenuCelledListItem>
                        {t('course:Message course assistant')}
                     </MenuCelledListItem>
                  </ComponentVisibility.StudentOnly>
               
               </MenuCelledList>
            </Box>
         
         </ModuleBox>
      </ComponentVisibility.StudentAndAssistant>
   )
   
}
