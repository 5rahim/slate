import { BiGroup } from '@react-icons/all-files/bi/BiGroup'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { MenuCelledList, MenuCelledListItem } from '@slate/components/UI/MenuCelledList'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function GroupModule() {
   const { t, i18n } = useTranslation(['common', 'course'], { useSuspense: false })
   
   const course = useCurrentCourse()
   
   
   return (
      <ComponentVisibility.StudentOnly>
         <ModuleBox headerText={t('course:Your group')} headerIcon={<BiGroup />}>
      
            <Box mb="2">
         
               <Text>{t('course:Group members')}:</Text>
         
               <MenuCelledList mt="2">
            
                  <MenuCelledListItem>
                     {t('course:File exchange')}
                  </MenuCelledListItem>
                  <MenuCelledListItem>
                     {t('course:Discussion board')}
                  </MenuCelledListItem>
         
               </MenuCelledList>
            </Box>
   
         </ModuleBox>
      </ComponentVisibility.StudentOnly>
   )
   
}
