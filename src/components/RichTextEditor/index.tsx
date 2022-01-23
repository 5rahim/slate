import { useLocale } from '@slate/hooks/useLocale'
import { Editor } from '@tinymce/tinymce-react'
import { Box, BoxProps } from 'chalkui/dist/cjs/Components/Layout/Box'
import { MutableRefObject } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'

interface RichTextEditorProps {
   editorRef?: MutableRefObject<TinyMCEEditor | null>
   defaultValue?: string,
   height?: number,
   setEditor?: any
}

async function gcs_image_upload_handler(blobInfo: any, success: any, failure: any, progress: any) {
   
   const file = blobInfo.blob()
   const res = await fetch(`/api/gcs/upload?file=${blobInfo.filename()}`)
   const { raw: { url, fields } } = await res.json()
   const formData = new FormData()
   
   console.log(url, fields)
   
   Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string)
   })
   
   if (url) {
      
      try {
         const upload = await fetch(url, {
            method: 'POST',
            body: formData,
         })
         
         
         if (upload.ok) {
            success(url + fields.key)
         } else {
            failure()
         }
      }
      catch (e) {
      
      }
      console.log(url + fields.key)
   }
   
}


export function RichTextEditor({ defaultValue, editorRef, setEditor, height = 500, ...rest }: RichTextEditorProps & BoxProps) {
   
   const locale = useLocale()
   
   // const editorRef: MutableRefObject<Editor | null> = useRef(null)
   
   return (
      <Box {...rest}>
         <Editor
            apiKey={process.env.TINYMCE_API_KEY}
            onKeyUp={(e) => {
               // console.log(e.target.innerHTML)
            }}
            onEditorChange={(a, editor) => {
               console.log(a)
               setEditor(a)
            }}
            onInit={(evt, editor) => !!editorRef ? editorRef.current = editor : null}
            initialValue={defaultValue}
            init={{
               height,
               menubar: false,
               language: locale === 'fr' ? 'fr_FR' : undefined,
               plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
               ],
               toolbar: ['undo redo | fontsizeselect formatselect | ' +
               'bold italic forecolor backcolor | alignleft aligncenter ' +
               'alignright alignjustify', 'image | bullist numlist outdent indent | ' +
               'removeformat | help'],
               content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
               fontsize_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px',
               // images_reuse_filename: true,
               images_upload_handler: gcs_image_upload_handler,
            }}
         />
      </Box>
   )
}



export function SimpleTextEditor({ defaultValue, editorRef, setEditor, height = 500, ...rest }: RichTextEditorProps & BoxProps) {
   
   const locale = useLocale()
   
   // const editorRef: MutableRefObject<Editor | null> = useRef(null)
   
   return (
      <Box {...rest}>
         <Editor
            apiKey={process.env.TINYMCE_API_KEY}
            onKeyUp={(e) => {
               // console.log(e.target.innerHTML)
            }}
            onEditorChange={(a, editor) => {
               console.log(a)
               setEditor(a)
            }}
            onInit={(evt, editor) => !!editorRef ? editorRef.current = editor : null}
            initialValue={defaultValue}
            init={{
               height,
               menubar: false,
               language: locale === 'fr' ? 'fr_FR' : undefined,
               plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount autoresize',
               ],
               toolbar: ['bold italic forecolor backcolor | image media | bullist numlist | removeformat'],
               content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
               fontsize_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px',
               autoresize_overflow_padding: 0,
               min_height: 110,
               // max_height: 500,
               // images_reuse_filename: true,
               images_upload_handler: gcs_image_upload_handler,
            }}
         />
      </Box>
   )
}
