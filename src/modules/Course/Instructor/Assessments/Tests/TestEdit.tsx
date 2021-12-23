import { ComponentVisibility } from "@slate/components/ComponentVisibility"
import { createRichTextEditorRef } from '@slate/components/RichTextEditor/utils'
import { EntityDrawer } from '@slate/components/UI/Course/EntityDrawer'
import { EditTestMutationVariables, Gradebook_Items, Tests } from '@slate/generated/graphql'
import { useEditTest } from '@slate/graphql/schemas/gradebook_items/hooks'
import { useAccommodationSetting } from '@slate/hooks/settings/useAccommodationSetting'
import { useAttemptSetting } from '@slate/hooks/settings/useAttemptSetting'
import { useDueDateSetting } from '@slate/hooks/settings/useDueDateSetting'
import { useGradingSetting } from '@slate/hooks/settings/useGradingSetting'
import { usePublishDateSetting } from '@slate/hooks/settings/usePublishDateSetting'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useRichTextEditor } from '@slate/hooks/useRichTextEditor'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { FormErrors } from '@slate/types/FormErrors'
import { FormControl, FormLabel } from 'chalkui/dist/cjs/Components/FormControl'
import { Input } from 'chalkui/dist/cjs/Components/Input'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import React, { useState } from 'react'

export function TestEdit({ onClose, isOpen, data }: { onClose: any, isOpen: any, data: { gradebookItem: Gradebook_Items } }) {
   
   const editorRef = createRichTextEditorRef()
   const gradebookItem = data.gradebookItem
   const test = data.gradebookItem.test as Tests
   const t = useTypeSafeTranslation()
   const cache = useStoreCache()
   const course = useCurrentCourse()
   
   const [wait, setWait] = useState(false)
   const { publishDateValues, publishDateFields } = usePublishDateSetting({
      defaultValue: {
         availableFrom: gradebookItem.available_from,
         status: gradebookItem.status,
      },
   })
   const { dueDateValues, dueDateFields } = useDueDateSetting(gradebookItem.available_until)
   const { gradingValues, gradingFields } = useGradingSetting({
      scoringType: gradebookItem.scoring_type,
      maxPoints: gradebookItem.max_points as number,
   })
   const { attemptValues, attemptFields } = useAttemptSetting({
      attemptsAllowed: gradebookItem.attempts_allowed as number,
      attemptsGrading: gradebookItem.attempts_grading as string,
   })
   const { accommodationValues, accommodationFields } = useAccommodationSetting(gradebookItem.accommodations)
   const { textEditor } = useRichTextEditor(test.description, false)
   
   
   const [editAssignment, isLoading] = useEditTest({
      onCompleted: () => {
         setWait(false)
      },
   })
   
   const { onFormSubmit, fields, formState } = useFormCreator({
      defaultValues: {
         name: test.name,
      },
      schema: ({ z }) => z.object({
         name: z.string().min(4, FormErrors.RequiredField),
      }),
      onSubmit: async formData => {
         
         setWait(true)
         let update = false
         
         const update_data: EditTestMutationVariables = {
            gradebook_item_id: gradebookItem.id,
            assessment_id: test.id,
            assessment_type: 'test',
            course_id: course.id,
            ...publishDateValues,
            ...dueDateValues,
            ...gradingValues,
            ...attemptValues,
            ...accommodationValues,
            /** test **/
            time_limit: 60, // TODO
            test_id: test.id,
            name: formData.name,
            description: textEditor.value,
         }
         
         update = true
         
         if (
            update
            && textEditor.isValid()
            && publishDateFields.isValid()
            && dueDateFields.isValid()
            && attemptFields.isValid()
            && accommodationFields.isValid()
         ) {
            console.log(update_data)
            editAssignment(update_data)
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
            headerColor="brand.700"
            title="Edit a test"
            closeOnOverlayClick={true}
            settings={
               <>
                  {publishDateFields.render()}
                  {dueDateFields.render()}
                  {gradingFields.render()}
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
               {textEditor.render({ title: 'Description', height: 200 })}
            </Box>
         
         </EntityDrawer>
      
      
      </ComponentVisibility.AssistantAndHigher>
   )
}

export default TestEdit
