import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { FcFolder } from '@react-icons/all-files/fc/FcFolder'
import { Empty } from '@slate/components/UI/Empty'
import { Modules } from '@slate/generated/graphql'
import { DataListModule } from '@slate/graphql/DataListModule'
import { getLazyModules, useMutateModuleOrder } from '@slate/graphql/schemas/modules/hooks'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useCurrentUnit } from '@slate/hooks/useCurrentUnit'
import { useModuleFolder } from '@slate/hooks/useModuleFolder'
// import { UnitModuleItem } from '@slate/modules/Course/Shared/Units/Modules/UnitModuleItem'
import { useCachedLazyQuery } from '@slate/store/cache/hooks/useCachedLazyQuery'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { CelledList, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Skeleton } from 'chalkui/dist/cjs/Components/Skeleton'
import dynamic from 'next/dynamic'
import React, { useCallback, useEffect, useState } from 'react'

const UnitModuleItem = dynamic(() => import('@slate/modules/Course/Shared/Units/Modules/UnitModuleItem'))

export function UnitModuleList() {
   const { id } = useCurrentCourse()
   const cache = useStoreCache()
   const unit = useCurrentUnit()
   const cmf = useCMF()
   
   const [updateModuleOrder] = useMutateModuleOrder()
   const [listed, setListed] = useState<Modules[] | null>()
   const [fetchModules, modules, isLoading, isEmpty] = useCachedLazyQuery('modules', getLazyModules(unit.id))
   
   const { openPendingFolder } = useModuleFolder()
   
   useEffect(() => {
      fetchModules()
   }, [])
   
   useEffect(() => {
      // !!modules && setListed(modules)
      if(modules) {
         setListed(modules)
         // openPendingFolder() TODO: Solve bug where current folder is closed when new data arrives
      }
   }, [modules])
   
   
   const handleSorting = useCallback(({ active, over }: DragEndEvent) => {
      if (active.id !== over?.id) {
         setListed((items) => {
            const oldIndex = items?.findIndex(item => item.id === active.id) ?? 0
            const newIndex = items?.findIndex(item => item.id === over?.id) ?? 0
            let n = arrayMove(( items as Modules[] ), oldIndex as number, newIndex as number)
            let newArray: any[] = []
            n.forEach(val => newArray.push(Object.assign({}, val)))
            newArray.forEach((val, i) => {
               try {
                  newArray[i].order = i
               }
               catch (e) {
               }
            })
            updateModuleOrder({ objects: newArray?.map(({ __typename, ...rest }) => rest) })
            return newArray
         })
      }
   }, [])
   
   return (
      <DataListModule
         data={listed}
         dataIsLoading={isLoading}
         dataIsEmpty={isEmpty}
         displayData={({ list }) =>
            <CelledList
               boxShadow="none"
               borderWidth="2px"
               borderColor={cmf("gray.200", 'gray.700')}
               width="100%"
               transition="all .15s linear"
               _hover={{
                  boxShadow: 'md',
               }}
            >
               <DndContext
                  onDragEnd={handleSorting}
               >
                  <SortableContext strategy={verticalListSortingStrategy} items={listed ? listed?.map((module) => module.id) : []}>
                     {listed?.map((module) => {
                        return <UnitModuleItem key={module.id} id={module.id} data={module} />
                     })}
                  </SortableContext>
               </DndContext>
            </CelledList>
         }
         fallback={
            <Stack gridGap="1rem">
               <Stack>
                  <Skeleton height="50px" width="100%" borderRadius="md" />
                  <Skeleton height="50px" width="100%" borderRadius="md" />
                  <Skeleton height="50px" width="100%" borderRadius="md" />
               </Stack>
            </Stack>
         }
         empty={
            <Empty icon={FcFolder} text="No course content" />
         }
      />
   
   )
   
}
