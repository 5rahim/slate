import { BiDotsVerticalRounded } from '@react-icons/all-files/bi/BiDotsVerticalRounded'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { EntityDrawer } from '@slate/components/UI/Course/EntityDrawer'
import { Units, UpdateUnitDetailsMutationVariables } from '@slate/generated/graphql'
import { useMutateUnitDetails } from '@slate/graphql/schemas/units/hooks'
import { usePublishDateSetting } from '@slate/hooks/settings/usePublishDateSetting'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { FormControl, FormLabel } from 'chalkui/dist/cjs/Components/FormControl'
import { Icon } from 'chalkui/dist/cjs/Components/Icon'
import { Input } from 'chalkui/dist/cjs/Components/Input'
import { Box, Divider, Flex } from 'chalkui/dist/cjs/Components/Layout'
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
   
   
   const [updateUnit, mutationLoading] = useMutateUnitDetails({
      onCompleted: () => {
      },
   })
   
   const { publishDateValues, publishDateFields, publishDateHelpers } = usePublishDateSetting({
      defaultValue: {
         status: data.status,
         available_from: data.available_from
      }
   })

   const { onFormSubmit, fields, formState } = useFormCreator({
      defaultValues: {
         title: data.title,
         type: data.type,
         number: data.number,
      },
      schema: ({ z }) => z.object({
         title: z.string().nullable(),
         number: z.string().min(1, FormErrors.RequiredField),
         type: z.string().nonempty(FormErrors.RequiredField),
      }),
      onSubmit: formData => {
         
         const update_data: UpdateUnitDetailsMutationVariables = {
            id: data.id,
            title: formData.title,
            ...publishDateValues,
            type: formData.type,
            number: formData.number,
         }
         
         if(publishDateFields.isValid()) {
            updateUnit(update_data)
         }
         
      },
   })
   
   const unitTitle = fields.watch('type') !== 'folder' && t(fields.watch('type')).charAt(0).toUpperCase() + t(fields.watch('type')).slice(1) + ' ' +
     !!fields.watch('number') && fields.watch('number') + fields.watch('title') && `: ${fields.watch('title')}`
   
   return (
      <ComponentVisibility.AssistantAndHigher>
         
         <EntityDrawer
            isOpen={isOpen}
            isLoading={mutationLoading}
            onClose={onClose}
            onFormSubmit={onFormSubmit}
            title="Edit the unit"
            settings={
               <>{publishDateFields.render()}</>
            }
         >
   
   
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
            
            <Divider my="4" />
            
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
            {fields.watch('type') !== 'folder' && <FormControl mb={3} id="title">
                <FormLabel>{t('form:Title')}</FormLabel>
                <Input {...fields.register('title', { placeholder: 'ex: Jan 2-8', required: false })} />
               {fields.errorMessage('title')}
            </FormControl>}
            
            
            
         </EntityDrawer>
      
      </ComponentVisibility.AssistantAndHigher>
   )
   
}

export default UnitEdit
