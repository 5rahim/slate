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
 * @returns {{hasFiles: boolean, uploadFiles: () => Promise<string[] | string | null>, uploaded: boolean, populateFiles: (files: any) => void,
 *    isUploading: boolean}}
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
         
         let results: string[] | string | null = singleOrMultiple === 'multiple' ? [] : null
         let success = false
         
         if (files.length > 0) {
            
            for (let i = 0; i < files.length; i++) {
               
               const file = files[i]
               
               const filename = uuid()
               // const filename = encodeURIComponent(file.name)
               const res = await fetch(`/api/gcs-file-upload?file=${filename}`)
               const { raw: { url, fields } } = await res.json()
               const formData = new FormData()
               
               console.log({ file })
               
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
                        success = false
                     } else {
                        console.error('Upload failed.')
                     }
                  }
                  catch (e) {
                  
                  }
                  
                  if (singleOrMultiple === 'multiple') {
                     ( results as string[] ).push(url + fields.key)
                  } else {
                     results = url + fields.key
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
