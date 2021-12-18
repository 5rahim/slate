import { BiCalendarAlt } from '@react-icons/all-files/bi/BiCalendarAlt'
import { BiCheckCircle } from '@react-icons/all-files/bi/BiCheckCircle'
import { BiHide } from '@react-icons/all-files/bi/BiHide'
import { DateInput } from '@slate/components/DateInput'
import { TimePicker } from '@slate/components/TimePicker'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { SettingSection } from '@slate/components/UI/Course/SettingSection'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useDateAndTimeFields } from '@slate/hooks/useDateAndTimeFields'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { Parameter } from '@slate/types/Parameters'
import { Utils } from '@slate/utils'
import { Checkbox } from 'chalkui/dist/cjs/Components/Checkbox'
import { FormControl } from 'chalkui/dist/cjs/Components/FormControl'
import { Icon } from 'chalkui/dist/cjs/Components/Icon/Icon'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Tooltip } from 'chalkui/dist/cjs/Components/Tooltip'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React, { useState } from 'react'

interface UseAssignDatesProps {
   defaultValue: {
      status: Parameter<string>, // scheduled, available, not_available
      available_from: Parameter<string>, // utc data
   }
}

export const usePublishDateSetting = (props?: UseAssignDatesProps) => {
   
   const { defaultValue } = props ? props : { defaultValue: { status: 'not_available', available_from: null } }
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const {formatDate} = useDateFormatter()
   
   const {
      value: availableFrom,
      resetDateAndTimeFields,
      isTouched: isDateTimeTouched,
      dateFieldProps,
      timeFieldProps,
   } = useDateAndTimeFields(defaultValue.available_from)
   
   const [available, setAvailable] = useState<boolean>(defaultValue.status === 'available')
   const [scheduled, setScheduled] = useState<boolean>(defaultValue.status === 'scheduled')
   const [error, setError] = useState<boolean>(false)
   
   const publicationDateHasPassed = Utils.Dates.publicationDateHasPassed(defaultValue.available_from)
   
   const isVisible = available || (!available && scheduled && publicationDateHasPassed)
   
   
   return {
      
      publishDateValues: {
         status: available ? 'available' : (scheduled ? 'scheduled' : 'not_available'),
         available_from: (!available && scheduled) ? availableFrom : null
      },
      
      isTouched: ( !available && isDateTimeTouched ) || available,
      
      publishDateFields: {
         
         reset: resetDateAndTimeFields,
   
         isValid: () => {
            if (( scheduled && isDateTimeTouched ) || ( available ) || ( !available && !scheduled )) {
               setError(false)
               return true
            } else {
               setError(true)
               return false
            }
         },
   
         render: () => {
            return (
               <>
                  <SettingSection
                     icon={isVisible ? BiCheckCircle : BiHide}
                     title={t('course:Availability')}
                     summary={isVisible ? t('form:Visible to students') : ( scheduled ? t('form:Scheduled') : t('form:Not available') )}
                  >
               
                     <FormControl display="flex" alignItems="center" mb={2} id="available">
                        <Checkbox
                           size="lg"
                           id="available"
                           defaultIsChecked={available}
                           onChange={(e) => setAvailable(e.target.checked)}
                        >
                           {t('form:Available to students')}
                        </Checkbox>
                     </FormControl>
               
               
                     <Box display={!available ? 'block' : 'none'}>
                        {/*Publish later*/}
                        <FormControl display="flex" alignItems="center" mb={3} id="scheduled">
                           <Checkbox
                              size="lg"
                              id="puslish_later"
                              defaultIsChecked={scheduled}
                              onChange={(e) => setScheduled(e.target.checked)}
                           >{t('form:Available at a later date')}</Checkbox>
                        </FormControl>
                  
                        <Box display={scheduled ? 'block' : 'none'}>
                     
                           <Box border="1px solid" p="2" borderRadius="md" borderColor={cmf("#ddd", 'gray.500')}>
                        
                              <Text fontWeight="bold" mb="1">{t('form:Available when')}</Text>
                        
                              <AlignedFlex>
                                 <AlignedFlex width="100%">
                                    <DateInput {...dateFieldProps} defaultSelectedDate={Utils.Dates.parseDurationDateObject(defaultValue.available_from) ?? null} />
                                 </AlignedFlex>
                           
                                 <AlignedFlex>
                                    <TimePicker {...timeFieldProps} />
                                 </AlignedFlex>
                              </AlignedFlex>
                           </Box>
                  
                        </Box>
                     </Box>
               
                     {error && (
                        <Text
                           color={cmf("red.500", "red.300")}
                           fontStyle="italic"
                           mt="1"
                           mb="2"
                        >
                           {t('form:' + FormErrors.RequiredField)}
                        </Text>
                     )}
                  </SettingSection>
               </>
            )
         },
         
      },
   
      publishDateHelpers: {
         isAvailable: ({ status, availableFrom }: { status: any, availableFrom: Parameter<string> }) => {
            return (status === 'available' || (status !== 'available' && status === 'scheduled' && Utils.Dates.publicationDateHasPassed(availableFrom)))
         },
         icons: ({ status, availableFrom }: { status: any, availableFrom: Parameter<string> }) => {
            return (
               <>
                  {( status === 'available' || ( status === 'scheduled' && Utils.Dates.publicationDateHasPassed(availableFrom) ) )
                  && <Icon as={BiCheckCircle} color="green.500" fontSize="2xl" />}
               
                  {( status === 'scheduled' && !Utils.Dates.publicationDateHasPassed(availableFrom) )
                  && (
                     <Tooltip placement="auto-end" label={`${t('Accessible on')} ${formatDate(availableFrom, 'short with hours')}`}>
                        <Box mr="2"><Icon as={BiCalendarAlt} fontSize="2xl" /></Box>
                     </Tooltip>
                  )}
               
                  {( status === 'not_available' || (status === 'scheduled' && !Utils.Dates.publicationDateHasPassed(availableFrom)) ) && (
                     <Icon as={BiHide} fontSize="2xl" />
                  )}
               </>
            )
         }
      },
      
   }
}
