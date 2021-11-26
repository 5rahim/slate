import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Empty } from '@slate/components/UI/Empty'
import { DataListModule } from '@slate/graphql/DataListModule'
import { getUnits } from '@slate/graphql/schemas/units/hooks'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { UnitItem } from '@slate/modules/Course/Shared/Units/UnitItem'
import { Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Box, Flex, Skeleton } from 'chalkui/dist/cjs/React'
import React from 'react'
import { FcFolder } from 'react-icons/fc'

export function UnitList() {
   const { id } = useCurrentCourse()
   const [units, loading, empty] = getUnits(id)
   
   return (
      <DataListModule
         data={units}
         dataIsLoading={loading}
         dataIsEmpty={empty}
         displayData={({ list }) =>
            <Box>
               <DndContext>
                  <SortableContext strategy={verticalListSortingStrategy} items={units ? units?.map((unit) => unit.id) : []}>
                     {units?.map((unit) => (
                        <UnitItem key={unit.id} id={unit.id} data={unit} />
                     ))}
                  </SortableContext>
               </DndContext>
            </Box>
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
            <Empty icon={FcFolder} text="No course content" />
         }
      />
   
   )
   
}
