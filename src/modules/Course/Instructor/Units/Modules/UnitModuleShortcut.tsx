import { BiLinkExternal } from '@react-icons/all-files/bi/BiLinkExternal'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { CreateModuleMutationVariables, Modules, Units } from '@slate/generated/graphql'
import { useCreateModule } from '@slate/graphql/schemas/modules/hooks'
import { useCurrentUnit, useUnitHelpers } from '@slate/hooks/useCurrentUnit'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { UnitModuleTypes } from '@slate/types/UnitModules'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { FormControl } from 'chalkui/dist/cjs/Components/FormControl'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox/IconBox'
import { Box, Flex } from 'chalkui/dist/cjs/Components/Layout'
import {
   AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay,
} from 'chalkui/dist/cjs/Components/Modal/AlertDialog'
import { Select } from 'chalkui/dist/cjs/Components/Select'
import React, { useEffect, useRef } from 'react'

interface UnitModuleShortcutProps {
   isOpen: boolean
   onOpen: any
   onClose: any
   data: Modules,
   highlightModule: any
}

export const UnitModuleShortcut = ({ isOpen, onClose, data, highlightModule }: UnitModuleShortcutProps) => {
   
   const t = useTypeSafeTranslation()
   const cancelRef: any = useRef()
   const cache = useStoreCache()
   const { getUnitName } = useUnitHelpers()
   const currentUnit = useCurrentUnit()
   const selectRef: any = useRef()
   const units = cache.read<Units[]>('units')
   const unit = useCurrentUnit()
   
   const [createShortcut, mutationLoading] = useCreateModule({
      onCompleted: () => {
         onClose()
      }
   })
   
   useEffect(() => {
      highlightModule(isOpen ? data.id : null)
   }, [isOpen])
   
   function handleMoveModule() {
      if(!selectRef.current.value || !(selectRef.current.value.length > 0)) return
   
      let insert_data: CreateModuleMutationVariables = {
         unit_id: selectRef.current.value,
         type: UnitModuleTypes.Shortcut,
         order: 999,
         content: data.id,
         folder_id: null
      }
      
      createShortcut(insert_data)
   }
   
   return (
      <ComponentVisibility.InstructorOnly>
         
         <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={() => !mutationLoading && onClose()}
            isOpen={isOpen}
            size="xl"
            isCentered
         >
            <AlertDialogOverlay />
            
            <AlertDialogContent width="100%">
               <AlertDialogCloseButton />
               <Flex width="100%">
                  <IconBox fontSize="2xl" colorScheme="primary" isCircular icon={<BiLinkExternal />} mt={4} ml={4} position="absolute" />
                  <Box pl="3.5rem" width="100%">
                     <AlertDialogHeader>{t('course:Create a shortcut')}</AlertDialogHeader>
                     <AlertDialogBody pb="6">
                        
                        <FormControl id="country" mb="2">
                           <Select ref={selectRef}>
                              {units?.filter((u) => u.id !== currentUnit.id).map((unit) => {
                                 return <option key={unit.id} value={unit.id}>{getUnitName(unit)}</option>
                              })}
                           </Select>
                        </FormControl>
                        
                        <Flex justifyContent="flex-end">
                           <Button
                              onClick={() => handleMoveModule()}
                              colorScheme="brand.100"
                              isDisabled={mutationLoading}
                           >
                              {t('Create')}
                           </Button>
                        </Flex>
                     
                     </AlertDialogBody>
                  </Box>
               </Flex>
            </AlertDialogContent>
         </AlertDialog>
      </ComponentVisibility.InstructorOnly>
   )
   
}

export default UnitModuleShortcut
