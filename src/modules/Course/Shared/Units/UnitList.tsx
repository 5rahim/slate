import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { FcFolder } from '@react-icons/all-files/fc/FcFolder'
import { Empty } from '@slate/components/UI/Empty'
import { Units } from '@slate/generated/graphql'
import { DataListModule } from '@slate/graphql/DataListModule'
import { getLazyUnits, useMutateUnitOrder } from '@slate/graphql/schemas/units/hooks'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useGlobalCache } from '@slate/hooks/useGlobalCache'
import { UnitItem } from '@slate/modules/Course/Shared/Units/UnitItem'
import { Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Box, Flex, Skeleton } from 'chalkui/dist/cjs/React'
import React, { useEffect, useState } from 'react'

export function UnitList() {
   const { id } = useCurrentCourse()
   const [fetchUnits, units, loading, empty] = getLazyUnits(id)
   const cache = useGlobalCache()
   const [listedUnits, setListedUnits] = useState<Units[] | null>()
   
   const [updateUnitOrder] = useMutateUnitOrder()
   
   useEffect(() => {
      fetchUnits && fetchUnits()
   }, [])
   
   useEffect(() => {
      setListedUnits(cache.readUnits(units))
      cache.writeUnits(units, loading)
   }, [units, cache, loading])
   
   
   function handleSorting({ active, over }: DragEndEvent) {
      if (active.id !== over?.id) {
         setListedUnits((items) => {
            const oldIndex = items?.findIndex(item => item.id === active.id) ?? 0
            const newIndex = items?.findIndex(item => item.id === over?.id) ?? 0
            let n = arrayMove(( items as Units[] ), oldIndex as number, newIndex as number)
            let newArray: any[] = []
            n.forEach(val => newArray.push(Object.assign({}, val)))
            newArray.forEach((val, i) => {
               try {
                  newArray[i].order = i
               }
               catch (e) {
               }
            })
            updateUnitOrder({ objects: newArray?.map(({ __typename, ...rest }) => rest) })
            return newArray
         })
      }
   }
   
   return (
      <DataListModule
         data={listedUnits}
         dataIsLoading={cache.isDataLoading(units, loading)}
         dataIsEmpty={cache.noUnits(empty, loading)}
         displayData={({ list }) =>
            <Box>
               <DndContext
                  onDragEnd={handleSorting}
               >
                  <SortableContext strategy={verticalListSortingStrategy} items={listedUnits ? listedUnits?.map((unit) => unit.id) : []}>
                     {listedUnits?.map((unit) => (
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
