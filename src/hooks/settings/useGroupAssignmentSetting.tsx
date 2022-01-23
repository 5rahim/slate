import { BiGroup } from '@react-icons/all-files/bi/BiGroup'
import { SettingSection } from '@slate/components/UI/Course/SettingSection'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { Checkbox } from 'chalkui/dist/cjs/Components/Checkbox'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React, { useState } from 'react'

/*
 * Fields: submission_type
 */
export const useGroupAssignmentSetting = (defaultValue?: string) => {
   
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const course = useCurrentCourse()
   
   const groups = course.groups
   
   const [error, setError] = useState<boolean>(false)
   const [alert, setAlert] = useState<boolean>(false)
   const [submissionType, setSubmissionType] = useState<string>(defaultValue ?? 'individual')
   
   // const summary = submissionType === 'individual' ? t(`course:Individual`) : t('course:Group')
   
   function handleChangeSubmission(e: any) {
      if (e.target.checked) {
         if(groups.length > 0) {
            setAlert(false)
            setSubmissionType('group')
         }
      } else {
         // setAlert(true)
         setSubmissionType('individual')
      }
      if(groups.length > 0) {
      } else {
         setAlert(true)
      }
   }
   
   return {
      
      groupAssignmentValues: {
         submission_type: submissionType,
      },
      
      groupAssignmentFields: {
         
         isValid: () => {
            if (!!submissionType) {
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
                     icon={BiGroup}
                     title={t('Group assignment')}
                  >
   
                     <Checkbox
                        size="lg"
                        id="available"
                        isChecked={submissionType === 'group'}
                        onChange={handleChangeSubmission}
                     >
                        {t('form:Set as a group assignment')}
                     </Checkbox>
                     
                     {alert && (<Text color="orange.500">{t('form:No groups in this course')}</Text>)}
                     
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
      
      groupAssignmentHelpers: {},
      
   }
}
