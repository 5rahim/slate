import { ComponentVisibility } from "@slate/components/ComponentVisibility"
import { Dropzone } from '@slate/components/Dropzone'
import { createRichTextEditorRef } from '@slate/components/RichTextEditor/utils'
import { EntityDrawer } from '@slate/components/UI/Course/EntityDrawer'
import { useCreateModule } from '@slate/graphql/schemas/modules/hooks'
import { usePublishDateSetting } from '@slate/hooks/settings/usePublishDateSetting'
import { useCurrentUnit } from '@slate/hooks/useCurrentUnit'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useFormFileUpload } from '@slate/hooks/useFormFileUpload'
import { useRichTextEditor } from '@slate/hooks/useRichTextEditor'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { FormControl, FormLabel } from 'chalkui/dist/cjs/Components/FormControl'
import { Input } from 'chalkui/dist/cjs/Components/Input'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Text } from 'chalkui/dist/cjs/Components/Typography'
import React, { useRef } from 'react'


export function AssignmentCreation({ onClose, isOpen }: any) {
   
   const editorRef = createRichTextEditorRef()
   
   const t = useTypeSafeTranslation()
   const cache = useStoreCache()
   const unit = useCurrentUnit()
   
   
   const { populateFiles, hasFiles, uploadFiles, isUploading } = useFormFileUpload("multiple")
   const { publishDateValues, publishDateFields } = usePublishDateSetting()
   const {textEditor} = useRichTextEditor()
   
   const [createModule, isLoading] = useCreateModule({
      onCompleted: () => {
         fields.reset()
         onClose()
      },
   })
   
   const descriptionInputRef: any = useRef()
   
   const { onFormSubmit, fields, formState } = useFormCreator({
      schema: ({ z }) => z.object({
         content: z.any(),
      }),
      onSubmit: async data => {
         
         let insert = false
         const insert_data = {}
         
         // if (!hasFiles) {
         //    insert = false
         //    fields.setError('content', FormErrors.RequiredFile)
         // }
         //
         // const uploadRes = await uploadFiles()
         //
         // if (uploadRes) {
         //    insert_data['content'] = JSON.stringify({
         //       file: uploadRes,
         //       name: descriptionInputRef.current?.value?.length > 0 ? descriptionInputRef.current.value : null,
         //    })
         //    insert = true
         // }
         insert = true
         console.log(insert_data)
         if (insert && textEditor.isValid()) {
            // createModule(insert_data)
         }
         
      },
   })
   
   
   return (
      <ComponentVisibility.AssistantAndHigher>
         
         <EntityDrawer
            isOpen={isOpen}
            isLoading={isLoading || isUploading}
            onClose={onClose}
            onFormSubmit={onFormSubmit}
            title="Create an assignment"
            
            settings={
               <>
                  {publishDateFields.render()}
               </>
            }
            
         >
   
            <FormControl mb={5} id="title">
               <FormLabel>{t('form:Title')}</FormLabel>
               <Input size="lg" fontSize="4xl" variant="flushed" {...fields.register('title', { placeholder: 'Enter a title', required: false })} />
               {fields.errorMessage('title')}
            </FormControl>
   
            <Box mb="5">
               {textEditor.render({ title: 'Description', height: 200 })}
            </Box>
            
            <Box>
               <Text mb="2">{t('Attachments')}</Text>
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
