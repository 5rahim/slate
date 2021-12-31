import { FcAudioFile } from '@react-icons/all-files/fc/FcAudioFile'
import { FcDocument } from '@react-icons/all-files/fc/FcDocument'
import { FcFile } from '@react-icons/all-files/fc/FcFile'
import { FcImageFile } from '@react-icons/all-files/fc/FcImageFile'
import { FcPackage } from '@react-icons/all-files/fc/FcPackage'
import { FcVideoFile } from '@react-icons/all-files/fc/FcVideoFile'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox/IconBox'
import { Flex, Link } from 'chalkui/dist/cjs/Components/Layout'
import { Badge } from 'chalkui/dist/cjs/Components/Layout/Badge'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import React from 'react'

interface FileListerProps {
   files: any
}

export const FileLister: React.FC<FileListerProps> = ({ files }) => {
   
   if(!files) return <></>
   
   if(typeof files === 'string')
      files = JSON.parse(files)
   
   
   return (
      <>
         {files?.map((file: any) => {
   
            let icon: any = null
   
            if (['jpeg', 'png', 'jpg', 'jpeg', 'webm', 'gif'].includes(file.ext)) {
               icon = FcImageFile
            } else if (['avi', 'mpe', 'mp4', 'mov', 'qt'].includes(file.ext)) {
               icon = FcVideoFile
            } else if (['mp3', 'wav'].includes(files.ext)) {
               icon = FcAudioFile
            } else if (['pdf', 'docx', 'doc', 'txt', 'page', 'pptx', 'ppt', 'pps', 'xls', 'xlsx'].includes(file.ext)) {
               icon = FcDocument
            } else if (['zip', 'rar' ,'7zp', 'page'].includes(file.ext)) {
               icon = FcPackage
            } else {
               icon = FcFile
            }
            
            return (
   
               <Flex
                  my="2"
                  key={file.name}
                  alignItems={["flex-start", "center", "center", "center", "center"]}
                  flexDirection={['column', 'row', 'row', 'row', 'row']}
                  position="relative"
               >
      
      
                  {icon && <Flex mr="3" position="relative">
                      <IconBox
                          p=".5rem"
                          size="md"
                          fontSize="xs"
                          colorScheme={"blue.500"}
                          variant="secondary"
                          as={icon}
                      />

                  </Flex>}
      
                  <Box>
                     <Flex gridGap=".5rem" flexDirection={['column', 'column', 'row', 'row', 'row']}>
                        <Link target="_blank" href={file.url}>{file.name ?? file.name ?? file.url.slice(-36)}</Link>
                        <Badge alignSelf="flex-start" pill colorScheme="green.600">{file.ext}</Badge>
                     </Flex>
                  </Box>
               </Flex>
            )
         })}
      </>
   )
   
}
