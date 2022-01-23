import { ComponentVisibility } from "@slate/components/ComponentVisibility"
import { EntityDrawer } from '@slate/components/UI/Course/EntityDrawer'
import { CreateTestMutationVariables } from '@slate/generated/graphql'
import { useCreateTest } from '@slate/graphql/schemas/gradebook_items/hooks'
import { useAccommodationSetting } from '@slate/hooks/settings/useAccommodationSetting'
import { useAssignToSetting } from '@slate/hooks/settings/useAssignToSetting'
import { useAttemptSetting } from '@slate/hooks/settings/useAttemptSetting'
import { useDueDateSetting } from '@slate/hooks/settings/useDueDateSetting'
import { useGradingSetting } from '@slate/hooks/settings/useGradingSetting'
import { useQuestionSetting } from '@slate/hooks/settings/useQuestionSetting'
import { useTimeLimitSetting } from '@slate/hooks/settings/useTimeLimitSetting'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useRichTextEditor } from '@slate/hooks/useRichTextEditor'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { FormControl, FormLabel } from 'chalkui/dist/cjs/Components/FormControl'
import { Input } from 'chalkui/dist/cjs/Components/Input'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

export function TestCreation({ onClose, isOpen }: any) {
   
   const t = useTypeSafeTranslation()
   const course = useCurrentCourse()
   
   const [wait, setWait] = useState(false)
   const { dueDateValues, dueDateFields } = useDueDateSetting()
   const { gradingValues, gradingFields } = useGradingSetting()
   const { attemptValues, attemptFields } = useAttemptSetting()
   const { assignToValues, assignToFields } = useAssignToSetting(null)
   const { accommodationValues, accommodationFields } = useAccommodationSetting(null)
   const { questionSettingValues, questionSettingFields } = useQuestionSetting()
   const { timeLimitValues, timeLimitFields } = useTimeLimitSetting()
   const { textEditor } = useRichTextEditor(null, false)
   
   const [createTest, isLoading] = useCreateTest({
      onCompleted: () => {
         fields.reset()
         onClose()
      },
   })
   
   const { onFormSubmit, fields, formState } = useFormCreator({
      schema: ({ z }) => z.object({
         name: z.string().min(4, FormErrors.RequiredField),
      }),
      onSubmit: async data => {
         
         setWait(true)
         let insert = false
         
         const gradebook_item_id = uuid()
         const test_id = uuid()
         
         const insert_data: CreateTestMutationVariables = {
            gradebook_item_id: gradebook_item_id,
            assessment_id: test_id,
            assessment_type: 'test',
            course_id: course.id,
            status: 'not_available',
            available_from: null,
            ...dueDateValues,
            ...gradingValues,
            ...assignToValues,
            ...attemptValues,
            ...accommodationValues,
            ...questionSettingValues,
            ...timeLimitValues,
            /** test **/
            test_id: test_id,
            name: data.name,
            description: textEditor.getValue(),
         }
         
         insert = true
         if (
            insert
            && textEditor.isValid()
            && dueDateFields.isValid()
            && attemptFields.isValid()
            && accommodationFields.isValid()
         ) {
            console.log(insert_data)
            createTest(insert_data)
         } else {
            setWait(false)
         }
         
      },
   })
   
   
   return (
      <ComponentVisibility.AssistantAndHigher>
         
         <EntityDrawer
            isOpen={isOpen}
            isLoading={isLoading || wait}
            onClose={onClose}
            onFormSubmit={onFormSubmit}
            title="Create a test"
            
            settings={
               <>
                  {dueDateFields.render()}
                  {gradingFields.render()}
                  {assignToFields.render()}
                  {timeLimitFields.render()}
                  {questionSettingFields.render()}
                  {attemptFields.render()}
                  {accommodationFields.render()}
               </>
            }
         
         >
            
            <FormControl mb={5} id="name" isRequired>
               <FormLabel>{t('form:Name')}</FormLabel>
               <Input size="lg" fontSize="4xl" variant="flushed" {...fields.register('name', { placeholder: 'Enter a name', required: true })} />
               {fields.errorMessage('name')}
            </FormControl>
            
            <Box mb="5">
               {textEditor.render({ title: 'Instructions', height: 200 })}
            </Box>
         
         </EntityDrawer>
      
      
      </ComponentVisibility.AssistantAndHigher>
   )
}

export default TestCreation
