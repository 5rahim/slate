import { FcPodiumWithAudience } from '@react-icons/all-files/fc/FcPodiumWithAudience'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { Empty } from '@slate/components/UI/Empty'
import { Gradebook_Items } from '@slate/generated/graphql'
import { DataListModule } from '@slate/graphql/DataListModule'
import { getLazyGradebookItems } from '@slate/graphql/schemas/gradebook_items/hooks'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useUserRole } from '@slate/hooks/useUserRole'
import { AssessmentItem } from '@slate/modules/Course/Shared/Assessments/AssessmentItem'
import { useCachedLazyQuery } from '@slate/store/cache/hooks/useCachedLazyQuery'
import { DividedList, Flex, ListItem, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Skeleton } from 'chalkui/dist/cjs/Components/Skeleton'
import { Text } from 'chalkui/dist/cjs/Components/Typography'
import React, { useEffect, useState } from 'react'

export function AssessmentList() {
   const t = useTypeSafeTranslation()
   const course = useCurrentCourse()
   const role = useUserRole()
   const [fetchGradebookItems, gradebookItems, loading, empty] = useCachedLazyQuery('gradebookItems', getLazyGradebookItems(course.id, role.isReallyAssistantOrInstructor))
   const [assignments, setAssignments] = useState<{ gradebookItem: Gradebook_Items, data: Gradebook_Items['assignment'] }[]>([])
   
   useEffect(() => {
      fetchGradebookItems()
   }, [])
   
   useEffect(() => {
      gradebookItems?.map((gradebookItem) => {
         setAssignments(a => [...a.filter((e) => e?.data?.id !== gradebookItem.assignment?.id),
            { gradebookItem: gradebookItem, data: gradebookItem.assignment }])
      })
   }, [gradebookItems])
   
   useEffect(() => {
      console.log(assignments)
   }, [assignments])
   
   return (
      <DataListModule
         data={gradebookItems}
         dataIsLoading={loading}
         dataIsEmpty={empty}
         displayData={({ list }) =>
            <DividedList width="100%" position="relative">
               <ListItem py="2">
                  <AlignedFlex fontSize="1.5rem" fontWeight="bold">
                     {/*<Icon as={BiEraser} />*/}
                     <Text>{t('Assignments')}</Text>
                  </AlignedFlex>
               </ListItem>
               {assignments?.map(assignment => {
                  return (
                     <AssessmentItem key={assignment.gradebookItem.id} gradebookItem={assignment.gradebookItem} data={assignment.data} />
                  )
               })}
            </DividedList>
         }
         fallback={
            <Stack gridGap="1rem">
               <Stack>
                  <Flex gridGap=".5rem">
                     <Skeleton height="10px" width="20%" borderRadius="md" />
                     <Skeleton height="10px" width="50px" borderRadius="md" />
                  </Flex>
                  <Skeleton height="10px" width="70%" borderRadius="md" />
                  <Skeleton height="10px" width="70%" borderRadius="md" />
               </Stack>
               <Stack>
                  <Flex gridGap=".5rem">
                     <Skeleton height="10px" width="20%" borderRadius="md" />
                     <Skeleton height="10px" width="50px" borderRadius="md" />
                  </Flex>
                  <Skeleton height="10px" width="70%" borderRadius="md" />
                  <Skeleton height="10px" width="70%" borderRadius="md" />
               </Stack>
            </Stack>
         }
         empty={
            <Empty icon={FcPodiumWithAudience} text="No assessments" />
         }
      />
   )
   
}
