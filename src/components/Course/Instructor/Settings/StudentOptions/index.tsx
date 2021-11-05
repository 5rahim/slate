import { DividedList } from 'chalkui/dist/cjs/Components/Layout'
import { Link, Text } from 'chalkui/dist/cjs/React'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BiCog, BiGroup, BiListUl } from 'react-icons/bi'
import { ModuleBox } from 'slate/components/UI/Course/ModuleBox'
import { ModuleSection } from 'slate/components/UI/Course/ModuleSection'

export function StudentOptions() {
   const { t } = useTranslation(['common', 'course'], { useSuspense: false })
   
   
   return (
      <ModuleBox headerText="Student Options" headerIcon={<BiCog />}>
         <DividedList spacing={2} width="full">
            
            <ModuleSection
               icon={BiGroup}
               title={t('course:Roster')}
            >
               <Text>Manage your students | <Link>View</Link></Text>
            </ModuleSection>
            
            <ModuleSection
               icon={BiGroup}
               title={t('course:Groups')}
            >
               <Text>Manage student groups | <Link>Edit</Link></Text>
            </ModuleSection>
            
            <ModuleSection
               icon={BiListUl}
               title={t('course:Attendance')}
            >
               <Text>Manage student attendance | <Link>Manage</Link></Text>
            </ModuleSection>
         
         </DividedList>
      </ModuleBox>
   )
}
