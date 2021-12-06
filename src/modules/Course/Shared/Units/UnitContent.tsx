import { BiEditAlt } from '@react-icons/all-files/bi/BiEditAlt'
import { BiEraser } from '@react-icons/all-files/bi/BiEraser'
import { Dropzone } from '@slate/components/Dropzone'
import { MenuCelledList, MenuCelledListItem } from '@slate/components/UI/MenuCelledList'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentUnit } from '@slate/hooks/useCurrentUnit'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useFormFileUpload } from '@slate/hooks/useFormFileUpload'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { Badge, Text } from 'chalkui/dist/cjs'
import { Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Box, Button, IconBox } from 'chalkui/dist/cjs/React'
import React from 'react'

export const UnitContent = () => {
   
   const unit = useCurrentUnit()
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   
   const {populateFiles, hasFiles, uploadFiles, isUploading} = useFormFileUpload("multiple")
   
   const { onFormSubmit, fields, formState } = useFormCreator({
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
   })
   
   return (
      <>
      
         <Box>
            
            <Flex
               flexDirection={['column', 'column', 'row', 'row', 'row']}
               gridGap="1rem"
               placeItems="flex-start"
            >
               <Flex
                  p={[3,3,4,4,4]}
                  width="100%"
                  border="2px solid"
                  borderColor={cmf("gray.200", 'gray.700')}
                  borderRadius="xl"
                  transition="all .15s linear"
                  flexDirection="column"
                  // boxShadow="sm"
                  _hover={{
                     boxShadow: 'md'
                  }}
               >
                  <Flex>
                     <Box mr="3">
                        <IconBox size="lg" fontSize="xl" colorScheme="brand.700" variant="secondary" as={BiEraser}/>
                     </Box>
                     <Box width="100%">
                        <Text fontSize="2xl" fontWeight="bold">{t('Assignments')}</Text>
                        <Box width="100%">
                           <Text>2 assignment(s) due this week</Text>
                        </Box>
                     </Box>
                  </Flex>
                  <Box>
                     <MenuCelledList mt="2" width="100%">
      
                        <MenuCelledListItem>
                           <Flex justifyContent="space-between">
                              <Text>Groundwater experiment</Text>
                              <Badge>Done</Badge>
                           </Flex>
                        </MenuCelledListItem>
                        <MenuCelledListItem>
                           Igneous rocks Excel sheet
                        </MenuCelledListItem>
   
                     </MenuCelledList>
                  </Box>
               </Flex>
               <Flex
                  p={[3,3,4,4,4]}
                  width="100%"
                  bgColor={cmf("gray.100", 'gray.700')}
                  borderRadius="xl"
               >
                  <Box mr="3">
                     <IconBox size="lg" fontSize="xl" colorScheme="brand.400" variant="secondary" as={BiEditAlt}/>
                  </Box>
                  <Box>
                     <Text fontSize="2xl" fontWeight="bold">{t('Quizzes')}</Text>
                     <Box>
                        <Text>No quiz due this week</Text>
                     </Box>
                  </Box>
               </Flex>
            </Flex>
   
   
            <form onSubmit={onFormSubmit}>
               <Dropzone disabled={isUploading} onChange={populateFiles} inputProps={{ ...fields.register('files') }} />
               {fields.errorMessage('files')}
               <Button isLoading={isUploading} type="submit">Save</Button>
            </form>
            
         </Box>
      
      </>
   )
   
}
