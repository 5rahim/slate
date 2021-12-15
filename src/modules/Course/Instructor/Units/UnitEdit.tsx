import { BiCalendarAlt } from '@react-icons/all-files/bi/BiCalendarAlt'
import { BiCheckCircle } from '@react-icons/all-files/bi/BiCheckCircle'
import { BiDotsVerticalRounded } from '@react-icons/all-files/bi/BiDotsVerticalRounded'
import { BiFolder } from '@react-icons/all-files/bi/BiFolder'
import { BiHide } from '@react-icons/all-files/bi/BiHide'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { DateInput } from '@slate/components/DateInput'
import { TimePicker } from '@slate/components/TimePicker'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { Units, UpdateUnitDetailsMutationVariables } from '@slate/generated/graphql'
import { useMutateUnitDetails } from '@slate/graphql/schemas/units/hooks'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useDateAndTimeFields } from '@slate/hooks/useDateAndTimeFields'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { Utils } from '@slate/utils'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { Checkbox } from 'chalkui/dist/cjs/Components/Checkbox'
import { FormControl, FormLabel } from 'chalkui/dist/cjs/Components/FormControl'
import { Icon } from 'chalkui/dist/cjs/Components/Icon'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox'
import { Input } from 'chalkui/dist/cjs/Components/Input'
import { Box, Divider, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from 'chalkui/dist/cjs/Components/Modal/Modal'
import { Select } from 'chalkui/dist/cjs/Components/Select/Select'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React from 'react'

interface UnitEditProps {
   isOpen: boolean
   onClose: any
   data: Units
}

export const UnitEdit = (
   {
      isOpen,
      onClose,
      data,
   }: UnitEditProps) => {
   
   const t = useTypeSafeTranslation()
   const cmf = useCMF()
   
   const { value: publishOn, setDateField, setTimeField, resetDateAndTimeFields } = useDateAndTimeFields(data.publish_on)
   
   const [updateUnit, mutationLoading] = useMutateUnitDetails({
      onCompleted: () => {
      },
   })

   const { onFormSubmit, fields, formState } = useFormCreator({
      defaultValues: {
         title: data.title,
         available: data.available,
         publish_later: !data.available ? data.is_scheduled : false,
         type: data.type,
         number: data.number,
      },
      schema: ({ z }) => z.object({
         title: z.string().nullable(),
         available: z.boolean(),
         publish_later: z.boolean(),
         number: z.string().min(1, FormErrors.RequiredField),
         type: z.string().nonempty(FormErrors.RequiredField),
      }),
      onSubmit: formData => {
         
         const update_data: UpdateUnitDetailsMutationVariables = {
            id: data.id,
            title: formData.title,
            available: formData.available,
            is_scheduled: !formData.available ? formData.publish_later : false,
            publish_on: ( !formData.available && formData.publish_later ) ? publishOn : new Date(),
            type: formData.type,
            number: formData.number,
         }
         
         if (formData.publish_later && !formData.available && !publishOn)
            fields.setError('date', FormErrors.RequiredField)
         else updateUnit(update_data)
         
      },
   })
   
   return (
      <ComponentVisibility.AssistantAndHigher>
         <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            
            <form onSubmit={onFormSubmit}>
               <ModalContent>
                  <ModalCloseButton />
                  <IconBox isCircular icon={<BiFolder />} colorScheme="primary" margin="0 auto" mt={3} />
                  <ModalHeader textAlign="center">{t('course:options.Edit the unit')}</ModalHeader>
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
                                 
                                 {( fields.watch('publish_later') && !fields.watch('available') ) &&
                                 <Icon as={BiCalendarAlt} fontSize="2xl" mr="2" />}
                                 
                                 <Box mr="2">
                                    {
                                       fields.watch('available') || ( fields.watch('is_scheduled') && Utils.Dates.publicationDateHasPassed(fields.watch('publish_on')) )
                                          ? <Icon as={BiCheckCircle} color="green.500" fontSize="2xl" />
                                          :
                                          <Icon as={BiHide} fontSize="2xl" />
                                    }
                                 </Box>
                                 
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
                           <Input {...fields.register('number', { placeholder: 'Number' })} />
                           {fields.errorMessage('number')}
                        </FormControl>
                     
                     </Flex>
                     
                     {/*Title*/}
                     { fields.watch('type') !== 'folder' && <FormControl mb={3} id="title">
                         <FormLabel>{t('form:Title')}</FormLabel>
                         <Input {...fields.register('title', { placeholder: 'ex: Jan 2-8', required: false })} />
                        {fields.errorMessage('title')}
                     </FormControl>}
                     
                     
                     {/*Available*/}
                     <FormControl display="flex" alignItems="center" mb={3} id="available">
                        <Checkbox
                           size="lg"
                           id="available"
                           {...fields.register("available")}>{t('form:Available to students')}</Checkbox>
                     </FormControl>
                     
                     
                     <Box display={fields.watch('available') === false ? 'block' : 'none'}>
                        {/*Publish later*/}
                        <FormControl display="flex" alignItems="center" mb={3} id="publish_later">
                           <Checkbox
                              ml="8"
                              size="lg"
                              id="puslish_later"
                              {...fields.register("publish_later")}>{t('form:Publish at a later date')}</Checkbox>
                        </FormControl>
                        
                        <Box display={fields.watch('publish_later') === true ? 'block' : 'none'}>
                           
                           <Divider mb="3" />
                           
                           <Text mb="2">{t('form:Publish when')}</Text>
                           
                           <AlignedFlex mb="2">
                              {t('form:Date')}:
                              <DateInput defaultSelectedDate={Utils.Dates.parseDurationDateObject(data.publish_on)} onChange={setDateField} />
                           </AlignedFlex>
                           {fields.errorMessage('date')}
                           
                           <AlignedFlex>
                              {t('form:Time')}:
                              <TimePicker defaultTime={Utils.Dates.getTimeInMinutesFromDate(data.publish_on) ?? 1439} onChange={setTimeField} />
                           </AlignedFlex>
                        </Box>
                     
                     </Box>
                  
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
                     
                     <Button variant="outline" colorScheme="brand.800" onClick={onClose} isFullWidth isDisabled={mutationLoading}>
                        {t('Cancel')}
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </form>
         </Modal>
      
      
      </ComponentVisibility.AssistantAndHigher>
   )
   
}
