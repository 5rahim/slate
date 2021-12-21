import { BiLike } from '@react-icons/all-files/bi/BiLike'
import { StudentPicker } from '@slate/components/StudentPicker'
import { useStudentPicker } from '@slate/components/StudentPicker/useStudentPicker'
import { SettingSection } from '@slate/components/UI/Course/SettingSection'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { Parameter } from '@slate/types/Parameters'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React, { useState } from 'react'

/*
 * Fields: accommodations
 */
export const useAccommodationSetting = (defaultValue?: Parameter<string>) => {
   
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   
   const { studentPickerProps } = useStudentPicker(defaultValue ?? '[]')
   
   const [error, setError] = useState<boolean>(false)
   const [accommodations, setAccommodations] = useState<string | null>(defaultValue ?? null)
   const [selectedNames, setSelectedNames] = useState<string>('')
   
   const summary = (!accommodations || accommodations === '[]') ? t('No accommodations') : selectedNames

   
   return {
      
      accommodationValues: {
         accommodations: accommodations === '[]' ? null : accommodations,
      },
      
      accommodationFields: {
         
         isValid: () => {
            if (true) {
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
                     icon={BiLike}
                     title={t('Accommodations')}
                     summary={summary}
                     settingEdit={
                        <Box mt="2">
                           
                           <Text mb="2">{t('course:Accommodation help')}</Text>
                           
                           <StudentPicker
                              {...studentPickerProps}
                              defaultValue={accommodations ? JSON.parse(accommodations) : []}
                              onSelected={(v) => setAccommodations(JSON.stringify(v))}
                              onSelectedStudentNames={setSelectedNames}
                           />
                        
                        </Box>
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
      
      accommodationHelpers: {},
      
   }
}
