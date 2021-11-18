import { useLocale } from '@slate/hooks/useLocale'
import { Editor } from '@tinymce/tinymce-react'
import { BoxProps } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/React'
import { MutableRefObject } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'

interface RichTextEditorProps {
   editorRef?: MutableRefObject<TinyMCEEditor | null>
   initialValue?: string
}

export function RichTextEditor({ initialValue, editorRef, ...rest }: RichTextEditorProps & BoxProps) {
   
   const locale = useLocale()
   
   // const editorRef: MutableRefObject<Editor | null> = useRef(null)
   
   return (
      <Box {...rest}>
         <Editor
            apiKey={process.env.TINYMCE_API_KEY}
            // onEditorChange={(a, editor) => setEditor(editor)}
            onInit={(evt, editor) => !!editorRef ? editorRef.current = editor : null}
            initialValue={initialValue}
            init={{
               height: 500,
               menubar: false,
               language: locale === 'fr' ? 'fr_FR' : undefined,
               plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
               ],
               toolbar: 'undo redo | fontsizeselect formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
               content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
               fontsize_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px',
            }}
         />
      </Box>
   )
}
