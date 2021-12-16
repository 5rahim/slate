import { BiAddToQueue } from '@react-icons/all-files/bi/BiAddToQueue'
import { BiLink } from '@react-icons/all-files/bi/BiLink'
import { ComponentVisibility } from "@slate/components/ComponentVisibility"
import { Dropzone } from '@slate/components/Dropzone'
import { RichTextEditor } from '@slate/components/RichTextEditor'
import { createRichTextEditorRef } from '@slate/components/RichTextEditor/utils'
import { CreateModuleMutationVariables, Modules } from '@slate/generated/graphql'
import { useCreateModule } from '@slate/graphql/schemas/modules/hooks'
import { useCurrentUnit } from '@slate/hooks/useCurrentUnit'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useFormFileUpload } from '@slate/hooks/useFormFileUpload'
import { useModuleFolder } from '@slate/hooks/useModuleFolder'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { FormErrors } from '@slate/types/FormErrors'
import { UnitModuleTypes } from '@slate/types/UnitModules'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { FormControl, FormLabel } from 'chalkui/dist/cjs/Components/FormControl'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox'
import { Input } from 'chalkui/dist/cjs/Components/Input'
import { InputLeftElement } from 'chalkui/dist/cjs/Components/Input/InputElement'
import { InputGroup } from 'chalkui/dist/cjs/Components/Input/InputGroup'
import { Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from 'chalkui/dist/cjs/Components/Modal'
import { Radio } from 'chalkui/dist/cjs/Components/Radio/Radio'
import { RadioGroup } from 'chalkui/dist/cjs/Components/Radio/RadioGroup'
import React, { useRef } from 'react'


export function UnitModuleCreation({ moduleType, onClose, isOpen }: any) {
   
   // const [moduleType, setModuleType] = useState<UnitModuleTypes>()
   const editorRef = createRichTextEditorRef()
   const [messageType, setMessageType] = React.useState('1')
   
   const t = useTypeSafeTranslation()
   // const { isOpen, onOpen, onClose } = useDisclosure()
   const cache = useStoreCache()
   const unit = useCurrentUnit()
   
   const { isFolderOpen, openedFolder } = useModuleFolder()
   
   const { populateFiles, hasFiles, uploadFiles, isUploading } = useFormFileUpload("single")
   
   const [createModule, isLoading] = useCreateModule({
      onCompleted: () => {
         fields.reset()
         onClose()
      },
   })
   
   const descriptionInputRef: any = useRef()
   
   const { onFormSubmit, fields, formState } = useFormCreator({
      schema: ({ z }) => ( moduleType !== UnitModuleTypes.File && moduleType !== UnitModuleTypes.Text )
         ? z.object({
            content: z.string().nonempty(FormErrors.RequiredField),
         })
         : z.object({ content: z.any() }),
      onSubmit: async data => {
         
         let insert = false
         
         let insert_data: CreateModuleMutationVariables = {
            unit_id: unit.id,
            type: moduleType as string,
            order: cache.read<Modules[] | null>('modules')?.length ?? 0,
            content: JSON.stringify({}),
            folder_id: isFolderOpen ? openedFolder?.id : null,
            status: 'not_available',
         }
         
         switch (moduleType) {
            case UnitModuleTypes.Text:
               insert_data['content'] = editorRef.current?.getContent() ?? ''
               if (editorRef.current?.getContent().length === 0)
                  fields.setError('text', FormErrors.RequiredField)
               else
                  insert = true
               break
            case UnitModuleTypes.TextHeader:
               insert_data['content'] = data.content
               insert = true
               break
            case UnitModuleTypes.Folder:
               insert_data['content'] = data.content
               insert = true
               break
            case UnitModuleTypes.Message:
               insert_data['content'] = JSON.stringify({
                  message: data.content,
                  type: messageType,
               })
               insert = true
               break
            case UnitModuleTypes.Document:
               insert_data['content'] = JSON.stringify({
                  name: data.content,
                  content: null,
               })
               insert = true
               break
            case UnitModuleTypes.Link:
               insert_data['content'] = JSON.stringify({
                  link: data.content,
                  description: descriptionInputRef.current.value?.length > 0 ? descriptionInputRef.current.value : null,
               })
               insert = true
               break
            case UnitModuleTypes.File:
               if (!hasFiles) {
                  insert = false
                  fields.setError('content', FormErrors.RequiredFile)
               }
               
               const uploadRes = await uploadFiles()
               
               if (uploadRes) {
                  insert_data['content'] = JSON.stringify({
                     file: uploadRes,
                     name: descriptionInputRef.current?.value?.length > 0 ? descriptionInputRef.current.value : null,
                  })
                  insert = true
               }
               break
         }
         
         console.log(insert_data)
         if (insert) {
            createModule(insert_data)
         }
         
      },
   })
   
   
   return (
      <ComponentVisibility.AssistantAndHigher>
         
         <Modal size="2xl" isCentered isOpen={isOpen} onClose={() => !(isLoading || isUploading) && onClose()}>
            <ModalOverlay />
            
            <form onSubmit={onFormSubmit}>
               <ModalContent>
                  <IconBox isCircular icon={<BiAddToQueue />} colorScheme="primary" margin="0 auto" mt={3} />
                  <ModalHeader textAlign="center">{t(`course:options.Add a ${moduleType}`)}</ModalHeader>
                  <ModalBody>
                     
                     {
                        moduleType === UnitModuleTypes.Folder && (
                           <>
                              <FormControl mb={3} id="folder" isRequired={true}>
                                 <FormLabel>{t('form:Folder name')}</FormLabel>
                                 <Input {...fields.register('content', { placeholder: '', required: true })} />
                                 {fields.errorMessage('content')}
                              </FormControl>
                           </>
                        )
                     }
                     
                     {
                        moduleType === UnitModuleTypes.Text && (
                           <>
                              <RichTextEditor mb={4} editorRef={editorRef} />
                              {fields.errorMessage('text')}
                           </>
                        )
                     }
                     
                     {
                        moduleType === UnitModuleTypes.TextHeader && (
                           <>
                              <FormControl mb={3} id="title" isRequired={true}>
                                 <FormLabel>{t('form:Title')}</FormLabel>
                                 <Input {...fields.register('content', { placeholder: '', required: true })} />
                                 {fields.errorMessage('content')}
                              </FormControl>
                           </>
                        )
                     }
                     
                     {
                        moduleType === UnitModuleTypes.Message && (
                           <>
                              <FormControl mb={3} id="message" isRequired={true}>
                                 <FormLabel>{t('form:Message')}</FormLabel>
                                 <Input {...fields.register('content', { placeholder: '', required: true })} />
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
                        moduleType === UnitModuleTypes.Document && (
                           <>
                              <FormControl mb={3} id="name" isRequired={true}>
                                 <FormLabel>{t('form:Document name')}</FormLabel>
                                 <Input {...fields.register('content', { placeholder: '', required: true })} />
                                 {fields.errorMessage('content')}
                              </FormControl>
                           </>
                        )
                     }
                     
                     {
                        moduleType === UnitModuleTypes.File && (
                           <>
                              <FormControl mb={3} id="description">
                                 <FormLabel>{t('form:Name')}</FormLabel>
                                 <InputGroup>
                                    <Input ref={descriptionInputRef} />
                                 </InputGroup>
                              </FormControl>
                              
                              <Dropzone
                                 multiple={false}
                                 disabled={isUploading}
                                 onChange={populateFiles}
                                 inputProps={{ ...fields.register('content') }}
                              />
                              {fields.errorMessage('content')}
                           
                           
                           </>
                        )
                     }
                     
                     {
                        moduleType === UnitModuleTypes.Link && (
                           <>
                              <FormControl mb={3} id="link" isRequired={true}>
                                 <FormLabel>{t('form:Link')}</FormLabel>
                                 <InputGroup>
                                    <InputLeftElement children={<BiLink />} />
                                    <Input {...fields.register('content', { placeholder: '', required: true })} />
                                 </InputGroup>
                                 {fields.errorMessage('content')}
                              </FormControl>
                              
                              <FormControl mb={3} id="description">
                                 <FormLabel>{t('form:Description')}</FormLabel>
                                 <InputGroup>
                                    <Input ref={descriptionInputRef} />
                                 </InputGroup>
                              </FormControl>
                           </>
                        )
                     }
                  
                  </ModalBody>
                  
                  <ModalFooter gridGap={5}>
                     <Button
                        colorScheme="brand.100"
                        width="100%"
                        type="submit"
                        isLoading={isLoading || isUploading}
                     >
                        {t('Save')}
                     </Button>
                     
                     <Button isDisabled={isLoading || isUploading} colorScheme="brand.800" onClick={onClose} isFullWidth>
                        {t('Cancel')}
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </form>
         </Modal>
      
      
      </ComponentVisibility.AssistantAndHigher>
   )
}

export default UnitModuleCreation
