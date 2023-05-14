import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { BiAddToQueue } from '@react-icons/all-files/bi/BiAddToQueue'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { FormControl } from 'chalkui/dist/cjs/Components/FormControl/FormControl'
import { FormLabel } from 'chalkui/dist/cjs/Components/FormControl/FormLabel'
import { Center, Divider } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { VStack } from 'chalkui/dist/cjs/Components/Layout/Stack'
import { Switch } from 'chalkui/dist/cjs/Components/Switch'
import { Textarea } from 'chalkui/dist/cjs/Components/Textarea/Textarea'
import { Text } from 'chalkui/dist/cjs/Components/Typography'
import React, { useCallback, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useTestCreatorQuestion } from '../../Provider'

interface Choice {
   id: string,
   value: { text: string, image: string | null },
}

interface AnswerKey {
   id: string,
}

interface FillBuilderProps {
   // data: Test_Questions
   isEditing: boolean
}

const FillBuilder: React.FC<FillBuilderProps> = (props) => {
   const t = useTypeSafeTranslation()
   const { children, isEditing, ...rest } = props
   const { testQuestion, updateChoices, updateAnswerKeys, updateStatus, updatePartialCredit } = useTestCreatorQuestion()
   const [choices, setChoices] = useState<Choice[]>(testQuestion?.question?.content.choices ?? [])
   const [answerKeys, setAnswerKeys] = useState<AnswerKey[]>(testQuestion?.question?.content.answer_keys ?? [])
   const [status, setStatus] = useState(testQuestion?.question?.content.status ?? false)
   const [partialCredit, setPartialCredit] = useState(testQuestion?.question?.content.partial_credit ?? true)
   
   useEffect(() => {
      setChoices(testQuestion?.question?.content.choices)
      setAnswerKeys(testQuestion?.question?.content.answer_keys)
      setStatus(testQuestion?.question?.content.status)
      setPartialCredit(testQuestion?.question?.content.partial_credit)
   }, [testQuestion])
   
   function handleCreateChoice() {
      const data = {
         id: uuid(),
         value: { text: `${t('course:Choice')} ` + ( ( choices?.length ?? 0 ) + 1 ), image: null },
      }
      const arr = ( choices?.length > 0 ) ? [...choices, data] : [data]
      setChoices(arr)
   }
   
   function handleEditChoice(id: string, newValue: any) {
      try {
         let arr = [...choices]
         const i = arr.findIndex(( obj => obj.id === id ))
         arr[i] = { id, value: { text: newValue.text, image: newValue.image } }
         setChoices(arr)
      }
      catch (e) {
      }
   }
   
   function handleDeleteChoice(id: string) {
      try {
         let arr = [...choices]
         setChoices(arr.filter((choice) => choice.id !== id))
         
         if (answerKeys?.filter((a) => a.id === id)?.length > 0) {
            handleChangeAnswerKeys(answerKeys.filter((a) => a.id !== id).map((a) => a.id))
            // handleDeleteAnswerKeys()
         }
      }
      catch (e) {
      }
   }
   
   const handleSorting = useCallback(({ active, over }: DragEndEvent) => {
      if (active.id !== over?.id) {
         setChoices((items) => {
            const oldIndex = items?.findIndex(item => item.id === active.id) ?? 0
            const newIndex = items?.findIndex(item => item.id === over?.id) ?? 0
            let n = arrayMove(( items as Choice[] ), oldIndex as number, newIndex as number)
            let newArray: any[] = []
            n.forEach(val => newArray.push(Object.assign({}, val)))
            newArray.forEach((val, i) => {
               try {
                  newArray[i].order = i
               }
               catch (e) {
               }
            })
            console.log(newArray)
            return newArray
         })
      }
   }, [choices])
   
   const handleChangeAnswerKeys = useCallback((arr: string[]) => {
      const newArr = arr.map((a) => ( { id: a } ))
      setAnswerKeys(newArr)
      updateAnswerKeys(newArr)
   }, [])
   
   const handleChangePartialCredit = useCallback((value: boolean) => {
      setPartialCredit(value)
      updatePartialCredit(value)
   }, [])
   
   useEffect(() => {
      updateChoices(choices)
   }, [choices])
   
   // useEffect(() => {
   //    updateStatus((choices?.length >= 2 && answerKeys?.length > 0) ? 'valid' : 'invalid')
   // }, [choices, answerKeys])
   
   useEffect(() => {
      updateStatus(( testQuestion?.question?.content.choices?.length >= 2 && testQuestion?.question?.content.answer_keys?.length > 0 )
         ? 'valid'
         : 'invalid')
   }, [testQuestion])
   
   if (isEditing) {
      return <>
         
         <Divider my="2" />
         
         <Box fontStyle="italic" color="gray.500">
            {( !choices || choices?.length < 2 ) && <Text>{t('course:You need to add at least two choices')}</Text>}
            {( !answerKeys || answerKeys?.length === 0 ) && <Text>{t('course:You need to choose an answer')}</Text>}
         </Box>
         
         <Textarea />
         
         <Button
            aria-label=""
            leftIcon={<BiAddToQueue />}
            colorScheme="brand.100"
            p="2"
            size="sm"
            onClick={handleCreateChoice}
         >
            {t('course:Add a choice')}
         </Button>
         
         <Divider my="2" />
         
         <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor={'partialCredit'} mb="0">
               {t(`course:Allow partial credit`)}
            </FormLabel>
            <Switch
               id={'partialCredit'}
               isChecked={partialCredit}
               onChange={(e) => handleChangePartialCredit(e.target.checked)}
            />
         </FormControl>
      
      </>
   }
   
   
   return <>
      <VStack>
         {choices?.map((choice, index) => {
            const isAnswer = answerKeys?.filter((a) => a.id === choice.id).length > 0
            return (
               <AlignedFlex key={index} width="100%" bgColor="gray.100" p="2" gridGap=".6rem">
                  {/*<Radio bgColor="#fff" value={choice.id} />*/}
                  {/*<Icon as={BiRadioCircle} fontSize="3xl" />*/}
                  <Center
                     w="6"
                     h="6"
                     fontSize="md"
                     fontWeight="bold"
                     border="2px solid #000"
                     borderRadius="50%"
                     borderColor={isAnswer ? 'green.500' : 'black'}
                     color={isAnswer ? 'green.500' : 'black'}
                  >{index + 1}</Center>
                  <Box>
                     <Text>{choice.value.text}</Text>
                     {choice.value.image && <Box>
                         <Box
                             borderRadius="md"
                             border="1px solid"
                             borderColor={'#ddd'}
                             bgColor="#fff"
                             mt="2"
                             bgPosition="50% 50%"
                             bgSize="contain"
                             bgImage={`url("${choice.value.image}")`}
                             width="130px"
                             bgRepeat="no-repeat"
                             height="130px"
                         />
                     </Box>}
                  </Box>
               </AlignedFlex>
            )
         })}
      </VStack>
   </>
   
}

export default FillBuilder
