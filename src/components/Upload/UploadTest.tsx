export function UploadTest() {
   const uploadPhoto = async (e: any) => {
      const file = e.target.files[0]
      const filename = encodeURIComponent(file.name)
      const res = await fetch(`/api/gcs-file-upload?file=${filename}`)
      const { raw: { url, fields } } = await res.json()
      const formData = new FormData()
      
      console.log({ file })
      
      Object.entries({ ...fields, file }).forEach(([key, value]) => {
         formData.append(key, value as string)
      })
   
      console.log({formData})
      
      if (url) {
         
         try {
            const upload = await fetch(url, {
               method: 'POST',
               body: formData,
            })
            
            
            if (upload.ok) {
               console.log('Uploaded successfully!')
            } else {
               console.error('Upload failed.')
            }
         }
         catch (e) {
         
         }
         console.log(url + fields.key)
      }
   }
   
   return (
      <>
         <p>Upload a .png or .jpg image (max 1MB).</p>
         <input
            onChange={uploadPhoto}
            type="file"
            accept="image/png, image/jpeg"
         />
      </>
   )
}
