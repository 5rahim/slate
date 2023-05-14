import { RiAddCircleLine } from '@react-icons/all-files/ri/RiAddCircleLine'
import { RiCalendarEventLine } from '@react-icons/all-files/ri/RiCalendarEventLine'
import { RiCheckboxMultipleLine } from '@react-icons/all-files/ri/RiCheckboxMultipleLine'
import { RiDownload2Line } from '@react-icons/all-files/ri/RiDownload2Line'
import { RiHistoryLine } from '@react-icons/all-files/ri/RiHistoryLine'
import { RiMarkPenLine } from '@react-icons/all-files/ri/RiMarkPenLine'
import { RiSlideshowLine } from '@react-icons/all-files/ri/RiSlideshowLine'
import { RiTeamLine } from '@react-icons/all-files/ri/RiTeamLine'
import { Dropzone } from '@slate/components/Dropzone'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { FileLister } from '@slate/components/UI/FileLister'
import { RichTextContent } from '@slate/components/UI/RichTextContent'
import { CreateAssessmentSubmissionMutationVariables, Gradebook_Item_Submissions } from '@slate/generated/graphql'
import { useCreateAssessmentSubmission } from '@slate/graphql/schemas/gradebook_items/hooks'
import { useCurrentGroup } from '@slate/hooks/settings/useCurrentGroup'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentAssignment } from '@slate/hooks/useCurrentAssignment'
import { useCurrentUser } from '@slate/hooks/useCurrentUser'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useFormFileUpload } from '@slate/hooks/useFormFileUpload'
import { useGradebookItemHelpers } from '@slate/hooks/useGradebookItemHelpers'
import { useNameFormatter } from '@slate/hooks/useNameFormatter'
import { useRichTextEditor } from '@slate/hooks/useRichTextEditor'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { Utils } from '@slate/utils'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from 'chalkui/dist/cjs/Components/Accordion/Accordion'
import { Avatar } from 'chalkui/dist/cjs/Components/Avatar/Avatar'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { FormLabel } from 'chalkui/dist/cjs/Components/FormControl'
import Icon from 'chalkui/dist/cjs/Components/Icon/Icon'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox'
import { Divider, Stack, StackDivider } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Menu, MenuItem, MenuList, MenuPanel, MenuPanels } from 'chalkui/dist/cjs/Components/Menu'
import { Stat, StatHelpText, StatNumber } from 'chalkui/dist/cjs/Components/Stat'
import { Text } from 'chalkui/dist/cjs/Components/Typography'
import { useRouter } from 'next/router'
import React, { useState } from 'react'


