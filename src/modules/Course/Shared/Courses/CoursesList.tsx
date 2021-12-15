import { DataListModule } from '@slate/graphql/DataListModule'
import { getCourseList } from '@slate/graphql/schemas/courses/hooks'
import { CoursesListItem } from '@slate/modules/Course/Shared/Courses/CoursesListItem'
import { Box, Flex, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Skeleton } from 'chalkui/dist/cjs/Components/Skeleton/Skeleton'

import React from 'react'

export function CoursesList() {
   
   const [courses, coursesLoading, empty] = getCourseList()
   
   return (
      <DataListModule
         data={courses}
         dataIsLoading={coursesLoading}
         dataIsEmpty={empty}
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
         displayData={({ list }) =>
            <Box>
               {list(CoursesListItem)}
            </Box>
         }
      />
   
   )
   
}
