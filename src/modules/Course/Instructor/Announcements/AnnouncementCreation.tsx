import { DateInput } from '@slate/components/DateInput'
import { PermissionComponent } from "@slate/components/Permissions"
import { RichTextEditor } from '@slate/components/RichTextEditor'
import { createRichTextEditorRef } from '@slate/components/RichTextEditor/utils'
import { TimePicker } from '@slate/components/TimePicker'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { CreateAnnouncementMutationVariables } from '@slate/generated/graphql'
import { useCreateAnnouncement } from '@slate/graphql/schemas/announcements/hooks'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useCurrentUser } from '@slate/hooks/useCurrentUser'
import { useDateAndTimeFields } from '@slate/hooks/useDateAndTimeFields'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { Text } from 'chalkui/dist/cjs'
import { Box, Divider } from 'chalkui/dist/cjs/Components/Layout'
import {
   Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Input, Switch,
   useDisclosure,
} from 'chalkui/dist/cjs/React'
import React from 'react'


export function AnnouncementCreation() {

   const t = useTypeSafeTranslation()
   const user = useCurrentUser()
   const course = useCurrentCourse()
   const { isOpen, onOpen, onClose } = useDisclosure()


   const [createAnnouncement, mutationLoading] = useCreateAnnouncement({
      onCompleted: () => {
         fields.reset()
         resetDateAndTimeFields()
         onClose()
      },
   })

   const editorRef = createRichTextEditorRef()
   const { value: publishOn, setDateField, setTimeField, resetDateAndTimeFields } = useDateAndTimeFields()

   const { onFormSubmit, fields, formState } = useFormCreator({
      schema: ({ z }) => z.object({
         title: z.string().min(4, FormErrors.RequiredField),
         publish: z.boolean()
      }),
      onSubmit: data => {

         const insert_data: CreateAnnouncementMutationVariables = {
            title: data.title,
            is_scheduled: !data.publish,
            publish_on: !data.publish ? publishOn : null,
            message: editorRef.current?.getContent() ?? '',
            author_id: user.id,
            course_id: course.id
         }

         if(editorRef.current?.getContent().length === 0)
            fields.setError('message', FormErrors.RequiredField)
         else if(!data.publish && !publishOn)
            fields.setError('date', FormErrors.RequiredField)

         else createAnnouncement(insert_data)
      },
   })

   return (
      <PermissionComponent.AssistantAndHigher>

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


         <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            // finalFocusRef={btnRef}
            size="xl"
         >
            <DrawerOverlay>
               <form onSubmit={onFormSubmit}>
                  <DrawerContent>
                     <DrawerCloseButton color="white" />
                     <DrawerHeader bg="brand.200" color="white" fontSize="2xl">
                        {t('course:Create an announcement')}
                     </DrawerHeader>


                     <DrawerBody>

                        <FormControl mb={3} id="title" isRequired={true}>
                           <FormLabel>{t('form:Title')}</FormLabel>
                           <Input
                              {...fields.register('title', { placeholder: 'Title' })}
                           />
                           {fields.errorMessage('title')}
                        </FormControl>


                        <RichTextEditor mb={4} editorRef={editorRef} />
                        {fields.errorMessage('message')}

                        <FormControl display="flex" alignItems="center" mb={3} id="publish">
                           <FormLabel htmlFor="publish" mb={0}>{t('form:Publish now')}</FormLabel>
                           <Switch size="md" id="puslish" defaultChecked={true} {...fields.register("publish")} />
                        </FormControl>

                        <Box display={fields.watch('publish', true) === false ? 'block' : 'none'}>

                           <Divider mb="3" />

                           <Text mb="2">{t('form:Publish when')}</Text>

                           <AlignedFlex mb="2">
                              {t('form:Date')}:
                              <DateInput onChange={setDateField} />
                           </AlignedFlex>
                           {fields.errorMessage('date')}

                           <AlignedFlex>
                              {t('form:Time')}:
                              <TimePicker defaultTime={1439} onChange={setTimeField} />
                           </AlignedFlex>
                        </Box>

                     </DrawerBody>

                     <DrawerFooter borderTopWidth="1px">
                        <Button boxShadow="sm" colorScheme="primary" variant="outline" mr={2} onClick={onClose}>
                           {t('Cancel')}
                        </Button>
                        <Button colorScheme="primary" type="submit" isLoading={mutationLoading}>{t('Save')}</Button>
                     </DrawerFooter>


                  </DrawerContent>
               </form>
            </DrawerOverlay>
         </Drawer>

      </PermissionComponent.AssistantAndHigher>
   )
}
