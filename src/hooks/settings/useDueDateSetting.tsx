import { BiCalendar } from '@react-icons/all-files/bi/BiCalendar'
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
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React, { useEffect, useState } from 'react'


/**
 * Fields: available_until
 */
export const useDueDateSetting = (defaultValue?: Parameter<string>) => {
   
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const {formatDate} = useDateFormatter()
   
   const {
      value: availableUntil,
      resetDateAndTimeFields,
      isTouched: isDateTimeTouched,
      dateFieldProps,
      timeFieldProps,
   } = useDateAndTimeFields(defaultValue)
   
   const [assign, setAssign] = useState<boolean>(!!defaultValue)
   const [error, setError] = useState<boolean>(false)
   
   const dateHasPassed = Utils.Dates.dateHasPassed(defaultValue)
   
   const [selectedDate, setSelectedDate] = useState<string | null>(null)
   
   useEffect(() => {
      try {
         setSelectedDate(s => {
            try {
               return !!availableUntil ? availableUntil.toISOString().replace('Z', '') : null
            } catch {
               return s
            }
         })
      } catch (e) {
      
      }
   }, [availableUntil])
   
   
   return {
      
      dueDateValues: {
         available_until: availableUntil ?? null
      },
      
      isTouched: ( assign && isDateTimeTouched ) || !assign,
      
      dueDateFields: {
         
         reset: resetDateAndTimeFields,
   
         isValid: () => {
            if (( assign && isDateTimeTouched ) || ( !assign )) {
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
                     icon={BiCalendar}
                     title={t('course:Due date')}
                     summary={assign ? formatDate(availableUntil, 'short with hours') : ( t('form:No due date') )}
                     settingEdit={
                        <>
                           <FormControl display="flex" alignItems="center" mb={2} id="available">
                              <Checkbox
                                 size="lg"
                                 id="available"
                                 defaultIsChecked={assign}
                                 onChange={(e) => setAssign(e.target.checked)}
                              >
                                 {t('form:Set a due date')}
                              </Checkbox>
                           </FormControl>
   
   
                           <Box display={assign ? 'block' : 'none'}>
      
                              <Box border="1px solid" p="2" borderRadius="md" borderColor={cmf("#ddd", 'gray.500')}>
         
                                 <Text fontWeight="bold" mb="1">{t('form:Available until')}</Text>
         
                                 <Box>
                                    <AlignedFlex mb="2" width="100%">
                                       <DateInput {...dateFieldProps} defaultSelectedDate={Utils.Dates.parseDurationDateObject(selectedDate ?? defaultValue) ?? null} />
                                    </AlignedFlex>
   
                                    <AlignedFlex>
                                       <TimePicker {...timeFieldProps} defaultTime={Utils.Dates.getTimeInMinutesFromDate(selectedDate ?? defaultValue) ?? 1439} />
                                    </AlignedFlex>
                                 </Box>
                              </Box>
   
                           </Box>
                        </>
                     }
                  >
               
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
   
      dueDateHelpers: {
      
      },
      
   }
}
