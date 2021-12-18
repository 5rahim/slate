import { BiDotsVerticalRounded } from '@react-icons/all-files/bi/BiDotsVerticalRounded'
import { BiFolderPlus } from '@react-icons/all-files/bi/BiFolderPlus'
import { ComponentVisibility } from "@slate/components/ComponentVisibility"
import { SettingList } from '@slate/components/UI/Course/SettingList'
import { CreateUnitMutationVariables, Units } from '@slate/generated/graphql'
import { useCreateUnit } from '@slate/graphql/schemas/units/hooks'
import { usePublishDateSetting } from '@slate/hooks/settings/usePublishDateSetting'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useCurrentUser } from '@slate/hooks/useCurrentUser'
import { useDateAndTimeFields } from '@slate/hooks/useDateAndTimeFields'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { FormErrors } from '@slate/types/FormErrors'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { FormControl, FormLabel } from 'chalkui/dist/cjs/Components/FormControl'
import { Icon } from 'chalkui/dist/cjs/Components/Icon'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox'
import { Input } from 'chalkui/dist/cjs/Components/Input'
import { Box, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from 'chalkui/dist/cjs/Components/Modal'
import { Select } from 'chalkui/dist/cjs/Components/Select'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React from 'react'


export function UnitCreation({ isOpen, onClose }: any) {
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const user = useCurrentUser()
   const course = useCurrentCourse()
   const cache = useStoreCache()
   const [createUnit, mutationLoading] = useCreateUnit({
      onCompleted: () => {
         fields.reset()
         resetDateAndTimeFields()
         onClose()
      },
   })
   
   const { value: publishOn, setDateField, setTimeField, resetDateAndTimeFields } = useDateAndTimeFields()
   const { publishDateValues, publishDateFields, publishDateHelpers } = usePublishDateSetting()
   
   const { onFormSubmit, fields, formState } = useFormCreator({
      schema: ({ z }) => z.object({
         title: z.string().nullable(),
         number: z.string().min(1, FormErrors.RequiredField),
         type: z.string().nonempty(FormErrors.RequiredField),
      }),
      onSubmit: data => {
         
         const insert_data: CreateUnitMutationVariables = {
            title: data.title,
            ...publishDateValues,
            course_id: course.id,
            type: data.type,
            order: cache.read<Units[] | null>('units')?.length ?? 0,
            number: data.number,
         }
         
         if(publishDateFields.isValid()) createUnit(insert_data)
         
      },
   })
   
   return (
      <ComponentVisibility.InstructorOnly>
         
         <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            
            <form onSubmit={onFormSubmit}>
               <ModalContent>
                  <ModalCloseButton />
                  <IconBox isCircular icon={<BiFolderPlus />} colorScheme="primary" margin="0 auto" mt={3} />
                  <ModalHeader textAlign="center">{t('course:options.Add a unit')}</ModalHeader>
                  <ModalBody>
                     
                     <Text fontSize="xl" mb="2">{t('Preview')}:</Text>
                     
                     {/*Preview*/}
                     <Flex
                        borderRadius="lg"
                        height="3.5rem"
                        alignItems="center"
                        bgColor={cmf('#f0f0f0', 'gray.500')}
                        mb="2"
                        overflow="hidden"
                     >
                        
                        <Flex px="4" width="100%" justifyContent="space-between" alignItems="center">
                           
                           <Flex cursor="pointer" _hover={{ color: 'brand.400' }}>
                              <Text
                                 fontWeight="bold"
                                 fontSize="lg"
                              >{fields.watch('type') !== 'folder' && t(fields.watch('type')).charAt(0).toUpperCase() + t(fields.watch('type')).slice(1)}
                                 &nbsp;{!!fields.watch('number') && fields.watch('number')}</Text>
                              {fields.watch('title') && <Text fontWeight="bold" fontSize="lg">: {fields.watch('title')}</Text>}
                           </Flex>
                           
                           <ComponentVisibility.AssistantAndHigher>
                              <Flex alignItems="center">
                                 
                                 {publishDateHelpers.icons({ status: publishDateValues.status, availableFrom: 'N/A' })}
                                 
                                 <Box
                                    fontSize="1.6rem"
                                 >
                                    <Icon as={BiDotsVerticalRounded} />
                                 </Box>
                              
                              </Flex>
                           </ComponentVisibility.AssistantAndHigher>
                        
                        </Flex>
                     </Flex>
                     {/*Preview end*/}
                     
                     
                     <Flex gridGap="2">
                        {/*Type*/}
                        <FormControl mb={3} isRequired>
                           <FormLabel>{t('form:Type')}</FormLabel>
                           <Select defaultValue="week" {...fields.register('type', { placeholder: 'Select a type' })}>
                              <option value="week">{t('form:Week')}</option>
                              <option value="unit">{t('form:Unit')}</option>
                              <option value="chapter">{t('form:Chapter')}</option>
                              <option value="folder">{t('form:Folder')}</option>
                           </Select>
                           {fields.errorMessage('type')}
                        </FormControl>
                        
                        {/*Number*/}
                        <FormControl mb={3} id="number" isRequired>
                           <FormLabel>{fields.watch('type') === 'folder' ? t('form:Title') : t('form:Number')}</FormLabel>
                           <Input {...fields.register('number', { placeholder: fields.watch('type') === 'folder' ? 'Title': 'Number' })} />
                           {fields.errorMessage('number')}
                        </FormControl>
                     
                     </Flex>
                     
                     {/*Title*/}
                     { fields.watch('type') !== 'folder' && <FormControl mb={3} id="title">
                        <FormLabel>{t('form:Title')}</FormLabel>
                        <Input {...fields.register('title', { placeholder: 'ex: Jan 2-8', required: false })} />
                        {fields.errorMessage('title')}
                     </FormControl>}
                     
                     
                     <SettingList>
                        {publishDateFields.render()}
                     </SettingList>
                  
                  </ModalBody>
                  
                  <ModalFooter gridGap={5}>
                     <Button
                        colorScheme="brand.100"
                        width="100%"
                        type="submit"
                        isDisabled={mutationLoading}
                     >
                        {t('Save')}
                     </Button>
                     
                     <Button colorScheme="brand.800" onClick={onClose} isFullWidth isDisabled={mutationLoading}>
                        {t('Cancel')}
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </form>
         </Modal>
      
      
      </ComponentVisibility.InstructorOnly>
   )
}

export default UnitCreation
