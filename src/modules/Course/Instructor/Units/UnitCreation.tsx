import { ComponentVisibility } from "@slate/components/ComponentVisibility"
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useCurrentUser } from '@slate/hooks/useCurrentUser'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Button, useDisclosure } from 'chalkui/dist/cjs/React'
import React from 'react'


export function UnitCreation() {
   
   const t = useTypeSafeTranslation()
   const user = useCurrentUser()
   const course = useCurrentCourse()
   const { isOpen, onOpen, onClose } = useDisclosure()
   
   
   // const [createAnnouncement, mutationLoading] = useCreateAnnouncement({
   //    onCompleted: () => {
   //       fields.reset()
   //       resetDateAndTimeFields()
   //       onClose()
   //    },
   // })
   //
   // const editorRef = createRichTextEditorRef()
   // const { value: publishOn, setDateField, setTimeField, resetDateAndTimeFields } = useDateAndTimeFields()
   
   const { onFormSubmit, fields, formState } = useFormCreator({
      schema: ({ z }) => z.object({
         title: z.string().min(4, FormErrors.RequiredField),
         publish: z.boolean(),
      }),
      onSubmit: data => {
      
      
      },
   })
   
   return (
      <ComponentVisibility.AssistantAndHigher>
         
         <Box mb="3">
            
            <Button
               borderRadius="2rem"
               colorScheme="brand.100"
               size="md"
               onClick={onOpen}
            >
               {t('Create')}
            </Button>
         
         </Box>
      
      
      </ComponentVisibility.AssistantAndHigher>
   )
}
