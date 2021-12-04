import { ComponentVisibility } from "@slate/components/ComponentVisibility"
import { DateInput } from '@slate/components/DateInput'
import { TimePicker } from '@slate/components/TimePicker'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { CreateUnitMutationVariables } from '@slate/generated/graphql'
import { useCreateUnit } from '@slate/graphql/schemas/units/hooks'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useCurrentUser } from '@slate/hooks/useCurrentUser'
import { useDateAndTimeFields } from '@slate/hooks/useDateAndTimeFields'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useGlobalCache } from '@slate/hooks/useGlobalCache'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { Utils } from '@slate/utils'
import { Text } from 'chalkui/dist/cjs'
import { Box, Divider } from 'chalkui/dist/cjs/Components/Layout'
import {
   Button, Checkbox, Flex, FormControl, FormLabel, Icon, IconBox, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
   ModalOverlay, Select, useDisclosure,
} from 'chalkui/dist/cjs/React'
import React from 'react'
import { BiCalendarAlt, BiCheckCircle, BiDotsVertical, BiDotsVerticalRounded, BiFolderPlus, BiHide } from 'react-icons/bi'


export function UnitCreation() {
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const user = useCurrentUser()
   const course = useCurrentCourse()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const cache = useGlobalCache()
   const [createUnit, mutationLoading] = useCreateUnit({
      onCompleted: () => {
         fields.reset()
         resetDateAndTimeFields()
         onClose()
      },
   })
   
   const { value: publishOn, setDateField, setTimeField, resetDateAndTimeFields } = useDateAndTimeFields()
   
   const { onFormSubmit, fields, formState } = useFormCreator({
      schema: ({ z }) => z.object({
         title: z.string().nullable(),
         available: z.boolean(),
         publish_later: z.boolean(),
         number: z.string().min(1, FormErrors.RequiredField),
         type: z.string().nonempty(FormErrors.RequiredField),
      }),
      onSubmit: data => {
         
         const insert_data: CreateUnitMutationVariables = {
            title: data.title,
            available: data.available,
            is_scheduled: !data.available ? data.publish_later : false,
            publish_on: ( !data.available && data.publish_later ) ? publishOn : new Date(),
            course_id: course.id,
            type: data.type,
            order: cache.readUnits(null)?.length ?? 0,
            number: data.number,
         }
         
         if (data.publish_later && !data.available && !publishOn)
            fields.setError('date', FormErrors.RequiredField)
         else createUnit(insert_data)
         
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
                        
                        <ComponentVisibility.InstructorOnly>
                           <Flex
                              bgColor={cmf('#dfdfdf', 'gray.400')}
                              color={cmf("#979797", 'gray.200')}
                              height="100%"
                              width="1.4rem"
                              justify="center"
                              align="center"
                           >
                              <Icon as={BiDotsVertical} fontSize="1.6rem" />
                           </Flex>
                        </ComponentVisibility.InstructorOnly>
                        
                        <Flex px="4" width="100%" justifyContent="space-between" alignItems="center">
                           
                           <Flex cursor="pointer" _hover={{ color: 'brand.400' }}>
                              <Text
                                 fontWeight="bold"
                                 fontSize="lg"
                              >{t(fields.watch('type')).charAt(0).toUpperCase() + t(fields.watch('type')).slice(1)}
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
                     
                     
                     {/*Available*/}
                     <FormControl display="flex" alignItems="center" mb={3} id="available">
                        <Checkbox
                           size="lg"
                           id="available"
                           defaultChecked={true} {...fields.register("available")}>{t('form:Available to students')}</Checkbox>
                     </FormControl>
                     
                     
                     <Box display={fields.watch('available') === false ? 'block' : 'none'}>
                        {/*Publish later*/}
                        <FormControl display="flex" alignItems="center" mb={3} id="publish_later">
                           <Checkbox
                              ml="8"
                              size="lg"
                              id="puslish_later"
                              defaultChecked={false} {...fields.register("publish_later")}>{t('form:Publish at a later date')}</Checkbox>
                        </FormControl>
                        
                        <Box display={fields.watch('publish_later', true) === true ? 'block' : 'none'}>
                           
                           <Divider mb="3" />
                           
                           <Text mb="2">{t('form:Publish when')}</Text>
                           
                           <AlignedFlex mb="2">
                              {t('form:Date')}:
                              <DateInput onChange={setDateField} />
                           </AlignedFlex>
                           {fields.errorMessage('date')}
                           
                           <AlignedFlex>
                              {t('form:Time')}:
                              <TimePicker defaultTime={1439} onChange={setTimeField} />
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
                     
                     <Button colorScheme="brand.800" onClick={onClose} isFullWidth isDisabled={mutationLoading}>
                        {t('Cancel')}
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </form>
         </Modal>
      
      
      </ComponentVisibility.AssistantAndHigher>
   )
}
