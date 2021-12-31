import { BiUserCheck } from '@react-icons/all-files/bi/BiUserCheck'
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
 * Fields: assign_to
 */
export const useAssignToSetting = (defaultValue?: Parameter<number[]>) => {
   
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   
   const { studentPickerProps } = useStudentPicker('[]')
   
   const [error, setError] = useState<boolean>(false)
   const [assignTo, setAssignTo] = useState<number[] | null>(defaultValue ?? null)
   const [selectedNames, setSelectedNames] = useState<string>('')
   
   const summary = (!assignTo || assignTo === []) ? t('Nobody') : selectedNames

   
   return {
      
      assignToValues: {
         assign_to: assignTo === [] ? null : assignTo,
      },
      
      assignToFields: {
         
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
                     icon={BiUserCheck}
                     title={t('course: Assign to')}
                     summary={summary}
                     settingEdit={
                        <Box mt="2">
                           
                           <StudentPicker
                              {...studentPickerProps}
                              defaultValue={assignTo ? assignTo : []}
                              onSelected={(v) => setAssignTo(v)}
                              onSelectedStudentNames={setSelectedNames}
                              isAssignTo
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
      
      assignToHelpers: {},
      
   }
}
