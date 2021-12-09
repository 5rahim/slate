import { FilePicker } from '@apideck/file-picker'
import '@apideck/file-picker/dist/styles.css'
import { useApideckVaultSession } from '@slate/lib/apideck/useApideckVaultSession'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Button } from 'chalkui/dist/cjs/React'
import { useEffect, useState } from 'react'
import { DropzoneOptions } from 'react-dropzone'

type DropzoneProps = DropzoneOptions & {
   onChange?: (files: File[]) => void,
}

export function CloudFilePicker({ onChange, ...rest }: DropzoneProps) {
   const [selectedFile, setSelectedFile] = useState<File>()
   const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false)
   const { session, createSession, isLoading, isSessionValid } = useApideckVaultSession()
   
   const handleSelect = (data: any) => {
      setSelectedFile(data)
   }
   
   useEffect(() => {
       console.log(selectedFile)
   }, [selectedFile])
   
   
   return (
      <>
         
         <Box mb="2">
            {isSessionValid
               ? ` Click a button below to open the File Picker or File Saver`
               : `First create a session and then you can pick or upload a file`}
         </Box>
         
         {isSessionValid
            ?
            ( <>
               <FilePicker
                  jwt={session.jwt}
                  consumerId={session.consumerId}
                  appId={session.applicationId}
                  trigger={
                     <Button
                        onClick={() => setIsPickerOpen(true)}
                        variant={selectedFile ? 'outline' : 'primary'}
                     >{selectedFile ? 'Pick new file' : 'Pick a file'}</Button>
                  }
                  onSelect={handleSelect}
                  open={isPickerOpen}
                  onClose={() => setIsPickerOpen(false)}
               />
            </> )
            : (
               <Button
                  onClick={createSession}
                  isLoading={isLoading}
                  variant="outline"
               >Upload file from cloud</Button>
            )}
      
      </>
   )
   
}
