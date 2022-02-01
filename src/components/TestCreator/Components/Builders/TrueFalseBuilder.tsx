import { FiCheckCircle } from '@react-icons/all-files/fi/FiCheckCircle'
import { FiCircle } from '@react-icons/all-files/fi/FiCircle'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import Icon from 'chalkui/dist/cjs/Components/Icon/Icon'
import { Divider } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Stack, VStack } from 'chalkui/dist/cjs/Components/Layout/Stack'
import { Radio } from 'chalkui/dist/cjs/Components/Radio/Radio'
import { RadioGroup } from 'chalkui/dist/cjs/Components/Radio/RadioGroup'
import { Text } from 'chalkui/dist/cjs/Components/Typography'
import React, { useCallback, useEffect, useState } from 'react'
import { useTestCreatorQuestion } from '../../Provider'

interface Choice {
   id: string,
   value: { text: string, image: string | null },
}

interface AnswerKey {
   id: string,
}

interface MultipleChoiceBuilderProps {
   // data: Test_Questions
   isEditing: boolean
}

const MultipleChoiceBuilder: React.FC<MultipleChoiceBuilderProps> = (props) => {
   const t = useTypeSafeTranslation()
   const { children, isEditing, ...rest } = props
   const { testQuestion, updateAnswerKeys } = useTestCreatorQuestion()
   const [answerKey, setAnswerKey] = useState<string>(testQuestion?.question?.content.answer_keys ?? 'true')
   
   useEffect(() => {
      setAnswerKey(testQuestion?.question?.content.answer_keys)
   }, [testQuestion])
   
   
   const handleChangeAnswerKeys = useCallback((id: string) => {
      setAnswerKey(id)
      updateAnswerKeys(id)
   }, [])
   
   
   if (isEditing) {
      return <>
         
         <Divider my="2" />
         
         <RadioGroup
            width="100%"
            colorScheme="green"
            size="lg"
            value={answerKey}
            onChange={handleChangeAnswerKeys}
         >
            <Stack direction="column">
               
               {['true', 'false'].map((value) => {
                  return (
                     <AlignedFlex
                        p="3"
                        gridGap=".6rem"
                        bgColor={answerKey === value ? '#ebf7ef' : 'transparent'}
                        _hover={answerKey !== value ? {
                           bgColor: 'gray.200',
                        } : {}}
                     >
                        <Radio bgColor="#fff" value={value} />
                        <Text>{t(`course:${value}`)}</Text>
                     </AlignedFlex>
                  )
               })}
            
            </Stack>
         </RadioGroup>
      
      
      </>
   }
   
   
   return <>
      <VStack>
         {['true', 'false'].map((value, index) => {
            const isAnswer = answerKey === value
            return (
               <AlignedFlex key={value} width="100%" bgColor="gray.100" p="2" gridGap=".6rem">
                  {isAnswer ? <Icon as={FiCheckCircle} fontSize="2xl" color="green.500" />
                     : <Icon as={FiCircle} fontSize="2xl" />}
                  <Box>
                     <Text>{t(`course:${value}`)}</Text>
                  </Box>
               </AlignedFlex>
            )
         })}
      </VStack>
   </>
   
}

export default MultipleChoiceBuilder
