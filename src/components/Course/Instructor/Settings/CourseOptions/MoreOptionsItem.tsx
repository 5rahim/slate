import { DetailsItem } from '@slate/components/Course/Instructor/Settings/CourseOptions/DetailsItem'
import { DurationItem } from '@slate/components/Course/Instructor/Settings/CourseOptions/DurationItem'
import { ModuleSection } from '@slate/components/UI/Course/ModuleSection'
import { MenuCelledList, MenuCelledListItem } from '@slate/components/UI/MenuCelledList'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BiListPlus } from 'react-icons/bi'

export function MoreOptionsItem() {
   const { t } = useTranslation(['common', 'course'], { useSuspense: false })
   
   return (
      <ModuleSection
         icon={BiListPlus}
         title={t('course:More options')}
      >
         
         <MenuCelledList mt="2">
            
            <DetailsItem />
            
            <DurationItem />
            
            {/*<ScheduleItem />*/}
            
            <MenuCelledListItem>
               {t('Analytics')}
            </MenuCelledListItem>
         
         </MenuCelledList>
      </ModuleSection>
   )
}
