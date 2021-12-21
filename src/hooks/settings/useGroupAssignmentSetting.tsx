import { gql, useLazyQuery } from '@apollo/client'
import { BiGroup } from '@react-icons/all-files/bi/BiGroup'
import { SettingSection } from '@slate/components/UI/Course/SettingSection'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { Checkbox } from 'chalkui/dist/cjs/Components/Checkbox'
import { Spinner } from 'chalkui/dist/cjs/Components/Spinner'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React, { useEffect, useState } from 'react'

/*
 * Fields: submission_type
 */
export const useGroupAssignmentSetting = (defaultValue?: "individual" | "group") => {
   
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const course = useCurrentCourse()

    const [fetch, { data, loading, error: queryError, networkStatus }] = useLazyQuery(
       gql`
           query FetchCourseGroups($course_id: uuid!) {
               groups(where: {course_id: {_eq: $course_id}}) {
                   id
               }
           }
       `,
       {
          fetchPolicy: 'no-cache'
       }
    )
   
   
   const [error, setError] = useState<boolean>(false)
   const [alert, setAlert] = useState<boolean>(false)
   const [submissionType, setSubmissionType] = useState<"individual" | "group">(defaultValue ?? 'individual')
   
   // const summary = submissionType === 'individual' ? t(`course:Individual`) : t('course:Group')
   
   useEffect(() => {
      if (!loading) {
         if(!(data?.groups?.length) || data?.groups?.length === 0) {
            !!data && setAlert(true)
            setSubmissionType('individual')
         } else {
            setSubmissionType('group')
         }
      }
   }, [data, loading])
   
   function handleChangeSubmission(e: any) {
      if (e.target.checked) {
      }
         fetch({ variables: { course_id: course.id } })
      setSubmissionType(e.target.checked ? 'group' : 'individual')
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
   
                     {!loading ? <Checkbox
                        size="lg"
                        id="available"
                        isChecked={submissionType === 'group'}
                        onChange={handleChangeSubmission}
                     >
                        {t('form:Set as a group assignment')}
                     </Checkbox> : <Spinner/>}
                     
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
