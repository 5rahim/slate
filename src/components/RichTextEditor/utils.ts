import { useRef } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'


export const createRichTextEditorRef = () => {
   return useRef<TinyMCEEditor | null>(null)
}
