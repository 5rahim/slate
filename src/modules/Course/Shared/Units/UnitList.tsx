import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { FcFolder } from '@react-icons/all-files/fc/FcFolder'
import { Empty } from '@slate/components/UI/Empty'
import { Units } from '@slate/generated/graphql'
import { DataListModule } from '@slate/graphql/DataListModule'
import { getLazyUnits, useMutateUnitOrder } from '@slate/graphql/schemas/units/hooks'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { UnitItem } from '@slate/modules/Course/Shared/Units/UnitItem'
import { useCachedLazyQuery } from '@slate/store/cache/hooks/useCachedLazyQuery'
import { DividedList, Flex, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Skeleton } from 'chalkui/dist/cjs/Components/Skeleton'
import React, { useCallback, useEffect, useState } from 'react'

export function UnitList() {
   const { id } = useCurrentCourse()
   const [listedUnits, setListedUnits] = useState<Units[] | null>()
   const [fetchUnits, units, loading, empty] = useCachedLazyQuery('units', getLazyUnits(id))
   const [updateUnitOrder] = useMutateUnitOrder()
   
   useEffect(() => {
      fetchUnits()
   }, [])
   
   useEffect(() => {
      setListedUnits(units)
   }, [units])
   
   
   const handleSorting = useCallback(({ active, over }: DragEndEvent) => {
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
   }, [])
   
   return (
      <DataListModule
         data={listedUnits}
         dataIsLoading={loading}
         dataIsEmpty={empty}
         displayData={({ list }) =>
            <DividedList overflow="hidden" width="100%" position="relative">
               <DndContext
                  onDragEnd={handleSorting}
               >
                  <SortableContext strategy={verticalListSortingStrategy} items={listedUnits ? listedUnits?.map((unit) => unit.id) : []}>
                     {listedUnits?.map((unit) => (
                        <UnitItem key={unit.id} id={unit.id} data={unit} />
                     ))}
                  </SortableContext>
               </DndContext>
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
            <Empty icon={FcFolder} text="No course content" />
         }
      />
   
   )
   
}
