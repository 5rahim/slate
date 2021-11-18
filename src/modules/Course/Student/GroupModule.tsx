import { PermissionComponent } from '@slate/components/Permissions'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { MenuCelledList, MenuCelledListItem } from '@slate/components/UI/MenuCelledList'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { Text } from 'chalkui/dist/cjs'
import { Box } from 'chalkui/dist/cjs/React'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BiGroup } from 'react-icons/bi'

export function GroupModule() {
   const { t, i18n } = useTranslation(['common', 'course'], { useSuspense: false })
   
   const course = useCurrentCourse()
   
   
   return (
      <PermissionComponent.StudentOnly>
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
      </PermissionComponent.StudentOnly>
   )
   
}
