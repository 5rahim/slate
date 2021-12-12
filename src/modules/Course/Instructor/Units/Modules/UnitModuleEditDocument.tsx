import { BiCheck } from '@react-icons/all-files/bi/BiCheck'
import { BiEdit } from '@react-icons/all-files/bi/BiEdit'
import { BiPlus } from '@react-icons/all-files/bi/BiPlus'
import { BiX } from '@react-icons/all-files/bi/BiX'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { Modules } from '@slate/generated/graphql'
import { useCurrentUnit, useUnitHelpers } from '@slate/hooks/useCurrentUnit'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { UnitModuleTypes } from '@slate/types/UnitModules'
import { ButtonGroup } from 'chalkui/dist/cjs/Components/Button/ButtonGroup'
import { IconButton } from 'chalkui/dist/cjs/Components/Button/IconButton'
import { Editable, EditableInput, EditablePreview, useEditableControls } from 'chalkui/dist/cjs/Components/Editable/Editable'
import { Flex } from 'chalkui/dist/cjs/Components/Layout/Flex'
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from 'chalkui/dist/cjs/Components/Modal/Drawer'
import React, { useRef } from 'react'

interface UnitModuleEditDocumentProps {
   isOpen: boolean
   onClose: any
   data: Modules,
}

export const UnitModuleEditDocument = ({ isOpen, onClose, data }: UnitModuleEditDocumentProps) => {
   
   const t = useTypeSafeTranslation()
   const cancelRef: any = useRef()
   const cache = useStoreCache()
   const { getUnitName } = useUnitHelpers()
   const currentUnit = useCurrentUnit()
   const selectRef: any = useRef()
   
   let content = data.content.startsWith('{') || data.content.startsWith('[') ? JSON.parse(data.content) : null
   
   
   return (
      <ComponentVisibility.InstructorOnly>
   
         {
            data.type === UnitModuleTypes.Document && (
               <Drawer size="xl" placement={'right'} onClose={onClose} isOpen={isOpen}>
                  <DrawerOverlay />
                  <DrawerContent>
                     <DrawerCloseButton />
                     <DrawerHeader borderBottomWidth='1px'>
                        <Editable
                           textAlign='center'
                           defaultValue={content.name}
                           fontSize='2xl'
                           isPreviewFocusable={false}
                        >
                           <EditablePreview />
                           <EditableInput />
                           <EditableControls />
                        </Editable>
                     </DrawerHeader>
                     <DrawerBody>
                        
                        
                        <IconButton aria-label="" as={BiPlus} />
                        
                        <ButtonGroup>
                        
                        </ButtonGroup>
                        
                     </DrawerBody>
                  </DrawerContent>
               </Drawer>
            )
         }
      
      </ComponentVisibility.InstructorOnly>
   )
   
}

function EditableControls() {
   const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
   } = useEditableControls()
   
   return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
         <IconButton icon={<BiCheck />} {...getSubmitButtonProps()} />
         <IconButton icon={<BiX />} {...getCancelButtonProps()} />
      </ButtonGroup>
   ) : (
      <Flex justifyContent='center'>
         <IconButton size='sm' icon={<BiEdit />} {...getEditButtonProps()} />
      </Flex>
   )
}
