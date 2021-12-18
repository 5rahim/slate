import { BiEdit } from '@react-icons/all-files/bi/BiEdit'
import { BiLink } from '@react-icons/all-files/bi/BiLink'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { RichTextEditor } from '@slate/components/RichTextEditor'
import { createRichTextEditorRef } from '@slate/components/RichTextEditor/utils'
import { SettingList } from '@slate/components/UI/Course/SettingList'
import { Modules, UpdateModuleMutationVariables } from '@slate/generated/graphql'
import { useUpdateModule } from '@slate/graphql/schemas/modules/hooks'
import { usePublishDateSetting } from '@slate/hooks/settings/usePublishDateSetting'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { UnitModuleTypes } from '@slate/types/UnitModules'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { FormControl, FormLabel } from 'chalkui/dist/cjs/Components/FormControl'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox'
import { Input } from 'chalkui/dist/cjs/Components/Input'
import { InputLeftElement } from 'chalkui/dist/cjs/Components/Input/InputElement'
import { InputGroup } from 'chalkui/dist/cjs/Components/Input/InputGroup'
import { Divider, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from 'chalkui/dist/cjs/Components/Modal/Modal'
import { Radio } from 'chalkui/dist/cjs/Components/Radio/Radio'
import { RadioGroup } from 'chalkui/dist/cjs/Components/Radio/RadioGroup'
import React, { useRef } from 'react'

interface UnitModuleEditProps {
   isOpen: boolean
   onClose: any
   data: Modules,
}

export const UnitModuleEdit = ({ isOpen, onClose, data }: UnitModuleEditProps) => {
   
   const t = useTypeSafeTranslation()
   
   let content = data.content.startsWith('{') || data.content.startsWith('[') ? JSON.parse(data.content) : null
   const editorRef = createRichTextEditorRef()
   const [messageType, setMessageType] = React.useState(data.type === 'message' ? JSON.parse(data.content).type : '1')
   
   const descriptionInputRef: any = useRef()
   
   const { publishDateValues, publishDateFields } = usePublishDateSetting({
      defaultValue: {
         status: data.status,
         available_from: data.available_from
      }
   })
   
   const [updateModule, mutationLoading] = useUpdateModule({
      onCompleted: () => {
      },
   })
   
   const { onFormSubmit, fields, formState } = useFormCreator({
      schema: ({ z }) => ( data.type !== UnitModuleTypes.File && data.type !== UnitModuleTypes.Text )
         ? z.object({
            content: z.string().nonempty(FormErrors.RequiredField),
         })
         : z.object({
            content: z.any(),
         }),
      onSubmit: async formData => {
         
         let update = false
         
         let update_data: UpdateModuleMutationVariables = {
            id: data.id,
            content: JSON.stringify(null),
            status: publishDateValues.status,
            available_from: publishDateValues.available_from,
            folder_id: data.folder_id,
         }
         
         switch (data.type) {
            case UnitModuleTypes.Text:
               update_data['content'] = editorRef.current?.getContent() ?? ''
               if (editorRef.current?.getContent().length === 0)
                  fields.setError('text', FormErrors.RequiredField)
               else
                  update = true
               break
            case UnitModuleTypes.TextHeader:
               update_data['content'] = formData.content
               update = true
               break
            case UnitModuleTypes.Folder:
               update_data['content'] = formData.content
               update = true
               break
            case UnitModuleTypes.Message:
               update_data['content'] = JSON.stringify({
                  message: formData.content,
                  type: messageType,
               })
               update = true
               break
            case UnitModuleTypes.Link:
               update_data['content'] = JSON.stringify({
                  link: formData.content,
                  description: descriptionInputRef.current.value?.length > 0 ? descriptionInputRef.current.value : null,
               })
               update = true
               break
            case UnitModuleTypes.File:
               update_data['content'] = JSON.stringify({
                  file: JSON.parse(data.content).file,
                  name: descriptionInputRef.current?.value?.length > 0 ? descriptionInputRef.current.value : null,
               })
               update = true
               break
         }
         
         console.log(update_data)
         
         if (update && publishDateFields.isValid()) {
            updateModule(update_data)
         }
         
      },
   })
   
   function handleClose() {
      !mutationLoading && onClose()
   }
   
   return (
      <ComponentVisibility.AssistantAndHigher>
         
         
         <Modal size="2xl" isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
               <IconBox isCircular icon={<BiEdit />} colorScheme="primary" margin="0 auto" mt={3} />
               <ModalHeader textAlign="center">{t('course:Update a module')}</ModalHeader>
               <form onSubmit={onFormSubmit}>
                  <ModalBody>
                     
                     {
                        data.type === UnitModuleTypes.Text && (
                           <>
                              <RichTextEditor mb={4} defaultValue={data.content} editorRef={editorRef} />
                              {fields.errorMessage('text')}
                           </>
                        )
                     }
                     
                     {
                        data.type === UnitModuleTypes.Folder && (
                           <>
                              <FormControl mb={3} id="name" isRequired={true}>
                                 <FormLabel>{t('form:Folder name')}</FormLabel>
                                 <Input defaultValue={data.content} {...fields.register('content', { placeholder: '', required: true })} />
                                 {fields.errorMessage('content')}
                              </FormControl>
                           </>
                        )
                     }
                     
                     {
                        data.type === UnitModuleTypes.TextHeader && (
                           <>
                              <FormControl mb={3} id="title" isRequired={true}>
                                 <FormLabel>{t('form:Title')}</FormLabel>
                                 <Input defaultValue={data.content} {...fields.register('content', { placeholder: '', required: true })} />
                                 {fields.errorMessage('content')}
                              </FormControl>
                           </>
                        )
                     }
                     
                     {
                        data.type === UnitModuleTypes.Message && (
                           <>
                              <FormControl mb={3} id="message" isRequired={true}>
                                 <FormLabel>{t('form:Message')}</FormLabel>
                                 <Input
                                    defaultValue={JSON.parse(data.content).message} {...fields.register('content', {
                                    placeholder: '', required: true,
                                 })} />
                                 {fields.errorMessage('content')}
                              </FormControl>
                              
                              
                              <RadioGroup onChange={setMessageType} value={messageType}>
                                 <Stack direction="row">
                                    <Radio value="1">{t('Normal')}</Radio>
                                    <Radio value="2">{t('Warning')}</Radio>
                                    <Radio value="3">{t('Alert')}</Radio>
                                 </Stack>
                              </RadioGroup>
                           </>
                        )
                     }
                     
                     {
                        data.type === UnitModuleTypes.File && (
                           <>
                              <FormControl mb={3} id="description">
                                 <FormLabel>{t('form:Name')}</FormLabel>
                                 <InputGroup>
                                    <Input
                                       placeholder={JSON.parse(data.content).file.name}
                                       defaultValue={JSON.parse(data.content).name}
                                       ref={descriptionInputRef}
                                    />
                                 </InputGroup>
                              </FormControl>
                           
                           </>
                        )
                     }
                     
                     {
                        data.type === UnitModuleTypes.Link && (
                           <>
                              <FormControl mb={3} id="link" isRequired={true}>
                                 <FormLabel>{t('form:Link')}</FormLabel>
                                 <InputGroup>
                                    <InputLeftElement children={<BiLink />} />
                                    <Input
                                       defaultValue={JSON.parse(data.content).link} {...fields.register('content', {
                                       placeholder: '', required: true,
                                    })} />
                                 </InputGroup>
                                 {fields.errorMessage('content')}
                              </FormControl>
                              
                              <FormControl mb={3} id="description">
                                 <FormLabel>{t('form:Description')}</FormLabel>
                                 <InputGroup>
                                    <Input defaultValue={JSON.parse(data.content).description} ref={descriptionInputRef} />
                                 </InputGroup>
                              </FormControl>
                           </>
                        )
                     }
                     
                     <Divider my="3" />
                     
                     <SettingList>
                        {publishDateFields.render()}
                     </SettingList>
                     
                  
                  </ModalBody>
                  
                  <ModalFooter gridGap={5}>
                     <Button
                        colorScheme="brand.100"
                        width="100%"
                        type="submit"
                        isDisabled={!formState.touched}
                        isLoading={mutationLoading}
                     >
                        {t('Save')}
                     </Button>
                     <Button isDisabled={mutationLoading} variant="outline" colorScheme="brand.800" onClick={onClose} isFullWidth>
                        {t('Cancel')}
                     </Button>
                  </ModalFooter>
               </form>
            </ModalContent>
         </Modal>
         
         {/*{*/}
         {/*   data.type === UnitModuleTypes.Document && <UnitModuleEditDocument isOpen={isOpen} onClose={onClose} data={data} />*/}
         {/*}*/}
      
      </ComponentVisibility.AssistantAndHigher>
   )
   
}

export default UnitModuleEdit
