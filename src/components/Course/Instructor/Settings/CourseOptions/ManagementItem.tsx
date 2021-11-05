import { Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Link, Text } from 'chalkui/dist/cjs/React'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BiUserPin } from 'react-icons/bi'
import { ModuleSection } from 'slate/components/UI/Course/ModuleSection'
import { useCurrentCourse } from 'slate/hooks/use-current-course'

export function ManagementItem() {
   
   const { t } = useTranslation(['common', 'course'], { useSuspense: false })
   
   const course = useCurrentCourse()
   
   const hasAssistants = course?.management?.length && course?.management.length > 0
   
   return (
      
      <ModuleSection
         icon={BiUserPin}
         title={t('course:Management')}
         // showAlertIcon={!course?.available}
      >
         <Flex>
            <Text mr="2">{t(hasAssistants ? "course:options.assistant.yes" : "course:options.assistant.no")}</Text>
            
            <Link>{hasAssistants ? 'View' : 'Add'}</Link>
         
         </Flex>
      </ModuleSection>
   )
   
}
