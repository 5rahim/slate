import { DividedList } from 'chalkui/dist/cjs/Components/Layout'
import { useTranslation } from 'react-i18next'
import { BiSliderAlt } from 'react-icons/bi'
import { AccessCodeItem } from 'slate/components/Course/Instructor/Settings/CourseOptions/AccessCodeItem'
import { AvailabilityItem } from 'slate/components/Course/Instructor/Settings/CourseOptions/AvailabilityItem'
import { ManagementItem } from 'slate/components/Course/Instructor/Settings/CourseOptions/ManagementItem'
import { MoreOptionsItem } from 'slate/components/Course/Instructor/Settings/CourseOptions/MoreOptionsItem'
import { ModuleBox } from 'slate/components/UI/Course/ModuleBox'


export function CourseOptions() {
   const { t } = useTranslation(['common', 'course'], { useSuspense: false })
   
   return (
      <ModuleBox headerText={t('course:Course Options')} headerIcon={<BiSliderAlt />}>
         <DividedList spacing={2} width="full">
            
            <AvailabilityItem />
            
            <AccessCodeItem />
            
            <ManagementItem />
            
            <MoreOptionsItem />
         
         </DividedList>
      </ModuleBox>
   )
   
}
