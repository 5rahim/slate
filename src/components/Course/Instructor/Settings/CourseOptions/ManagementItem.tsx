import { ModuleSection } from '@slate/components/UI/Course/ModuleSection'
import { getAllCourseManagements, getCourseManagements } from '@slate/graphql/queries/courses/hooks'
import { useCurrentCourse } from '@slate/hooks/use-current-course'
import { Utils } from '@slate/utils'
import { Flex, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Avatar, Box, Link, Skeleton, Text } from 'chalkui/dist/cjs/React'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiUserPin } from 'react-icons/bi'

export function ManagementItem() {
   
   const { t, i18n } = useTranslation(['common', 'course'], { useSuspense: false })
   
   const course = useCurrentCourse()
   
   const [courseManagements, courseManagementsLoading] = getCourseManagements(course.id)
   
   
   const [hasAssistants, setHasAssistants] = useState<boolean>(false)
   
   useEffect(() => {
      if (courseManagements && courseManagements.length > 0) {
         setHasAssistants(true)
      }
   }, [courseManagements])
   
   return (
      
      <ModuleSection
         icon={BiUserPin}
         title={t('course:Management')}
         // showAlertIcon={!course?.available}
      >
         {!courseManagementsLoading
            ? (
               <>
                  <Flex>
                     <Text mr="2">{t(hasAssistants ? "course:options.assistant.yes" : "course:options.assistant.no")}</Text>
                     
                     <Link>{t(!hasAssistants ? 'Add' : 'Manage')}</Link>
                  
                  </Flex>
                  <Box mt="1">
                     {( courseManagements && hasAssistants ) && courseManagements.map((management) => {
                        return (
                           <Flex mb="2" alignItems="center" gridGap=".5rem" key={management.id}>
                              <Avatar src={management.manager?.image as string} size="sm" />
                              <Text>{Utils.Names.formatLocaleFullName(i18n.language, management.manager, false, true)}</Text>
                           </Flex>
                        )
                     })}
                  </Box>
               </>
            ) : (
               <Stack mt="2">
                  <Skeleton height="10px" borderRadius="md" />
               </Stack>
            )}
      </ModuleSection>
   )
   
}