export const AssignmentAttempts = () => {
   const t = useTypeSafeTranslation()
   const user = useCurrentUser()
   const assignment = useCurrentAssignment()
   const cmf = useCMF()
   const { formatDate, dateToUTC } = useDateFormatter()
   const cache = useStoreCache()
   const router = useRouter()
   const group = useCurrentGroup()
   const { formatFullName } = useNameFormatter()
   const {
      gbi_dueDays,
      gbi_dueDateColor,
      gbi_hasSubmittedAttempt,
      gbi_submittedAttemptCount,
      gbi_finalGrade,
      gbi_canSubmit,
      gbi_isAccommodated,
   } = useGradebookItemHelpers()
   
   
   const [wait, setWait] = useState(false)
   const { populateFiles, hasFiles, uploadFiles, isUploading } = useFormFileUpload("multiple")
   const { textEditor } = useRichTextEditor(null, false)
   
   const [createSubmission, isLoading] = useCreateAssessmentSubmission({
      onCompleted: () => {
         fields.reset()
         router.reload()
         cache.empty('assignment') // Empty current assignment
      },
   })
   
   const { onFormSubmit, fields, formState } = useFormCreator({
      schema: ({ z }) => z.object({
         content: z.any(),
      }),
      onSubmit: async data => {
         
         if (!assignment) return
         if (!assignment.gradebook_item) return
         if (!window.confirm('Are you sure you want to submit?')) return
         
         setWait(true)
         let insert = false
         
         const insert_data: Omit<CreateAssessmentSubmissionMutationVariables, "content"> & { content: any } = {
            student_id: user.id,
            group_id: gradebookItem?.submission_type === 'group' ? (group?.id ?? null) : null,
            gradebook_item_id: assignment.gradebook_item.id,
            content: {
               text: textEditor.getValue(),
            },
         }
         
         if (!hasFiles) {
            insert = true
            insert_data.content.files = null
         } else {
            const uploadRes = await uploadFiles()
            
            if (uploadRes) {
               insert_data.content.files = uploadRes
               insert = true
            }
         }
         
         if (
            insert
            && textEditor.isValid()
         ) {
            console.log(insert_data)
            createSubmission(insert_data)
         } else {
            setWait(false)
         }
         
      },
   })
   
   const gradebookItem = assignment?.gradebook_item
   const submissions: Gradebook_Item_Submissions[] = assignment?.gradebook_item?.submissions ?? []
   
   const canSubmit = (
         gbi_canSubmit(gradebookItem)
         && !Utils.Dates.dateHasPassed(gradebookItem?.available_until)
         // && gbi_
      )
      || gbi_isAccommodated(gradebookItem)
   
   if (!assignment) return <></>
   
   let attemptCount = 0
   
   return (
      <>
         <Box py="2" px="4" bgColor={cmf('gray.100', 'gray.700')} mt="4" borderRadius="md">
            <Stack
               direction={["column", "column", "column", "row", "row"]}
               divider={<StackDivider borderColor={cmf("gray.200", "gray.500")} />}
            >
               {gradebookItem?.available_until && <Stat>
                   <AlignedFlex gridGap=".7rem">
                       <IconBox colorScheme="primary" p="2" fontSize="3xl" as={RiCalendarEventLine} />
                       <Box>
                           <StatNumber color={gbi_dueDateColor(gradebookItem, gbi_hasSubmittedAttempt(gradebookItem))}>
                              {gbi_dueDays(gradebookItem)}
                           </StatNumber>
                           <StatHelpText>{t('course:days remaining')}</StatHelpText>
                       </Box>
                   </AlignedFlex>
               </Stat>}
      
               {assignment.type === 'online' && (
                  <Stat>
                     <AlignedFlex gridGap=".7rem">
                        <IconBox colorScheme="primary" p="2" fontSize="3xl" as={RiCheckboxMultipleLine} />
                        <Box>
                           <StatNumber>{gbi_submittedAttemptCount(gradebookItem)}/{gradebookItem?.attempts_allowed}</StatNumber>
                           <StatHelpText>{t('course:attempts completed')}</StatHelpText>
                        </Box>
                     </AlignedFlex>
                  </Stat>
               )}
      
               <Stat>
                  <AlignedFlex gridGap=".7rem">
                     <IconBox colorScheme="primary" p="2" fontSize="3xl" as={RiSlideshowLine} />
                     <Box>
                        <StatNumber>{gbi_finalGrade(gradebookItem)}</StatNumber>
                        <StatHelpText>{t('course:Final grade')}</StatHelpText>
                     </Box>
                  </AlignedFlex>
               </Stat>
            </Stack>
         </Box>
         
         {<Box fontSize="lg" mt="2">
            <Text><strong>{t('course:Opened on')}</strong>: {formatDate(gradebookItem?.available_from ?? dateToUTC(gradebookItem?.created_at), 'long with hours')}
            </Text>
            {gradebookItem?.available_until &&
            <Text><strong>{t('course:Due date')}</strong>: {formatDate(gradebookItem?.available_until, 'long with hours')}</Text>}
         </Box>}
         
         {gradebookItem?.submission_type === 'group' && (
            <>
               <Divider my="2" />
               <AlignedFlex fontSize="lg">
                  <IconBox colorScheme={cmf('primary', 'white')} p="1" size="sm" fontSize="sm" as={RiTeamLine} />
                  <Text>{t('course:This is a group assignment')}</Text>
               </AlignedFlex>
            </>
         )}
         
         <Divider my="2" />
         
         {assignment?.description && <Box mt="3">
             <AlignedFlex>
                 <Icon fontSize="2xl" as={RiMarkPenLine} />
                 <Text fontSize="lg" fontWeight="bold">{t('Instructions')}:</Text>
             </AlignedFlex>
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
             <AlignedFlex>
                 <Icon fontSize="xl" as={RiDownload2Line} />
                 <Text fontSize="lg" fontWeight="bold">{t('Attachments')}:</Text>
             </AlignedFlex>
             <FileLister files={assignment?.files} />
         </Box>}
         
         {
            assignment.type === 'online' ? (
               <>
                  <Divider my="4" />
                  
                  <Box
                     sx={{
                        opacity: wait ? '.5' : '1',
                        pointerEvents: wait ? 'none' : 'auto',
                     }}
                  >
                     <Menu defaultIndex={gbi_hasSubmittedAttempt(gradebookItem) ? 0 : 1} colorScheme={cmf('messenger.500', 'white')} variant="pill">
                        
                        {
                           ( gbi_isAccommodated(gradebookItem) || (gbi_hasSubmittedAttempt(gradebookItem) && gbi_canSubmit(gradebookItem) &&
                              !Utils.Dates.dateHasPassed(gradebookItem?.available_until)) ) && (
                              <MenuList>
                                 <MenuItem><Icon as={RiHistoryLine} mr="1" />{t('course:Previous submissions')}</MenuItem>
                                 {( gbi_canSubmit(gradebookItem) || gbi_isAccommodated(gradebookItem) ) &&
                                 <MenuItem><Icon as={RiAddCircleLine} mr="1" />{t('course:Submit a new attempt')}</MenuItem>}
                              </MenuList>
                           )
                        }
                        
                        <MenuPanels>
                           
                           <MenuPanel mt="4" p="0">
                              <Accordion allowToggle>
                                 
                                 {submissions?.map((submission) => {
                                    const content = submission.content ?? { text: null, files: [] }
                                    const files = content.files
                                    const text = content.text
                                    console.log(submission)
                                    attemptCount++
                                    return (
                                       <AccordionItem key={submission.id}>
                                          <h2>
                                             <AccordionButton>
                                                <Box flex="1" textAlign="left">
                                                   {t('Attempt')}: {formatDate(dateToUTC(submission.created_at), 'short with hours')}
                                                </Box>
                                                <AccordionIcon />
                                             </AccordionButton>
                                          </h2>
                                          <AccordionPanel pb={4} pt="4">
   
                                             {gradebookItem?.submission_type === 'group' && (
                                                <Box>
                                                   <AlignedFlex>
                                                      <Avatar size="xs" src={submission?.student?.image as string} />
                                                      <Text>{formatFullName(submission?.student)}</Text>
                                                   </AlignedFlex>
                                                   <Divider my="2"/>
                                                </Box>
                                             )}
                                             
                                             <Box mb="4" bgColor={cmf("gray.100", "gray.800")} px="4" py="2" borderRadius="md">
                                                
                                                {text && (
                                                   <Box mb="4">
                                                      <RichTextContent content={text} />
                                                   </Box>
                                                )}
                                                
                                                <FileLister files={files} />
                                             </Box>
                                          </AccordionPanel>
                                       </AccordionItem>
                                    )
                                 })}
                              </Accordion>
                           </MenuPanel>
                           
                           <MenuPanel>
                              
                              {/*Cannot submit: no more attempts*/}
                              {/*Cannot submit: due date has passed, no attempts submitted*/}
                              {/*{(!gbi_hasSubmittedAttempt(gradebookItem) && Utils.Dates.dateHasPassed(gradebookItem?.available_until)) &&*/}
                              {/*<Box mt="4">*/}
                              {/*    <Text fontSize="lg" textAlign="center" color="red.500">{t('course:You cannot submit attempt')}</Text>*/}
                              {/*</Box>}*/}
                              
                              {!canSubmit && !gbi_hasSubmittedAttempt(gradebookItem) &&
                              <Box mt="4">
                                  <Text fontSize="lg" textAlign="center" color="red.500">{t('course:You cannot submit attempt')}</Text>
                              </Box>}
                              
                              {( canSubmit ) &&
                              <Box>

                                  <form onSubmit={onFormSubmit}>
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
                                      <Box mt="2">
                                          <Button type="submit" colorScheme="primary" isLoading={wait || isLoading}>{t('Submit')}</Button>
                                      </Box>
                                  </form>

                              </Box>}
                           
                           </MenuPanel>
                        </MenuPanels>
                     </Menu>
                  
                  </Box>
               </>
            ) : (
               <></>
            )
         }
      
      </>
   )
   
}

export default AssignmentAttempts
