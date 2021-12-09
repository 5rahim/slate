import { BiFolderPlus } from '@react-icons/all-files/bi/BiFolderPlus'
import { ComponentVisibility } from "@slate/components/ComponentVisibility"
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useCurrentUser } from '@slate/hooks/useCurrentUser'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { FormControl, FormLabel } from 'chalkui/dist/cjs/Components/FormControl'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox'
import { Input } from 'chalkui/dist/cjs/Components/Input'
import { Box, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from 'chalkui/dist/cjs/Components/Modal'
import { Select } from 'chalkui/dist/cjs/Components/Select'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import React from 'react'


export function ModuleCreation() {
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const user = useCurrentUser()
   const course = useCurrentCourse()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const cache = useStoreCache()
   
   const { onFormSubmit, fields, formState } = useFormCreator({
      schema: ({ z }) => z.object({

      }),
      onSubmit: data => {
      
      
      
      },
   })
   
   return (
      <ComponentVisibility.AssistantAndHigher>
         
         <Box>
            
            <Button
               borderRadius="2rem"
               colorScheme="brand.100"
               size="md"
               onClick={onOpen}
            >
               {t('Create')}
            </Button>
         
         </Box>
         
         <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            
            <form onSubmit={onFormSubmit}>
               <ModalContent>
                  <ModalCloseButton />
                  <IconBox isCircular icon={<BiFolderPlus />} colorScheme="primary" margin="0 auto" mt={3} />
                  <ModalHeader textAlign="center">{t('course:options.Add a unit')}</ModalHeader>
                  <ModalBody>
                     
                     
                     <Flex gridGap="2">
                        {/*Type*/}
                        <FormControl mb={3} isRequired>
                           <FormLabel>{t('form:Type')}</FormLabel>
                           <Select defaultValue="week" {...fields.register('type', { placeholder: 'Select a type' })}>
                              <option value="week">{t('form:Week')}</option>
                              <option value="unit">{t('form:Unit')}</option>
                              <option value="chapter">{t('form:Chapter')}</option>
                           </Select>
                           {fields.errorMessage('type')}
                        </FormControl>
                        
                        {/*Number*/}
                        <FormControl mb={3} id="number" isRequired>
                           <FormLabel>{t('form:Number')}</FormLabel>
                           <Input {...fields.register('number', { placeholder: 'Number' })} />
                           {fields.errorMessage('number')}
                        </FormControl>
                     
                     </Flex>
                     
                     {/*Title*/}
                     <FormControl mb={3} id="title">
                        <FormLabel>{t('form:Title')}</FormLabel>
                        <Input {...fields.register('title', { placeholder: 'ex: Jan 2-8', required: false })} />
                        {fields.errorMessage('title')}
                     </FormControl>
                     
                  
                  </ModalBody>
                  
                  <ModalFooter gridGap={5}>
                     <Button
                        colorScheme="brand.100"
                        width="100%"
                        type="submit"
                     >
                        {t('Save')}
                     </Button>
                     
                     <Button colorScheme="brand.800" onClick={onClose} isFullWidth>
                        {t('Cancel')}
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </form>
         </Modal>
      
      
      </ComponentVisibility.AssistantAndHigher>
   )
}
