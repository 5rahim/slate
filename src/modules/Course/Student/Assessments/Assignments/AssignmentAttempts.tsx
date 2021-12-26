import { Dropzone } from '@slate/components/Dropzone'
import { RichTextContent } from '@slate/components/UI/RichTextContent'
import { useCreateAssignment } from '@slate/graphql/schemas/gradebook_items/hooks'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentAssignment } from '@slate/hooks/useCurrentAssignment'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useFormFileUpload } from '@slate/hooks/useFormFileUpload'
import { useGradebookItemHelpers } from '@slate/hooks/useGradebookItemHelpers'
import { useRichTextEditor } from '@slate/hooks/useRichTextEditor'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { Utils } from '@slate/utils'
import { FormLabel } from 'chalkui/dist/cjs/Components/FormControl'
import { Flex, Link, Stack, StackDivider } from 'chalkui/dist/cjs/Components/Layout'
import { Badge } from 'chalkui/dist/cjs/Components/Layout/Badge'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Menu, MenuItem, MenuList, MenuPanel, MenuPanels } from 'chalkui/dist/cjs/Components/Menu'
import { Stat, StatHelpText, StatNumber } from 'chalkui/dist/cjs/Components/Stat'
import { Text } from 'chalkui/dist/cjs/Components/Typography'
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

export const AssignmentAttempts = () => {
   const t = useTypeSafeTranslation()
   const assignment = useCurrentAssignment()
   const cmf = useCMF()
   const { formatDate } = useDateFormatter()
   const {
      gradebookItem_dueDays,
      gradebookItem_dueDateColor,
      gradebookItem_hasSubmittedAttempt,
      gradebookItem_submittedAttemptCount,
      gradebookItem_finalGrade,
      gradebookItem_canSubmit,
      gradebookItem_isAccommodated,
   } = useGradebookItemHelpers()
   
   
   const [wait, setWait] = useState(false)
   const { populateFiles, hasFiles, uploadFiles, isUploading } = useFormFileUpload("multiple")
   const { textEditor } = useRichTextEditor()
   
   const [createAssignment, isLoading] = useCreateAssignment({
      onCompleted: () => {
         fields.reset()
      },
   })
   
   const { onFormSubmit, fields, formState } = useFormCreator({
      schema: ({ z }) => z.object({
         name: z.string().min(4, FormErrors.RequiredField),
         content: z.any(),
      }),
      onSubmit: async data => {
         
         setWait(true)
         let insert = false
         
         const gradebook_item_id = uuid()
         const assignment_id = uuid()
         
         const insert_data: any = {}
         
         if (!hasFiles) {
            insert = true
         } else {
            const uploadRes = await uploadFiles()
            
            if (uploadRes) {
               insert_data['files'] = JSON.stringify(uploadRes)
               insert = true
            }
         }
         
         if (
            insert
            && textEditor.isValid()
         ) {
            console.log(insert_data)
            createAssignment(insert_data)
         } else {
            setWait(false)
         }
         
      },
   })
   
   const canSubmit = (
         gradebookItem_canSubmit(assignment?.gradebook_item)
         && !Utils.Dates.dateHasPassed(assignment?.gradebook_item?.available_until)
      )
      || gradebookItem_isAccommodated(assignment?.gradebook_item)
   
   return (
      <>
         <Stack
            mt="2"
            direction={["column", "column", "column", "row", "row"]}
            divider={<StackDivider borderColor={cmf("gray.200", "gray.500")} />}
         >
            <Stat>
               <StatNumber color={gradebookItem_dueDateColor(assignment?.gradebook_item, gradebookItem_hasSubmittedAttempt(assignment?.gradebook_item))}>
                  {gradebookItem_dueDays(assignment?.gradebook_item)}
               </StatNumber>
               <StatHelpText>{t('course:days remaining')}</StatHelpText>
            </Stat>
            <Stat>
               <StatNumber>{assignment?.gradebook_item?.submissions?.length}/{assignment?.gradebook_item?.attempts_allowed}</StatNumber>
               <StatHelpText>{t('course:attempts completed')}</StatHelpText>
            </Stat>
            <Stat>
               <StatNumber>{gradebookItem_finalGrade(assignment?.gradebook_item)}</StatNumber>
               <StatHelpText>{t('course:Final grade')}</StatHelpText>
            </Stat>
         </Stack>
         
         <Box bgColor={cmf("gray.100", "gray.700")} p="2">
            <Text fontSize="lg">{t('course:Due date')}: {formatDate(assignment?.gradebook_item?.available_until, 'long with hours')}</Text>
         </Box>
         
         {assignment?.description && <Box mt="3">
             <Text fontWeight="bold">{t('Instructions')}:</Text>
             <Box
                 mt="1"
                 border="1px solid"
                 borderColor={cmf('gray.200', 'gray.700')}
                 p="2"
             >
                 <Box>
                     <RichTextContent content={assignment?.description} />
                 </Box>
             </Box>
         </Box>}
         {assignment?.files && <Box mt="3">
             <Text fontWeight="bold">{t('Attachments')}:</Text>
            {assignment?.files && ( JSON.parse(assignment.files) as any[] )?.map((file: any) => {
               return <Flex
                  bgColor={cmf('gray.100', 'gray.700')}
                  key={file.name}
                  gridGap=".5rem"
                  flexDirection={['column', 'column', 'row', 'row', 'row']}
                  p="2"
               >
                  <Link target="_blank" href={file.url}>{file.name ?? file.name ?? file.url.slice(-36)}</Link>
                  <Badge alignSelf="flex-start" pill colorScheme="green.600">{file.ext}</Badge>
               </Flex>
            })}
         </Box>}
         
         <Box mt="4">
            <Menu colorScheme={cmf('black', 'white')}>
               <MenuList>
                  <MenuItem>Submit</MenuItem>
                  <MenuItem>Previous submissions</MenuItem>
               </MenuList>
               
               
               <MenuPanels>
                  <MenuPanel>
                     
                     {/*Cannot submit: no more attempts*/}
                     {/*Cannot submit: due date has passed, no attempts submitted*/}
                     {/*{(!gradebookItem_hasSubmittedAttempt(assignment?.gradebook_item) && Utils.Dates.dateHasPassed(assignment?.gradebook_item?.available_until)) &&*/}
                     {/*<Box mt="4">*/}
                     {/*    <Text fontSize="lg" textAlign="center" color="red.500">{t('course:You cannot submit attempt')}</Text>*/}
                     {/*</Box>}*/}
                     
                     {!canSubmit &&
                     <Box mt="4">
                         <Text fontSize="lg" textAlign="center" color="red.500">{t('course:You cannot submit attempt')}</Text>
                     </Box>}
                     
                     {( canSubmit ) &&
                     <Box>

                         <Box mb="5">
                            {textEditor.render({ title: 'Submission text', height: 200 })}
                         </Box>

                         <FormLabel mb="2">{t('Attachments')}</FormLabel>
                         <Dropzone
                             multiple={true}
                             disabled={isUploading}
                             onChange={populateFiles}
                             inputProps={{ ...fields.register('content') }}
                         />
                        {fields.errorMessage('content')}

                     </Box>}
                  
                  </MenuPanel>
                  <MenuPanel>
                     <p>two!</p>
                  </MenuPanel>
               </MenuPanels>
            </Menu>
         
         </Box>
      </>
   )
   
}

export default AssignmentAttempts
