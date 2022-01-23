import { BiX } from '@react-icons/all-files/bi/BiX'
import { FiImage } from '@react-icons/all-files/fi/FiImage'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { IconButton } from 'chalkui/dist/cjs/Components/Button/IconButton'
import Icon from 'chalkui/dist/cjs/Components/Icon/Icon'
import { Input } from 'chalkui/dist/cjs/Components/Input'
import { Box, Center } from 'chalkui/dist/cjs/Components/Layout'
import { Flex } from 'chalkui/dist/cjs/Components/Layout/Flex'
import { Spinner } from 'chalkui/dist/cjs/Components/Spinner'
import React, { ChangeEvent, memo, useCallback, useEffect, useState } from 'react'

// import Image from 'next/image'

interface QuestionEditableFieldProps {
   id: string
   defaultValue?: { text: string, image: string | null },
   onChange?: any
}

const QuestionEditableField: React.FC<QuestionEditableFieldProps> = memo((props) => {
   const cmf = useCMF()
   const { id, children, defaultValue, onChange, ...rest } = props
   const [text, setText] = useState<string>(defaultValue?.text ?? '')
   const [image, setImage] = useState<string | null>(defaultValue?.image ?? null)
   const [uploading, setUploading] = useState(false)
   
   useEffect(() => {
      onChange && onChange(text.length === 0 ? defaultValue : { text: text, image: image })
      
   }, [text, image])
   
   function handleOnBlur() {
      if (text.length === 0) {
         setText(defaultValue?.text ?? '')
      }
   }
   
   const uploadPhoto = useCallback(async (e: any) => {
      const file = e.target.files[0]
      const filename = encodeURIComponent(file.name)
      setUploading(true)
      const res = await fetch(`/api/gcs/upload?file=${filename}`)
      const { raw: { url, fields } } = await res.json()
      const formData = new FormData()
      
      Object.entries({ ...fields, file }).forEach(([key, value]) => {
         formData.append(key, value as string)
      })
      
      if (url) {
         
         try {
            const upload = await fetch(url, {
               method: 'POST',
               body: formData,
            })
            
         }
         catch (e) {
         
         }
         setImage(url + fields.key)
         setUploading(false)
      }
   }, [])
   
   return (
      <>
         <Box
            width="100%"
         >
            
            <AlignedFlex width="100%">
               
               <Input
                  onBlur={handleOnBlur}
                  variant="flushed"
                  value={text}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                  width="100%"
                  color={cmf('black', '#fff')}
                  fontWeight="600"
                  fontSize="1.05rem"
               />
               
               <Flex
                  borderRadius="md"
                  overflow="hidden"
               >
                  {!uploading && <label htmlFor={id}>
                      <Center
                          p="0"
                          w="9" h="9" cursor="pointer" _hover={{ bgColor: cmf('#e9e9e9', 'gray.500') }}
                          position="relative"
                      >
                          <Input
                              id={id}
                              position="absolute"
                              width="100%"
                              height="100%"
                              p="0"
                              zIndex="1"
                              visibility="hidden"
                              type="file"
                              accept="image/png, image/jpeg"
                              onChange={uploadPhoto}
                          />
                          <Icon as={FiImage} fontSize="2xl" />
                      </Center>
                  </label>}
                  {uploading && <Center
                      w="9" h="9" cursor="pointer" _hover={{ bgColor: cmf('#dedede', 'gray.500') }}
                      position="relative"
                  >
                      <Spinner size="sm" />
                  </Center>}
               </Flex>
            
            </AlignedFlex>
            
            {image && <AlignedFlex position="relative">
                <Box
                    borderRadius="md"
                    border="1px solid"
                    borderColor={cmf("#ddd", 'transparent')}
                    bgColor="#fff"
                    mt="3"
                    bgPosition="50% 50%"
                    bgSize="contain"
                    bgImage={`url("${image}")`}
                    width="130px"
                    bgRepeat="no-repeat"
                    height="130px"
                />
                <IconButton
                    position="absolute" top=".2rem" left="-.5rem" colorScheme="red.500" aria-label="" as={BiX} size="xs"
                    onClick={() => setImage(null)}
                />
               {/*<Image src={image} width="200px" height="auto" />*/}
            </AlignedFlex>}
         
         </Box>
      </>
   )
   
})

export default QuestionEditableField
