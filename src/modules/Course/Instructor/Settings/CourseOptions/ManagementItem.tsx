import { BiKey } from '@react-icons/all-files/bi/BiKey'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { ModuleSection } from '@slate/components/UI/Course/ModuleSection'
import { DataListModule } from '@slate/graphql/DataListModule'
import { getCourseManagements } from '@slate/graphql/schemas/courses/hooks'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { Utils } from '@slate/utils'
import { Flex, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Avatar, Box, Link, Skeleton, Text } from 'chalkui/dist/cjs/React'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function ManagementItem() {
   
   const { t, i18n } = useTranslation(['common', 'course'], { useSuspense: false })
   
   const course = useCurrentCourse()
   
   const [courseManagements, courseManagementsLoading, empty] = getCourseManagements(course.id)
   
   
   return (
      
      <ModuleSection
         icon={BiKey}
         title={t('course:Management')}
         // showAlertIcon={!course?.available}
      >
         <DataListModule
            data={courseManagements}
            dataIsLoading={courseManagementsLoading}
            dataIsEmpty={empty}
            fallback={
               <Stack mt="2">
                  <AlignedFlex>
                     <Skeleton height="30px" width="30px" borderRadius="50%" />
                     <Flex width="100%" gridGap=".5rem">
                        <Skeleton height="10px" width="40px" borderRadius="md" />
                        <Skeleton height="10px" width="50%" borderRadius="md" />
                     </Flex>
                  </AlignedFlex>
               </Stack>
            }
            displayData={() =>
               <>
                  <Flex>
                     <Text mr="2">{t( "course:options.assistant.yes")}</Text>
         
                     <Link>{t('Manage')}</Link>
      
                  </Flex>
                  <Box mt="1">
                     {courseManagements?.map((management) => {
                        return (
                           <Flex mb="2" alignItems="center" gridGap=".5rem" key={management.id}>
                              <Avatar src={management.manager?.image as string} size="sm" />
                              <Text>{Utils.Names.formatLocaleFullName(i18n.language, management.manager, false, true)}</Text>
                           </Flex>
                        )
                     })}
                  </Box>
               </>
            }
            empty={
               <Flex>
                  <Text mr="2">{t("course:options.assistant.no")}</Text>
      
                  <Link>{t('Add')}</Link>
   
               </Flex>
            }
         />
      </ModuleSection>
   )
   
}
