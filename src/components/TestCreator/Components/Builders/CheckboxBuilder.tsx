import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BiAddToQueue } from '@react-icons/all-files/bi/BiAddToQueue'
import { BiDotsVertical } from '@react-icons/all-files/bi/BiDotsVertical'
import { BiTrash } from '@react-icons/all-files/bi/BiTrash'
import QuestionEditableField from '@slate/components/TestCreator/Components/QuestionEditableField'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { CheckboxGroup } from 'chalkui/dist/cjs'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { IconButton } from 'chalkui/dist/cjs/Components/Button/IconButton'
import { Checkbox } from 'chalkui/dist/cjs/Components/Checkbox'
import { FormControl } from 'chalkui/dist/cjs/Components/FormControl/FormControl'
import { FormLabel } from 'chalkui/dist/cjs/Components/FormControl/FormLabel'
import { Icon } from 'chalkui/dist/cjs/Components/Icon/Icon'
import { Center, Divider, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Stack, VStack } from 'chalkui/dist/cjs/Components/Layout/Stack'
import { Switch } from 'chalkui/dist/cjs/Components/Switch'
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

interface CheckboxBuilderProps {
   // data: Test_Questions
   isEditing: boolean
}

const CheckboxBuilder: React.FC<CheckboxBuilderProps> = (props) => {
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
         value: { text: `${t('course:Choice')} ` + ( (choices?.length ?? 0) + 1 ), image: null },
      }
      const arr = (choices?.length > 0) ? [...choices, data] : [data]
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
         
         if(answerKeys?.filter((a) => a.id === id)?.length > 0) {
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
      const newArr = arr.map((a) => ({ id: a }))
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
      updateStatus((testQuestion?.question?.content.choices?.length >= 2 && testQuestion?.question?.content.answer_keys?.length > 0) ? 'valid' : 'invalid')
   }, [testQuestion])
   
   if (isEditing) {
      return <>
         
         <Divider my="2" />
         
         <Box fontStyle="italic" color="gray.500">
            {(!choices || choices?.length < 2) && <Text>{t('course:You need to add at least two choices')}</Text>}
            {(!answerKeys || answerKeys?.length === 0) && <Text>{t('course:You need to choose an answer')}</Text>}
         </Box>
         
         <CheckboxGroup
            // width="100%"
            colorScheme="green"
            size="lg"
            value={answerKeys?.length > 0 ? [...answerKeys?.map((a) => a.id)] : []}
            onChange={handleChangeAnswerKeys}
         >
            <Stack direction="column">
               
               <DndContext
                  onDragEnd={handleSorting}
               >
                  <SortableContext strategy={verticalListSortingStrategy} items={choices ? choices?.map((choice) => choice.id) : []}>
                     {choices?.map((choice, index) => {
                        const isAnswer = answerKeys?.filter((a) => a.id === choice.id).length > 0
                        return (
                           <Box
                              key={choice.id}
                           >
                              <ChoiceItem
                                 isAnswer={isAnswer}
                                 choice={choice}
                                 handleEditChoice={handleEditChoice}
                                 handleDeleteChoice={handleDeleteChoice}
                              />
                           </Box>
                        )
                     })}
                  </SortableContext>
               </DndContext>
            </Stack>
         </CheckboxGroup>
         
         <Divider my="2" />
         
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
   
         <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor={'partialCredit'} mb='0'>
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
                  >{index+1}</Center>
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

export default CheckboxBuilder


function ChoiceItem({ choice, isAnswer, handleEditChoice, handleDeleteChoice }: { choice: Choice, isAnswer: boolean, handleEditChoice: any, handleDeleteChoice: any }) {
   const cmf = useCMF()
   const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
   } = useSortable({
      id: choice.id,
      transition: {
         duration: 150, // milliseconds
         easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
   })
   
   const style = {
      transform: CSS.Transform.toString(transform ? {
         x: 0,
         y: transform.y,
         scaleX: transform.scaleX,
         scaleY: 1,
      } : transform),
      transition,
   }
   
   return (
      <Box
         display="flex"
         alignItems="center"
         gridGap=".35rem"
         width="100%"
         ref={setNodeRef}
         style={style}
         // bgColor="transparent"
         pr="2"
         bgColor={isAnswer ? '#ebf7ef' : '#fff'}
         _hover={ !isAnswer ? {
            bgColor: '#e8e8e8',
         } : {}}
      >
         <Flex
            // mr="-.5rem"
            color={cmf("#979797", 'gray.200')}
            height="100%"
            alignSelf="center"
            cursor="move"
            {...attributes}
            {...listeners}
         >
            <Icon as={BiDotsVertical} fontSize="1.6rem" />
            <Icon as={BiDotsVertical} ml="-1.2rem" fontSize="1.6rem" />
         </Flex>
         
         <Checkbox bgColor="#fff" value={choice.id} />
         <QuestionEditableField
            id={choice.id}
            defaultValue={choice.value}
            onChange={(v: any) => handleEditChoice(choice.id, v)}
         />
         <IconButton
            aria-label=""
            size="sm"
            p="1"
            as={BiTrash}
            onClick={() => handleDeleteChoice(choice.id)}
         />
      </Box>
   )
   
}
