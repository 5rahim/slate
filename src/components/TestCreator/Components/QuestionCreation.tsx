import { BiBracket } from '@react-icons/all-files/bi/BiBracket'
import { BiCheckDouble } from '@react-icons/all-files/bi/BiCheckDouble'
import { BiMessageAltDetail } from '@react-icons/all-files/bi/BiMessageAltDetail'
import { BiMessageCheck } from '@react-icons/all-files/bi/BiMessageCheck'
import { RiAddBoxLine } from '@react-icons/all-files/ri/RiAddBoxLine'
import { RiCheckboxLine } from '@react-icons/all-files/ri/RiCheckboxLine'
import { RiDownloadCloud2Line } from '@react-icons/all-files/ri/RiDownloadCloud2Line'
import { RiRecordCircleLine } from '@react-icons/all-files/ri/RiRecordCircleLine'
import { Tests } from '@slate/generated/graphql'
import { useCreateQuestion } from '@slate/graphql/schemas/gradebook_items/hooks'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Questions } from '@slate/types/TestQuestions'
import { ButtonGroup } from 'chalkui/dist/cjs/Components/Button/ButtonGroup'
import { IconButton } from 'chalkui/dist/cjs/Components/Button/IconButton'
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from 'chalkui/dist/cjs/Components/Dropdown/Dropdown'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Tooltip } from 'chalkui/dist/cjs/Components/Tooltip'
import React from 'react'
import { v4 as uuid } from 'uuid'


export const QuestionCreation = (props: { test: Tests }) => {
   const { test } = props
   const t = useTypeSafeTranslation()
   const cmf = useCMF()
   const course = useCurrentCourse()
   const [createQuestion, isLoading] = useCreateQuestion()
   
   function handleCreateQuestion(type: string) {
      let content: any = {
         description: `<p>Question</p>`,
         points: 0,
         answer_keys: [],
      }
      switch (type) {
         case Questions.Multiple:
            content = {
               ...content,
               choices: [],
               status: 'invalid'
            }
            break
         case Questions.TrueFalse:
            content = {
               ...content,
               answer_keys: 'true',
               status: 'valid'
            }
            break
         case Questions.Checkboxes:
            content = {
               ...content,
               choices: [],
               partial_credit: true,
               status: 'invalid'
            }
            break
         case Questions.Matching:
            content = {
               ...content,
               choices: [],
               additional_choices: [],
               status: 'invalid'
            }
            break
         default:
            break
      }
      createQuestion({
         answer_keys: [],
         content: {
            ...content,
         },
         course_id: course?.id,
         type: type,
         order: 999,
         question_id: uuid(),
         test_id: test?.id,
      })
   }
   
   if (!test?.id) return <></>
   
   return (
      <>
         
         <Box position="relative" textAlign="center">
            <Box
               _before={{
                  content: '""',
                  width: '100%',
                  height: '5px',
                  backgroundColor: cmf('#f3f3f3', 'gray.600'),
                  display: 'block',
                  position: 'absolute',
                  transform: 'translateY(-50%)',
                  top: '50%',
               }}
            >
               <ButtonGroup size="md" fontSize="2xl" isAttached colorScheme={cmf('gray.200', 'gray.600')}>
                  <Tooltip label={t("course:Add a question")}>
                     {/*<IconButton aria-label='Add to friends' icon={<RiAddBoxLine />} />*/}
                     <Dropdown>
                        <DropdownButton
                           as={IconButton}
                           icon={<RiAddBoxLine />}
                        >
                           {t('Add')}
                        </DropdownButton>
                        <DropdownList zIndex="4">
                           <DropdownItem onClick={() => handleCreateQuestion(Questions.Multiple)} icon={<RiRecordCircleLine />}>
                              {t('course:Multiple choice')}
                           </DropdownItem>
                           <DropdownItem onClick={() => handleCreateQuestion(Questions.TrueFalse)} icon={<RiRecordCircleLine />}>
                              {t('course:True/False')}
                           </DropdownItem>
                           <DropdownItem onClick={() => handleCreateQuestion(Questions.Checkboxes)} icon={<RiCheckboxLine />}>
                              {t('course:Checkboxes')}
                           </DropdownItem>
                           <DropdownItem onClick={() => handleCreateQuestion(Questions.Matching)} icon={<BiCheckDouble />}>
                              {t('course:Matching questions')}
                           </DropdownItem>
                           <DropdownItem onClick={() => handleCreateQuestion(Questions.Fill)} icon={<BiBracket />}>
                              {t('course:Fill in the blanks')}
                           </DropdownItem>
                           <DropdownItem onClick={() => handleCreateQuestion(Questions.ShortAnswer)} icon={<BiMessageCheck />}>
                              {t('course:Short answer')}
                           </DropdownItem>
                           <DropdownItem onClick={() => handleCreateQuestion(Questions.Essay)} icon={<BiMessageAltDetail />}>
                              {t('course:Essay')}
                           </DropdownItem>
                        </DropdownList>
                     </Dropdown>
                  </Tooltip>
                  <Tooltip label={t("course:Import a question")}>
                     <IconButton aria-label="Add to friends" icon={<RiDownloadCloud2Line />} />
                  </Tooltip>
               </ButtonGroup>
            </Box>
         </Box>
      
      </>
   )
   
}
