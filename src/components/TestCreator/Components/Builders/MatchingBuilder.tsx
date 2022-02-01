import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BiDotsVertical } from '@react-icons/all-files/bi/BiDotsVertical'
import { BiImage } from '@react-icons/all-files/bi/BiImage'
import { BiRepost } from '@react-icons/all-files/bi/BiRepost'
import { BiShuffle } from '@react-icons/all-files/bi/BiShuffle'
import { BiTrash } from '@react-icons/all-files/bi/BiTrash'
import { IoMdCloseCircleOutline } from '@react-icons/all-files/io/IoMdCloseCircleOutline'
import QuestionEditableField from '@slate/components/TestCreator/Components/QuestionEditableField'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { IconButton } from 'chalkui/dist/cjs/Components/Button/IconButton'
import { Icon } from 'chalkui/dist/cjs/Components/Icon/Icon'
import { Center, Divider, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Stack, VStack } from 'chalkui/dist/cjs/Components/Layout/Stack'
import { Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from 'chalkui/dist/cjs/Components/Popover/Popover'
import { Text } from 'chalkui/dist/cjs/Components/Typography'
import React, { useCallback, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useTestCreatorQuestion } from '../../Provider'

interface Choice {
   id: string,
   prompt: { text: string, image: string | null },
   answer: { text: string, image: string | null },
   reused_answer_id?: string
}

interface AdditionalChoice {
   id: string,
   value: { text: string, image: string | null },
}

interface AnswerKey {
   id: string,
}

interface MatchingBuilderProps {
   // data: Test_Questions
   isEditing: boolean
}

const MatchingBuilder: React.FC<MatchingBuilderProps> = (props) => {
   const t = useTypeSafeTranslation()
   const { children, isEditing, ...rest } = props
   const { testQuestion, updateChoices, updateAnswerKeys, updateStatus, updateAdditionalChoices } = useTestCreatorQuestion()
   const [choices, setChoices] = useState<Choice[]>(testQuestion?.question?.content.choices ?? [])
   const [additionalChoices, setAdditionalChoices] = useState<AdditionalChoice[]>(testQuestion?.question?.content.additional_choices ?? [])
   const [answerKeys, setAnswerKeys] = useState<AnswerKey[]>(testQuestion?.question?.content.answer_keys ?? [])
   const [status, setStatus] = useState(testQuestion?.question?.content.status ?? false)
   
   useEffect(() => {
      setChoices(testQuestion?.question?.content.choices)
      setAdditionalChoices(testQuestion?.question?.content.additional_choices)
      setAnswerKeys(testQuestion?.question?.content.answer_keys)
      setStatus(testQuestion?.question?.content.status)
   }, [testQuestion])
   
   function handleEditAdditionalChoice(id: string, newValue: any) {
      try {
         let arr = [...additionalChoices]
         const i = arr.findIndex(( obj => obj.id === id ))
         arr[i] = { id, value: { text: newValue.text, image: newValue.image } }
         setAdditionalChoices(arr)
      }
      catch (e) {
      }
   }
   
   function handleDeleteAdditionalChoice(id: string) {
      try {
         let arr = [...additionalChoices]
         setAdditionalChoices(arr.filter((choice) => choice.id !== id))
         
      }
      catch (e) {
      }
   }
   
   function handleCreateAdditionalChoice() {
      const data = {
         id: uuid(),
         value: { text: `${t('course:Additional choice')} ` + ( ( additionalChoices?.length ?? 0 ) + 1 ), image: null },
      }
      const arr = ( additionalChoices?.length > 0 ) ? [...additionalChoices, data] : [data]
      setAdditionalChoices(arr)
   }
   
   function handleCreateChoice() {
      const data = {
         id: uuid(),
         prompt: { text: `${t('course:Choice')} ` + ( ( choices?.length ?? 0 ) + 1 ), image: null },
         answer: { text: `${t('course:Answer')} ` + ( ( choices?.length ?? 0 ) + 1 ), image: null },
      }
      const arr = ( choices?.length > 0 ) ? [...choices, data] : [data]
      setChoices(arr)
   }
   
   function handleEditChoice(id: string, type: string, newValue: any) {
      try {
         console.log(newValue)
         let arr: Choice[] = [...choices]
         const i = arr.findIndex(( obj => obj.id === id ))
         // @ts-ignore
         arr[i] = {
            id, [type === 'prompt' ? 'answer' : 'prompt']: arr[i][type === 'prompt' ? 'answer' : 'prompt'],
            [type]: {
               text: newValue.text, image: newValue.image,
            },
            reused_answer_id: arr[i].reused_answer_id ?? undefined
         }
         setChoices(arr)
      }
      catch (e) {
      }
   }
   
   function handleReuseAnswer(id: string, answerId: string) {
      try {
         let arr: Choice[] = [...choices]
         const i = arr.findIndex(( obj => obj.id === id ))
         arr[i] = {
            id,
            prompt: arr[i].prompt,
            answer: arr[i].answer,
            reused_answer_id: answerId,
         }
         setChoices(arr)
      }
      catch (e) {
         console.log(e)
      }
   }
   
   function handleRestoreAnswer(id: string) {
      try {
         let arr: Choice[] = [...choices]
         const i = arr.findIndex(( obj => obj.id === id ))
         // @ts-ignore
         arr[i] = {
            id,
            prompt: arr[i].prompt,
            answer: arr[i].answer,
            reused_answer_id: undefined,
         }
         setChoices(arr)
      }
      catch (e) {
         console.log(e)
      }
   }
   
   function handleDeleteChoice(id: string) {
      try {
         let arr = [...choices]
         setChoices(arr.filter((choice) => choice.id !== id))
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
   
   useEffect(() => {
      updateChoices(choices)
   }, [choices])
   
   useEffect(() => {
      updateAdditionalChoices(additionalChoices)
   }, [additionalChoices])
   
   
   useEffect(() => {
      updateStatus(( testQuestion?.question?.content.choices?.length >= 2 ) ? 'valid' : 'invalid')
   }, [testQuestion])
   
   if (isEditing) {
      return <>
         
         
         <Divider my="2" />
         
         <Box fontStyle="italic" color="gray.500">
            {( !choices || choices?.length < 2 ) && <Text>{t('course:You need to add at least two choices')}</Text>}
         </Box>
         
         <AlignedFlex my="2">
            <Icon as={BiShuffle} fontSize="xl" />
            <Text fontSize="lg">{t('course:All the answers will be shuffled')}</Text>
         </AlignedFlex>
         
         <Flex fontWeight="bold" justifyContent="space-around" bgColor="gray.100" py="2">
            <Text width="100%" px="4">{t('course:Prompts')}</Text>
            <Text width="100%" px="4">{t('course:Answers')}</Text>
         </Flex>
         
         <Stack direction="column">
            
            <DndContext
               onDragEnd={handleSorting}
            >
               <SortableContext strategy={verticalListSortingStrategy} items={choices ? choices?.map((choice) => choice.id) : []}>
                  {choices?.map((choice, index) => {
                     return (
                        <Box
                           key={choice.id}
                        >
                           <ChoiceItem
                              choices={choices}
                              choice={choice}
                              restoreAnswer={handleRestoreAnswer}
                              reuseAnswer={handleReuseAnswer}
                              handleEditChoice={handleEditChoice}
                              handleDeleteChoice={handleDeleteChoice}
                           />
                        </Box>
                     )
                  })}
               </SortableContext>
            </DndContext>
         </Stack>
         
         <Button
            mt="2"
            variant="link"
            aria-label=""
            colorScheme="primary"
            p="2"
            onClick={handleCreateChoice}
         >
            {t('course:Add a pair')}
         </Button>
         
         <Divider my="2" />
         
         <Flex fontWeight="bold" justifyContent="space-around" bgColor="gray.100" py="2">
            <Text width="100%" />
            <Text width="100%" px="2">Additional answers</Text>
         </Flex>
         
         {additionalChoices?.map((choice, index) => {
            return (
               <Box
                  key={choice.id}
               >
                  <AdditionalChoiceItem
                     choice={choice}
                     handleEditChoice={handleEditAdditionalChoice}
                     handleDeleteChoice={handleDeleteAdditionalChoice}
                  />
               </Box>
            )
         })}
         
         <Button
            mt="2"
            variant="link"
            aria-label=""
            colorScheme="primary"
            p="2"
            // size="sm"
            onClick={handleCreateAdditionalChoice}
         >
            {t('course:Add an answer')}
         </Button>
      
      
      </>
   }
   
   
   return <>
      <VStack>
         {choices?.map((choice, index) => {
            return (
               <Flex key={choice.id} w="100%" gridGap="2">
                  <AlignedFlex width="100%" bgColor="gray.100" p="2" gridGap=".6rem">
                     <Center
                        w="6"
                        h="6"
                        fontSize="md"
                        fontWeight="bold"
                        border="2px solid #000"
                        borderRadius="50%"
                        borderColor={'black'}
                        color={'black'}
                     >{index + 1}</Center>
                     <Box>
                        <Text>{choice.prompt.text}</Text>
                        {choice.prompt.image && <Box>
                            <Box
                                borderRadius="md"
                                border="1px solid"
                                borderColor={'#ddd'}
                                bgColor="#fff"
                                mt="2"
                                bgPosition="50% 50%"
                                bgSize="contain"
                                bgImage={`url("${choice.prompt.image}")`}
                                width="130px"
                                bgRepeat="no-repeat"
                                height="130px"
                            />
                        </Box>}
                     </Box>
                  </AlignedFlex>
                  
                  <AlignedFlex width="100%" bgColor="gray.100" p="2" gridGap=".6rem">
                     {!choice.reused_answer_id && <Box>
                         <Text>{choice.answer.text}</Text>
                        {choice.answer.image && <Box>
                            <Box
                                borderRadius="md"
                                border="1px solid"
                                borderColor={'#ddd'}
                                bgColor="#fff"
                                mt="2"
                                bgPosition="50% 50%"
                                bgSize="contain"
                                bgImage={`url("${choice.answer.image}")`}
                                width="130px"
                                bgRepeat="no-repeat"
                                height="130px"
                            />
                        </Box>}
                     </Box>}
                     
                     {choice.reused_answer_id && (
                        <Flex
                           fontStyle="italic"
                           alignItems="center"
                           width="100%"
                        >
                           <Icon as={BiRepost} fontSize="2xl" mr="2" />
                           <Text>{t('course:Reused')}: {choices?.filter((c) => c.id === choice.reused_answer_id)[0].answer?.text}</Text>
                           {choices?.filter((c) => c.id === choice.reused_answer_id)[0].answer?.image && <Icon as={BiImage} fontSize="2xl" mx="2" />}
                        </Flex>
                     )}
                  
                  </AlignedFlex>
               </Flex>
            )
         })}
         {additionalChoices?.map((choice, index) => {
            return (
               <Flex key={choice.id} w="100%" gridGap="2">
                  <AlignedFlex width="100%" p="2" gridGap=".6rem">
                  
                  </AlignedFlex>
                  
                  <AlignedFlex width="100%" bgColor="gray.100" p="2" gridGap=".6rem">
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
               </Flex>
            )
         })}
      </VStack>
   </>
   
}

export default MatchingBuilder


function ChoiceItem(
   { choices, choice, reuseAnswer, restoreAnswer, handleEditChoice, handleDeleteChoice }:
      { choices: Choice[], reuseAnswer: any, choice: Choice, restoreAnswer: any, handleEditChoice: any, handleDeleteChoice: any }) {
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
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
      <>
         
         <Box
            display="flex"
            gridGap=".35rem"
            width="100%"
            ref={setNodeRef}
            style={style}
            p="2"
            pb="0"
            bgColor={'#fff'}
         >
            <Flex
               color={cmf("#979797", 'gray.200')}
               height="100%"
               alignSelf="center"
               cursor="move"
               position="relative"
               {...attributes}
               {...listeners}
            >
               <Icon as={BiDotsVertical} fontSize="1.6rem" />
               <Icon as={BiDotsVertical} ml="-1.2rem" fontSize="1.6rem" />
            </Flex>
            
            <QuestionEditableField
               id={choice.id + 'prompt'}
               defaultValue={choice.prompt}
               onChange={(v: any) => handleEditChoice(choice.id, 'prompt', v)}
            />
            
            <Divider mx="3" ml="2rem" orientation="vertical" height="45px" />
            
            {!choice.reused_answer_id && <QuestionEditableField
                id={choice.id + 'answer'}
                defaultValue={choice.answer}
                onChange={(v: any) => handleEditChoice(choice.id, 'answer', v)}
            />}
            
            {choice.reused_answer_id && (
               <Flex
                  fontStyle="italic"
                  alignItems="center"
                  width="100%"
                  bgColor="gray.200"
               >
                  <Icon as={BiRepost} fontSize="2xl" mx="2" />
                  <Text>{t('course:Reused')}: {choices?.filter((c) => c.id === choice.reused_answer_id)[0].answer?.text}</Text>
                  {choices?.filter((c) => c.id === choice.reused_answer_id)[0].answer?.image && <Icon as={BiImage} fontSize="2xl" mx="2" />}
               </Flex>
            )}
            
            
            {choice.reused_answer_id && (
               <IconButton
                  mt="1"
                  variant="ghost"
                  aria-label=""
                  size="sm"
                  p="1"
                  as={IoMdCloseCircleOutline}
                  onClick={() => restoreAnswer(choice.id)}
               />
            )}
            
            {!choice.reused_answer_id && <Box
                position="relative"
            >
                <Popover placement="top-start">
                    <PopoverTrigger>
                        <IconButton
                            mt="1"
                            variant="ghost"
                            aria-label=""
                            size="sm"
                            p="1"
                            as={BiRepost}
                           // onClick={() => handleDeleteChoice(choice.id)}
                        />
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverCloseButton />
                        <PopoverHeader>Reuse an answer</PopoverHeader>
                        <PopoverBody>
                            <Box w="250px" />
                           {choices?.filter((c) => ( c.id !== choice.id ) && !c.reused_answer_id).map((target, index) => {
                              return (
                                 <Box
                                    key={target.id}
                                    p="2"
                                    w="250px"
                                    bgColor="gray.200"
                                    mb="2"
                                    cursor="pointer"
                                    _hover={{
                                       bgColor: 'gray.300',
                                    }}
                                    onClick={() => reuseAnswer(choice.id, target.id)}
                                 >
                                    {target?.answer?.text}
                                 </Box>
                              )
                           })}
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>}
            
            <IconButton
               mt="1"
               variant="ghost"
               aria-label=""
               size="sm"
               p="1"
               as={BiTrash}
               onClick={() => handleDeleteChoice(choice.id)}
            />
         </Box>
      </>
   )
   
}


function AdditionalChoiceItem({ choice, handleEditChoice, handleDeleteChoice }
                                 : { choice: AdditionalChoice, handleEditChoice: any, handleDeleteChoice: any }) {
   
   return (
      <>
         
         <Box
            display="flex"
            gridGap=".35rem"
            width="100%"
            p="2"
            pb="0"
            bgColor={'#fff'}
         >
            <Box width="100%" mr="2rem" />
            <QuestionEditableField
               id={choice.id + 'answer'}
               defaultValue={choice.value}
               onChange={(v: any) => handleEditChoice(choice.id, v)}
            />
            <IconButton
               mt="1"
               variant="ghost"
               aria-label=""
               size="sm"
               p="1"
               as={BiTrash}
               onClick={() => handleDeleteChoice(choice.id)}
            />
         </Box>
      </>
   )
   
}
