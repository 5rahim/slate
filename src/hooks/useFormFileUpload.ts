import path from 'path'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

/**
 * @example
const {populateFiles, hasFiles, uploadFiles, isUploading} = useFormFileUpload("multiple")
 
 schema: ({ z }) => z.object({
         files: z.any(),
      }),
 onSubmit: async data => {
   
   fields.clearErrors()
   
   if(!hasFiles) {
      fields.setError('files', FormErrors.RequiredFile)
   } else {
      const uploadRes = await uploadFiles()
      if(!uploadRes) {
         console.log('Error')
      }
   }
   
},
 * @param {"single" | "multiple"} singleOrMultiple
 */
export const useFormFileUpload = (singleOrMultiple: "single" | "multiple") => {
   
   const [files, setFiles] = useState<File[]>([])
   const [isUploading, setIsUploading] = useState(false)
   const [uploaded, setIsUploaded] = useState(false)
   
   return {
      
      /**
       * boolean
       */
      hasFiles: files.length > 0,
      
      isUploading,
      
      uploaded,
      
      /**
       * @param files
       */
      populateFiles: (files: any) => {
         setFiles(files)
      },
      
      uploadFiles: async () => {
         
         let results: any = singleOrMultiple === 'multiple' ? [] : null
         let success = false
         
         if (files.length > 0) {
            
            for (let i = 0; i < files.length; i++) {
               
               const file = files[i]
               
               const filename = file.name.replace(path.extname(file.name), '') + ` [Slate ${uuid().slice(-8)}]` + path.extname(file.name)
               // const filename = encodeURIComponent(file.name)
               const res = await fetch(`/api/gcs/upload?file=${filename}`)
               const { raw: { url, fields } } = await res.json()
               const formData = new FormData()
               
               Object.entries({ ...fields, file }).forEach(([key, value]) => {
                  formData.append(key, value as string)
               })
               
               
               if (url) {
                  
                  setIsUploading(true)
                  
                  try {
                     
                     const upload = await fetch(url, {
                        method: 'POST',
                        body: formData,
                     })
                     
                     
                     if (upload.ok) {
                        setIsUploaded(true)
                        setIsUploading(false)
                        success = true
                     } else {
                        // console.error('Upload failed.')
                     }
                  }
                  catch (e) {
                  
                  }
                  
                  if (singleOrMultiple === 'multiple') {
                     results.push({
                        name: file.name,
                        url: url + fields.key,
                        ext: path.extname(file.name).replace('.', '')
                     })
                  } else {
                     results = {
                        name: file.name,
                        url: url + fields.key,
                        ext: path.extname(file.name).replace('.', '')
                     }
                  }
                  
               }
               
            }
            
         }
         
         if (success) {
            return results
         } else {
            return null
         }
         
      },
      
   }
   
}
