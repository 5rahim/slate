import { ComponentVisibility } from "@slate/components/ComponentVisibility"
import { Dropzone } from '@slate/components/Dropzone'
import { createRichTextEditorRef } from '@slate/components/RichTextEditor/utils'
import { EntityDrawer } from '@slate/components/UI/Course/EntityDrawer'
import { CreateAssignmentMutationVariables } from '@slate/generated/graphql'
import { useCreateAssignment } from '@slate/graphql/schemas/gradebook_items/hooks'
import { useAccommodationSetting } from '@slate/hooks/settings/useAccommodationSetting'
import { useAttemptSetting } from '@slate/hooks/settings/useAttemptSetting'
import { useDueDateSetting } from '@slate/hooks/settings/useDueDateSetting'
import { useGradingSetting } from '@slate/hooks/settings/useGradingSetting'
import { useGroupAssignmentSetting } from '@slate/hooks/settings/useGroupAssignmentSetting'
import { usePublishDateSetting } from '@slate/hooks/settings/usePublishDateSetting'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useFormFileUpload } from '@slate/hooks/useFormFileUpload'
import { useRichTextEditor } from '@slate/hooks/useRichTextEditor'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { FormErrors } from '@slate/types/FormErrors'
import { FormControl, FormLabel } from 'chalkui/dist/cjs/Components/FormControl'
import { Input } from 'chalkui/dist/cjs/Components/Input'
import { Box, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Radio } from "chalkui/dist/cjs/Components/Radio/Radio"
import { RadioGroup } from 'chalkui/dist/cjs/Components/Radio/RadioGroup'
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

export function AssignmentCreation({ onClose, isOpen }: any) {
   
   const editorRef = createRichTextEditorRef()
   
   const t = useTypeSafeTranslation()
   const cache = useStoreCache()
   const course = useCurrentCourse()
   
   const [submissionType, setSubmissionType] = useState("online")
   const [wait, setWait] = useState(false)
   const { populateFiles, hasFiles, uploadFiles, isUploading } = useFormFileUpload("multiple")
   const { publishDateValues, publishDateFields } = usePublishDateSetting()
   const { dueDateValues, dueDateFields } = useDueDateSetting()
   const { gradingValues, gradingFields } = useGradingSetting()
   const { attemptValues, attemptFields } = useAttemptSetting()
   const { accommodationValues, accommodationFields } = useAccommodationSetting(null)
   const { groupAssignmentValues, groupAssignmentFields } = useGroupAssignmentSetting()
   const { textEditor } = useRichTextEditor()
   
   const [createAssignment, isLoading] = useCreateAssignment({
      onCompleted: () => {
         fields.reset()
         onClose()
      },
   })
   
   const { onFormSubmit, fields, formState } = useFormCreator({
      schema: ({ z }) => z.object({
         name: z.string().min(4, FormErrors.RequiredField),
         content: z.any(),
      }),
      onSubmit: async data => {
         
         setWait(true)
         let insert = false
         
         const gradebook_item_id = uuid()
         const assignment_id = uuid()
         
         const insert_data: CreateAssignmentMutationVariables = {
            gradebook_item_id: gradebook_item_id,
            assessment_id: assignment_id,
            assessment_type: 'assignment',
            course_id: course.id,
            ...publishDateValues,
            ...dueDateValues,
            ...gradingValues,
            ...attemptValues,
            ...accommodationValues,
            ...groupAssignmentValues,
            /** assignment **/
            assignment_id: assignment_id,
            name: data.name,
            description: textEditor.value,
            type: submissionType,
            files: null,
         }
         
         if (!hasFiles) {
            insert = true
         } else {
            const uploadRes = await uploadFiles()
            
            if (uploadRes) {
               insert_data['files'] = JSON.stringify(uploadRes)
               insert = true
            }
         }
         
         if (
            insert
            && textEditor.isValid()
            && publishDateFields.isValid()
            && dueDateFields.isValid()
            && attemptFields.isValid()
            && accommodationFields.isValid()
         ) {
            console.log(insert_data)
            createAssignment(insert_data)
         } else {
            setWait(false)
         }
         
      },
   })
   
   
   return (
      <ComponentVisibility.AssistantAndHigher>
         
         <EntityDrawer
            isOpen={isOpen}
            isLoading={isLoading || isUploading || wait}
            onClose={onClose}
            onFormSubmit={onFormSubmit}
            title="Create an assignment"
            
            settings={
               <>
                  {publishDateFields.render()}
                  {dueDateFields.render()}
                  {gradingFields.render()}
                  <>{submissionType === 'online' && (
                     <>
                        {attemptFields.render()}
                        {accommodationFields.render()}
                        {groupAssignmentFields.render()}
                     </>
                  )}</>
               </>
            }
         
         >
            
            <Box mb="5">
               <FormLabel mb="2">{t('course:Submission type')}</FormLabel>
               <RadioGroup size="lg" onChange={setSubmissionType} value={submissionType}>
                  <Stack direction="row">
                     <Radio value="online">{t('Online')}</Radio>
                     <Radio value="offline">{t('Offline')}</Radio>
                  </Stack>
               </RadioGroup>
            </Box>
            
            <FormControl mb={5} id="name" isRequired>
               <FormLabel>{t('form:Name')}</FormLabel>
               <Input size="lg" fontSize="4xl" variant="flushed" {...fields.register('name', { placeholder: 'Enter a name', required: true })} />
               {fields.errorMessage('name')}
            </FormControl>
            
            <Box mb="5">
               {textEditor.render({ title: 'Description', height: 200 })}
            </Box>
            
            <Box>
               <FormLabel mb="2">{t('Attachments')}</FormLabel>
               <Dropzone
                  multiple={true}
                  disabled={isUploading}
                  onChange={populateFiles}
                  inputProps={{ ...fields.register('content') }}
               />
               {fields.errorMessage('content')}
            </Box>
         
         </EntityDrawer>
      
      
      </ComponentVisibility.AssistantAndHigher>
   )
}

export default AssignmentCreation
