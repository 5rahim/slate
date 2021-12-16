import { BiFolder } from '@react-icons/all-files/bi/BiFolder'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { Modules } from '@slate/generated/graphql'
import { useChangeModuleFolder } from '@slate/graphql/schemas/modules/hooks'
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

interface UnitModuleMoveToFolderProps {
   isOpen: boolean
   onOpen: any
   onClose: any
   data: Modules,
   highlightModule: any
}

export const UnitModuleMoveToFolder = ({ isOpen, onClose, data, highlightModule }: UnitModuleMoveToFolderProps) => {
   
   const t = useTypeSafeTranslation()
   const cancelRef: any = useRef()
   const cache = useStoreCache()
   const selectRef: any = useRef()
   const modules = cache.read<Modules[] | null>('modules')
   
   const [moveModule, mutationLoading] = useChangeModuleFolder({
      onCompleted: () => {
         onClose()
      },
   })
   
   useEffect(() => {
      highlightModule(isOpen ? data.id : null)
   }, [isOpen])
   
   function handleMoveModule() {
      if(!selectRef.current.value || !(selectRef.current.value.length > 0)) return
      moveModule({
         id: data.id,
         folder_id: selectRef.current.value,
      })
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
                  <IconBox fontSize="2xl" colorScheme="primary" isCircular icon={<BiFolder />} mt={4} ml={4} position="absolute" />
                  <Box pl="3.5rem" width="100%">
                     <AlertDialogHeader>{t('course:Move to folder')}</AlertDialogHeader>
                     <AlertDialogBody pb="6">
                        
                        <FormControl id="country" mb="2">
                           <Select ref={selectRef}>
                              {modules?.filter((m) => m.type === UnitModuleTypes.Folder).map((module) => {
                                 return <option key={module.id} value={module.id}>{module.content}</option>
                              })}
                           </Select>
                        </FormControl>
                        
                        <Flex justifyContent="flex-end">
                           <Button
                              onClick={() => handleMoveModule()}
                              colorScheme="brand.100"
                              isDisabled={mutationLoading}
                           >
                              {t('Move')}
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

export default UnitModuleMoveToFolder
