import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CgTimer } from '@react-icons/all-files/cg/CgTimer'
import { RiDashboardLine } from '@react-icons/all-files/ri/RiDashboardLine'
import { RiDonutChartLine } from '@react-icons/all-files/ri/RiDonutChartLine'
import { QuestionCreation } from '@slate/components/TestCreator/Components/QuestionCreation'
import { TestCreatorQuestionProvider } from '@slate/components/TestCreator/Provider'
import Question from '@slate/components/TestCreator/Question'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { Test_Questions, Tests } from '@slate/generated/graphql'
import { getTestQuestionSubscription, useChangeTestQuestionOrder } from '@slate/graphql/schemas/gradebook_items/hooks'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { TestEditorActions, TestEditorSelectors } from '@slate/store/slices/testEditorSlice'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox'
import { Box, Flex, Stack, StackDivider } from 'chalkui/dist/cjs/Components/Layout'
import { Spinner } from 'chalkui/dist/cjs/Components/Spinner'
import { Stat, StatHelpText, StatNumber } from 'chalkui/dist/cjs/Components/Stat'
import { useToast } from 'chalkui/dist/cjs/Components/Toast/UseToast'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface TestCreatorProps {
   test: Tests
}

export const TestCreator: React.FC<TestCreatorProps> = (props) => {
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const dispatch = useDispatch()
   const { test } = props
   const [testQuestions, testQuestionsLoading, testQuestionsEmpty] = getTestQuestionSubscription(test?.id)
   // const [fetchTestQuestions, testQuestionsLoading, testQuestionsEmpty] = getLazyTestQuestions(test?.id)
   const [listedTestQuestions, setListedTestQuestions] = useState<Test_Questions[]>([])
   const [validQuestions, setValidQuestions] = useState<Test_Questions[]>([])
   const [updateTestQuestionOrder] = useChangeTestQuestionOrder()
   const currentTotalPoints = useSelector(TestEditorSelectors.getTestQuestionTotalPoints)
   const maxPoints = useSelector(TestEditorSelectors.getGradebookItem)?.max_points ?? 0
   const timeLimit = test.time_limit ?? 0
   const toast = useToast()
   
   useEffect(() => {
      setListedTestQuestions(testQuestions ?? [])
      dispatch(TestEditorActions.setTestQuestions(testQuestions ?? []))
      setValidQuestions(testQuestions?.filter((tq) => tq.question?.content?.status === 'valid') ?? [])
   }, [testQuestions])
   
   const handleSorting = useCallback(({ active, over }: DragEndEvent) => {
      if (active.id !== over?.id) {
         setListedTestQuestions((items) => {
            const oldIndex = items?.findIndex(item => item.id === active.id) ?? 0
            const newIndex = items?.findIndex(item => item.id === over?.id) ?? 0
            let n = arrayMove(( items as Test_Questions[] ), oldIndex as number, newIndex as number)
            let newArray: any[] = []
            n.forEach(val => newArray.push(Object.assign({}, val)))
            newArray.forEach((val, i) => {
               try {
                  newArray[i].order = i
               }
               catch (e) {
               }
            })
            // dispatch(TestEditorActions.setSelectedTestQuestion(null))
            updateTestQuestionOrder({
               objects: newArray?.map(({ __typename, question, ...rest }) => {
                  console.log(rest)
                  return rest
               }),
            })
            return newArray
         })
      }
   }, [])
   
   if(!testQuestions) return <Flex pt="4" justifyContent="center">
      <Spinner size="xl" />
   </Flex>
   
   return (
      <Box>
         
         <Box>
            <Stack
               direction={["column", "column", "column", "row", "row"]}
               divider={<StackDivider borderColor={cmf("gray.200", "gray.500")} />}
            >
               <Stat>
                  <AlignedFlex gridGap=".7rem">
                     <IconBox colorScheme={(maxPoints - currentTotalPoints) != 0 ? 'orange.500' : 'primary'} p="2" fontSize="3xl" as={RiDonutChartLine} />
                     <Box>
                        <StatNumber>{maxPoints - currentTotalPoints}</StatNumber>
                        <StatHelpText>{t('course:Point(s) left to assign')}</StatHelpText>
                     </Box>
                  </AlignedFlex>
               </Stat>
               <Stat>
                  <AlignedFlex gridGap=".7rem">
                     <IconBox colorScheme="primary" p="2" fontSize="3xl" as={RiDashboardLine} />
                     <Box>
                        <StatNumber>{testQuestions?.length ?? 0}</StatNumber>
                        <StatHelpText>{t('course:Question(s)')}</StatHelpText>
                     </Box>
                  </AlignedFlex>
               </Stat>
               <Stat>
                  <AlignedFlex gridGap=".7rem">
                     <IconBox colorScheme="primary" p="2" fontSize="3xl" as={CgTimer} />
                     <Box>
                        <StatNumber>{(Math.round((timeLimit / validQuestions?.length)*100)/100)}</StatNumber>
                        <StatHelpText>{t('course:minute(s) per question')}</StatHelpText>
                     </Box>
                  </AlignedFlex>
               </Stat>
            </Stack>
         </Box>
         
         <DndContext
            onDragEnd={handleSorting}
         >
            <SortableContext
               strategy={verticalListSortingStrategy}
               items={listedTestQuestions ? listedTestQuestions?.map((testQuestion) => testQuestion.id) : []}
            >
               {listedTestQuestions?.map((testQuestion, index) => {
                  return <Box key={testQuestion.id}>
                     <TestCreatorQuestionProvider>
                        <Question
                           index={index}
                           id={testQuestion.id}
                           data={testQuestion}
                        />
                     </TestCreatorQuestionProvider>
                  </Box>
               })}
            </SortableContext>
         </DndContext>
         
         <QuestionCreation test={test} />
      
      </Box>
   )
   
}

export default TestCreator
