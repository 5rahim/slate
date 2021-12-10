import { BiAddToQueue } from '@react-icons/all-files/bi/BiAddToQueue'
import { BiEditAlt } from '@react-icons/all-files/bi/BiEditAlt'
import { BiEraser } from '@react-icons/all-files/bi/BiEraser'
import { BiHeading } from '@react-icons/all-files/bi/BiHeading'
import { BiLink } from '@react-icons/all-files/bi/BiLink'
import { BiPlus } from '@react-icons/all-files/bi/BiPlus'
import { RiArticleLine } from '@react-icons/all-files/ri/RiArticleLine'
import { RiFile3Line } from '@react-icons/all-files/ri/RiFile3Line'
import { RiMistFill } from '@react-icons/all-files/ri/RiMistFill'
import { ComponentVisibility } from "@slate/components/ComponentVisibility"
import { CreateModuleMutationVariables } from '@slate/generated/graphql'
import { useCreateModule } from '@slate/graphql/schemas/modules/hooks'
import { useCurrentUnit } from '@slate/hooks/useCurrentUnit'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { FormErrors } from '@slate/types/FormErrors'
import { UnitModuleTypes } from '@slate/types/UnitModules'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from 'chalkui/dist/cjs/Components/Dropdown/Dropdown'
import { FormControl, FormLabel } from 'chalkui/dist/cjs/Components/FormControl'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox'
import { Input } from 'chalkui/dist/cjs/Components/Input'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from 'chalkui/dist/cjs/Components/Modal'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import React, { useEffect, useState } from 'react'


export function UnitModuleCreation() {
   
   const [moduleType, setModuleType] = useState<UnitModuleTypes>()
   
   const t = useTypeSafeTranslation()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const cache = useStoreCache()
   const unit = useCurrentUnit()
   
   const [createModule, isLoading] = useCreateModule({
      onCompleted: () => {
         fields.reset()
         onClose()
      },
   })
   
   const { onFormSubmit, fields, formState } = useFormCreator({
      schema: ({ z }) => z.object({
         content: z.string().nonempty(FormErrors.RequiredField),
      }),
      onSubmit: data => {
         
         let insert_data: CreateModuleMutationVariables = {
            unit_id: unit.id,
            type: moduleType as string,
            order: cache.read('modules')?.length ?? 0,
            content: JSON.stringify({}),
         }
         
         switch (moduleType) {
            case UnitModuleTypes.TextHeader:
               insert_data['content'] = data.content
               break
         }
         
         createModule(insert_data)
         
      },
   })
   
   useEffect(() => {
      console.log(moduleType)
   }, [moduleType])
   
   function handleOpenCreationModal(type: UnitModuleTypes) {
      setModuleType(type)
      onOpen()
   }
   
   return (
      <ComponentVisibility.AssistantAndHigher>
         
         <Box>
            
            <Dropdown>
               <DropdownButton
                  as={Button}
                  borderRadius="3xl"
                  colorScheme="primary"
                  leftIcon={<BiPlus />}
               >
                  {t('Add')}
               </DropdownButton>
               <DropdownList>
                  <DropdownItem onClick={() => handleOpenCreationModal(UnitModuleTypes.Document)} icon={<RiArticleLine />}>
                     {t('Document')}
                  </DropdownItem>
                  <DropdownItem onClick={() => handleOpenCreationModal(UnitModuleTypes.TextHeader)} icon={<BiHeading />}>
                     {t('Text header')}
                  </DropdownItem>
                  <DropdownItem onClick={() => handleOpenCreationModal(UnitModuleTypes.File)} icon={<RiFile3Line />}>
                     {t('File')}
                  </DropdownItem>
                  <DropdownItem onClick={() => handleOpenCreationModal(UnitModuleTypes.Link)} icon={<BiLink />}>
                     {t('Link')}
                  </DropdownItem>
                  <DropdownItem onClick={() => handleOpenCreationModal(UnitModuleTypes.Message)} icon={<RiMistFill />}>
                     {t('Message')}
                  </DropdownItem>
                  <DropdownItem onClick={() => handleOpenCreationModal(UnitModuleTypes.QuizLinks)} icon={<BiEditAlt />}>
                     {t('Quiz')}
                  </DropdownItem>
                  <DropdownItem onClick={() => handleOpenCreationModal(UnitModuleTypes.AssignmentLinks)} icon={<BiEraser />}>
                     {t('Assignment')}
                  </DropdownItem>
               </DropdownList>
            </Dropdown>
         
         </Box>
         
         <Modal size="2xl" isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            
            <form onSubmit={onFormSubmit}>
               <ModalContent>
                  <ModalCloseButton />
                  <IconBox isCircular icon={<BiAddToQueue />} colorScheme="primary" margin="0 auto" mt={3} />
                  <ModalHeader textAlign="center">{t(`course:options.Add a ${moduleType}`)}</ModalHeader>
                  <ModalBody>
                     
                     {
                        moduleType === UnitModuleTypes.TextHeader && (
                           <>
                              <FormControl mb={3} id="title" isRequired={true}>
                                 <FormLabel>{t('form:Title')}</FormLabel>
                                 <Input {...fields.register('content', { placeholder: '', required: true })} />
                                 {fields.errorMessage('content')}
                              </FormControl>
                           </>
                        )
                     }
                  
                  </ModalBody>
                  
                  <ModalFooter gridGap={5}>
                     <Button
                        colorScheme="brand.100"
                        width="100%"
                        type="submit"
                        isLoading={isLoading}
                     >
                        {t('Save')}
                     </Button>
                     
                     <Button isDisabled={isLoading} colorScheme="brand.800" onClick={onClose} isFullWidth>
                        {t('Cancel')}
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </form>
         </Modal>
      
      
      </ComponentVisibility.AssistantAndHigher>
   )
}
