import QuestionDescription from '@slate/components/TestCreator/Components/QuestionDescription'
import QuestionPoints from '@slate/components/TestCreator/Components/QuestionPoints'
import { useTestCreatorQuestion } from '@slate/components/TestCreator/Provider'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { useUpdateQuestionContent } from '@slate/graphql/schemas/gradebook_items/hooks'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { AppSelectors } from '@slate/store/slices/appSlice'
import { Questions } from '@slate/types/TestQuestions'
import { Alert, AlertIcon } from 'chalkui/dist/cjs/Components/Alert/Alert'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Text } from 'chalkui/dist/cjs/Components/Typography'
import dynamic from 'next/dynamic'
import React from 'react'
import { useSelector } from 'react-redux'

const MultipleChoiceBuilder = dynamic(() => import('@slate/components/TestCreator/Components/Builders/MultipleChoiceBuilder'))
const CheckboxBuilder = dynamic(() => import('@slate/components/TestCreator/Components/Builders/CheckboxBuilder'))
const TrueFalseBuilder = dynamic(() => import('@slate/components/TestCreator/Components/Builders/TrueFalseBuilder'))
const MatchingBuilder = dynamic(() => import('@slate/components/TestCreator/Components/Builders/MatchingBuilder'))
const FillBuilder = dynamic(() => import('@slate/components/TestCreator/Components/Builders/FillBuilder'))

interface QuestionContentProps {
   index: number
   isEditing: boolean
}

const QuestionContent: React.FC<QuestionContentProps> = (props) => {
   const t = useTypeSafeTranslation()
   const { children, index, isEditing, ...rest } = props
   const { testQuestion, currentContent, savedContent, isTouched, status } = useTestCreatorQuestion()
   const question = testQuestion?.question
   const mutationLoading = useSelector(AppSelectors.mutationIsLoading)
   
   const [updateQuestionContent] = useUpdateQuestionContent({
      onCompleted: () => {
      },
   })
   
   function handleSaveChanges() {
      console.log(currentContent, savedContent)
      updateQuestionContent({ id: question?.id, content: currentContent, answer_keys: [] })
   }
   
   let Builder: any
   
   switch (question?.type) {
      case Questions.Multiple:
         Builder = MultipleChoiceBuilder
         break
      case Questions.TrueFalse:
         Builder = TrueFalseBuilder
         break
      case Questions.Checkboxes:
         Builder = CheckboxBuilder
         break
      case Questions.Matching:
         Builder = MatchingBuilder
         break
      case Questions.Fill:
         Builder = FillBuilder
         break
   }
   
   
   return (
      <>
         <Box>
            
            {status === 'invalid' && <Box mb="2">
                <Alert status="warning" variant="secondary">
                    <AlertIcon />
                   {t('course:This question will not be included until your make some changes')}
                </Alert>
            </Box>}
            
            
            <AlignedFlex justifyContent="space-between" mb="3">
               
               <Text fontSize="xl" fontWeight="bold">Question {Number(index) + 1}</Text>
               
               <QuestionPoints isEditing={isEditing} />
            
            </AlignedFlex>
            
            <Box mb="3">
               <QuestionDescription isEditing={isEditing} />
            </Box>
            
            {Builder ? <Builder isEditing={isEditing} /> : <></>}
            
            {isEditing && ( <AlignedFlex mt="4" width="100%" justifyContent="flex-end">
               <Button
                  disabled={!isTouched}
                  isLoading={mutationLoading}
                  colorScheme="primary"
                  onClick={handleSaveChanges}
               >
                  {t('Save')}
               </Button>
               {/*<Button disabled={!questionTouched} onClick={handleCancelChanges} colorScheme="red.500" variant="secondary">{t('Cancel')}</Button>*/}
            </AlignedFlex> )}
         
         </Box>
      </>
   )
   
}

export default QuestionContent
