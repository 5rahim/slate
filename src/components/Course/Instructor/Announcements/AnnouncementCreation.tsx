import { yupResolver } from '@hookform/resolvers/yup'
import { DateInput } from '@slate/components/DateInput'
import { PermissionComponent } from "@slate/components/Permissions"
import { RichTextEditor } from '@slate/components/RichTextEditor'
import { createRichTextEditorRef } from '@slate/components/RichTextEditor/utils'
import { TimePicker } from '@slate/components/TimePicker'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { useCourseTranslation } from '@slate/hooks/use-course-translation'
import { useCurrentCourse } from '@slate/hooks/use-current-course'
import { useCurrentUser } from '@slate/hooks/use-current-user'
import { useFormInputError } from '@slate/hooks/use-form-input-error'
import { Utils } from '@slate/utils'
import { Text } from 'chalkui/dist/cjs'
import { Box, Divider } from 'chalkui/dist/cjs/Components/Layout'
import {
   Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Input, Switch,
   useDisclosure,
} from 'chalkui/dist/cjs/React'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useCreateAnnouncement } from '@slate/graphql/queries/announcements/hooks'


export function AnnouncementCreation() {
   
   const t = useCourseTranslation()
   
   const user = useCurrentUser()
   const course = useCurrentCourse()
   
   const [publishOn, setPublishOn] = useState<any>(null)
   const [publishDate, setPublishDate] = useState<any>(null)
   const [publishTime, setPublishTime] = useState<any>(0)
   
   const schema = yup.object({
      title: yup.string().min(4).required(),
   })
   const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
   })
   
   const [createAnnouncement, mutationLoading] = useCreateAnnouncement({
      onCompleted: () => {
         reset()
         onClose()
      },
   })
   
   const { inputError } = useFormInputError()
   
   const { isOpen, onOpen, onClose } = useDisclosure()
   
   const editorRef = createRichTextEditorRef()
   
   const watchPublish = watch("publish", true)
   
   function handleCreateAnnouncement() {
      console.log(editorRef.current?.getContent())
   }
   
   function onSubmit(data: any) {
      console.log(data.publish, publishDate, editorRef.current?.getContent())
      if (( data.publish === false && !publishDate ) || !editorRef.current?.getContent()) {
         return
      }
      const insert_data = {
         title: data.title,
         published: data.publish,
         publish_on: !data.publish ? Utils.Dates.mergeDateAndTime(publishDate, publishTime) : null,
         message: editorRef.current?.getContent(),
         author_id: user.id,
         course_id: course.id
      }
      
      console.log(insert_data)
      
      createAnnouncement(insert_data)
   }
   
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
               <form onSubmit={handleSubmit(onSubmit)}>
                  <DrawerContent>
                     <DrawerCloseButton color="white" />
                     <DrawerHeader bg="brand.200" color="white" fontSize="2xl">
                        {t('course:Create an announcement')}
                     </DrawerHeader>
                     
                     
                     <DrawerBody>
                        
                        <FormControl mb={3} id="title" isRequired={true}>
                           <FormLabel>{t('form:Title')}</FormLabel>
                           <Input
                              {...register("title", { required: true })}
                              placeholder={t('form:Title')}
                              isInvalid={errors?.title}
                              autoComplete={'off'}
                           />
                           {inputError(errors?.title?.message)}
                        </FormControl>
                        
                        
                        <RichTextEditor mb={4} editorRef={editorRef} />
                        
                        <FormControl display="flex" alignItems="center" mb={3} id="publish">
                           <FormLabel htmlFor="publish" mb={0}>{t('form:Publish now')}</FormLabel>
                           <Switch size="md" id="puslish" defaultChecked={true} {...register("publish")} />
                        </FormControl>
                        
                        <Box display={watchPublish === false ? 'block' : 'none'}>
                           
                           <Divider mb="3" />
                           
                           <Text mb="2">{t('form:Publish when')}</Text>
                           
                           <AlignedFlex mb="2">
                              {t('form:Date')}:
                              <DateInput onChange={setPublishDate} />
                           </AlignedFlex>
                           
                           <AlignedFlex>
                              {t('form:Time')}:
                              <TimePicker defaultTime={1439} onChange={setPublishTime} />
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
