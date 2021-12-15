import { BiTrash } from '@react-icons/all-files/bi/BiTrash'
import { FcAudioFile } from '@react-icons/all-files/fc/FcAudioFile'
import { FcDocument } from '@react-icons/all-files/fc/FcDocument'
import { FcFile } from '@react-icons/all-files/fc/FcFile'
import { FcImageFile } from '@react-icons/all-files/fc/FcImageFile'
import { FcPackage } from '@react-icons/all-files/fc/FcPackage'
import { FcVideoFile } from '@react-icons/all-files/fc/FcVideoFile'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { IconButton } from 'chalkui/dist/cjs/Components/Button/IconButton'
import { Input } from 'chalkui/dist/cjs/Components/Input'
import { Box, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Tooltip } from 'chalkui/dist/cjs/Components/Tooltip/Tooltip'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'

function humanSize(size: number, precision = 2): string {
   const i = Math.floor(Math.log(size) / Math.log(1024))
   return ( size / Math.pow(1024, i) ).toFixed(precision).toString() + ['bytes', 'Kb', 'Mb', 'Gb', 'Tb'][i]
}

type DropzoneProps = DropzoneOptions & {
   onChange?: (files: File[]) => void,
   inputProps?: any
}

/**
 * @example
 <form onSubmit={onFormSubmit}>
 <Dropzone disabled={isUploading} onChange={populateFiles} inputProps={{ ...fields.register('files') }} />
 {fields.errorMessage('files')}
 <Button isLoading={isUploading} type="submit">Save</Button>
 </form>
 * @param {any} inputProps
 * @param {((files: File[]) => void) | undefined} onChange
 * @param {Pick<Pick<React.HTMLProps<HTMLElement>, "multiple" | "onDragEnter" | "onDragOver" | "onDragLeave"> & {accept?: string | string[],
 *    minSize?: number, maxSize?: number, maxFiles?: number, preventDropOnDocument?: boolean, noClick?: boolean, noKeyboard?: boolean, noDrag?:
 *    boolean, noDragEventsBubbling?: boolean, disabled?: boolean, onDrop?: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[],
 *    event: DropEvent) => void, onDropAccepted?: <T extends File>(files: T[], event: DropEvent) => void, onDropRejected?: (fileRejections:
 *    FileRejection[], event: DropEvent) => void, getFilesFromEvent?: (event: DropEvent) => Promise<Array<File | DataTransferItem>>,
 *    onFileDialogCancel?: () => void, validator?: <T extends File>(file: T) => (FileError | FileError[] | null)} & {onChange?: (files: File[]) =>
 *    void, inputProps?: any}, "multiple" | "onDragEnter" | "onDragLeave" | "onDragOver" | "accept" | "minSize" | "maxSize" | "maxFiles" |
 *    "preventDropOnDocument" | "noClick" | "noKeyboard" | "noDrag" | "noDragEventsBubbling" | "disabled" | "onDrop" | "onDropAccepted" |
 *    "onDropRejected" | "getFilesFromEvent" | "onFileDialogCancel" | "validator">} rest
 * @returns {JSX.Element}
 * @constructor
 */
export function Dropzone({ inputProps, onChange, ...rest }: DropzoneProps) {
   const t = useTypeSafeTranslation()
   const cmf = useCMF()
   
   const [files, setFiles] = useState<File[]>([])
   
   const onDrop = useCallback(acceptedFiles => {
      onChange && onChange(acceptedFiles)
      setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
         preview: URL.createObjectURL(file),
      })))
   }, [])
   
   const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
      acceptedFiles,
   } = useDropzone({
      onDrop,
      ...rest,
      // accept: 'image/jpeg, image/png',
   })
   
   const baseStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      borderWidth: 2,
      borderRadius: 2,
      borderColor: '#cfcfcf',
      borderStyle: 'dashed',
      // backgroundColor: cmf('#fafafa', 'gray.700'),
      color: 'gray.800',
      transition: 'border .3s ease-in-out',
   }
   
   const activeStyle = {
      borderColor: 'messenger.500',
   }
   
   const acceptStyle = {
      borderColor: 'green.500',
   }
   
   const rejectStyle = {
      borderColor: 'red.500',
   }
   
   const style = useMemo(() => ( {
      ...baseStyle,
      ...( isDragActive ? activeStyle : {} ),
      ...( isDragAccept ? acceptStyle : {} ),
      ...( isDragReject ? rejectStyle : {} ),
   } ), [
      isDragActive,
      isDragReject,
      isDragAccept,
   ])
   
   const remove = (file: number) => {
      const newFiles = [...files]
      newFiles.splice(file, 1)
      setFiles(newFiles)
      onChange && onChange(newFiles)
   }
   
   const thumbs = files?.map((file: any, index) => {
      
      let Icon: any = null
      
      if (['image/jpeg', 'image/png', 'image/jpg', 'image/webm'].includes(file.type)) {
         Icon = FcImageFile
      } else if (file.type.includes('video')) {
         Icon = FcVideoFile
      } else if (file.type.includes('audio')) {
         Icon = FcAudioFile
      } else if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('txt') || file.type.includes('text')) {
         Icon = FcDocument
      } else if (file.type.includes('compressed') || file.type.includes('zip') || file.type.includes('archive')) {
         Icon = FcPackage
      } else {
         Icon = FcFile
      }
      
      return (
         
         
         <Tooltip label={file.name} aria-label={file.name} key={file.name}>
            
            <Flex
               position="relative"
               p="2"
               borderRadius="md"
               bgColor={cmf('#f0f5ff', 'gray.700')}
               width="8rem"
               overflow="hidden"
               flexDirection="column"
               alignItems="center"
            >
               {/*<img*/}
               {/*   src={file.preview}*/}
               {/*   alt={file.name}*/}
               {/*/>*/}
               
               {Icon && <Icon as={<Icon />} fontSize="3.5rem" />}
               
               <Text width="100%" whiteSpace="nowrap" fontSize=".85rem">{file.name}</Text>
               <Text mb="1" textAlign="center" fontWeight="bold" width="100%" whiteSpace="nowrap" fontSize=".85rem">{humanSize(file.size)}</Text>
               <IconButton
                  variant="secondary"
                  aria-label="Delete"
                  p=".15rem"
                  as={BiTrash}
                  size="xs"
                  colorScheme="red.500"
                  onClick={() => remove(index)}
               />
            
            </Flex>
         </Tooltip>
      )
   })
   
   // clean up
   useEffect(() => () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview))
   }, [files])
   
   return (
      <section>
         {/*// @ts-ignore*/}
         <Box mb="2" {...getRootProps({ style })}>
            <Input {...inputProps} {...getInputProps()} />
            <div>{t('Dropzone files')}</div>
         </Box>
         <Flex
            gridGap=".5rem"
            sx={{
               flexFlow: 'wrap',
            }}
         >
            {thumbs}
         </Flex>
      </section>
   )
}
