import { BiGroup } from '@react-icons/all-files/bi/BiGroup'
import { BiUserPin } from '@react-icons/all-files/bi/BiUserPin'
import { CgUserList } from '@react-icons/all-files/cg/CgUserList'
import { GrGroup } from '@react-icons/all-files/gr/GrGroup'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { ModuleSection } from '@slate/components/UI/Course/ModuleSection'
import { DividedList } from 'chalkui/dist/cjs/Components/Layout'
import { Link, Text } from 'chalkui/dist/cjs/React'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function StudentOptions() {
   const { t } = useTranslation(['common', 'course'], { useSuspense: false })
   
   
   return (
      <ComponentVisibility.InstructorOnly>
         <ModuleBox
            headerText="Student Options"
            headerIcon={<BiUserPin />}
            minimizeOnMobile={true}
         >
            <DividedList spacing={2} width="full">
         
               <ModuleSection
                  icon={BiGroup}
                  title={t('course:Roster')}
               >
                  <Text>Manage your students | <Link>View</Link></Text>
               </ModuleSection>
         
               <ModuleSection
                  icon={GrGroup}
                  title={t('course:Groups')}
               >
                  <Text>Manage student groups | <Link>Edit</Link></Text>
               </ModuleSection>
         
               <ModuleSection
                  icon={CgUserList}
                  title={t('course:Attendance')}
               >
                  <Text>Manage student attendance | <Link>Manage</Link></Text>
               </ModuleSection>
      
            </DividedList>
         </ModuleBox>
      </ComponentVisibility.InstructorOnly>
   )
}
