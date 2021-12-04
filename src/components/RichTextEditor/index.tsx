import { useLocale } from '@slate/hooks/useLocale'
import { Editor } from '@tinymce/tinymce-react'
import { BoxProps } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/React'
import { MutableRefObject } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'

interface RichTextEditorProps {
   editorRef?: MutableRefObject<TinyMCEEditor | null>
   defaultValue?: string
}

async function gcs_image_upload_handler(blobInfo: any, success: any, failure: any, progress: any) {
   
   const file = blobInfo.blob()
   const res = await fetch(`/api/gcs-file-upload?file=${blobInfo.filename()}`)
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
            console.log('Uploaded successfully!')
         } else {
            failure()
            console.error('Upload failed.')
         }
      }
      catch (e) {
      
      }
      console.log(url + fields.key)
   }
   
}


export function RichTextEditor({ defaultValue, editorRef, ...rest }: RichTextEditorProps & BoxProps) {
   
   const locale = useLocale()
   
   // const editorRef: MutableRefObject<Editor | null> = useRef(null)
   
   return (
      <Box {...rest}>
         <Editor
            apiKey={process.env.TINYMCE_API_KEY}
            // onEditorChange={(a, editor) => setEditor(editor)}
            onInit={(evt, editor) => !!editorRef ? editorRef.current = editor : null}
            initialValue={defaultValue}
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
                  'alignright alignjustify | image | bullist numlist outdent indent | ' +
                  'removeformat | help',
               content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
               fontsize_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px',
               // images_upload_url: '/api/gcs-file-upload?file=' + uuid(),
               // images_reuse_filename: true,
               images_upload_handler: gcs_image_upload_handler,
            }}
         />
      </Box>
   )
}
