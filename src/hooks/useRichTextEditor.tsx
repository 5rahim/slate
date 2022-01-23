import { RichTextEditor, SimpleTextEditor } from '@slate/components/RichTextEditor'
import { createRichTextEditorRef } from '@slate/components/RichTextEditor/utils'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { Parameter } from '@slate/types/Parameters'
import { FormLabel } from 'chalkui/dist/cjs/Components/FormControl/FormLabel'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React, { useState } from 'react'

export const useRichTextEditor = (defaultValue?: Parameter<string>, isRequired = true, simple: boolean = false) => {
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const editorRef = createRichTextEditorRef()
   const [error, setError] = useState<boolean>(false)
   const [editor, setEditor] = useState<any>(null)
   
   return {
      content: editor,
      textEditor: {
         
         setValue: (value: string) => editorRef.current?.setContent(value),
         
         getValue: () => editorRef?.current?.getContent() ?? '',
         
         isValid: () => {
            if (editorRef.current && (editorRef.current?.getContent().length > 0)) {
               setError(false)
               return true
            } else if (isRequired) {
               setError(true)
               return false
            } else {
               setError(false)
               return true
            }
         },
         
         render: (props?: { title?: string, height?: number }) => {
            return (
               <Box mb="2">
                  {props?.title && <FormLabel mb="2">{t(`form:${props.title}`)}</FormLabel>}
                  {
                     simple ? (
                           <SimpleTextEditor setEditor={setEditor} height={props?.height} mb="2" defaultValue={defaultValue ?? ''} editorRef={editorRef} />
                        )
                        : (
                           <RichTextEditor setEditor={setEditor} height={props?.height} mb="2" defaultValue={defaultValue ?? ''} editorRef={editorRef} />
                        )
                  }
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
               </Box>
            )
         }
         
      }
   }
   
}
