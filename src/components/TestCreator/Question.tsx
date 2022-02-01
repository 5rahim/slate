import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BiDotsHorizontal } from '@react-icons/all-files/bi/BiDotsHorizontal'
import { BiEdit } from '@react-icons/all-files/bi/BiEdit'
import { useTestCreatorQuestion } from '@slate/components/TestCreator/Provider'
import QuestionContent from '@slate/components/TestCreator/QuestionContent'
import { Test_Questions } from '@slate/generated/graphql'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { IconButton } from 'chalkui/dist/cjs/Components/Button/IconButton'
import { Icon } from 'chalkui/dist/cjs/Components/Icon/Icon'
import { Box, Divider, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { BoxProps } from 'chalkui/dist/cjs/Components/Layout/Box'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import dynamic from 'next/dynamic'
import React, { memo, useEffect } from 'react'

const QuestionEdit = dynamic(() => import('@slate/components/TestCreator/QuestionEdit'))

interface QuestionProps {
   index: number
   id: string
   data: Test_Questions
   onEdit?: any
}

const Question: React.FC<QuestionProps & BoxProps> = memo((props) => {
   const cmf = useCMF()
   const { data, id, index, children, onEdit, ...rest } = props
   const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure()
   
   const { setTestQuestion, updateSavedContent } = useTestCreatorQuestion()
   
   useEffect(() => {
      setTestQuestion(data)
      updateSavedContent(data.question?.content ?? {})
   }, [data])
   
   const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
   } = useSortable({
      id: id,
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
         
         {editIsOpen && <QuestionEdit
             isOpen={editIsOpen}
             onClose={editOnClose}
             index={index}
         />}
         
         <Box
            bgColor="#fff"
            position="relative"
            ref={setNodeRef}
            style={style}
            mb="3"
            zIndex="2"
            {...rest}
         >
            <Flex
               zIndex="1"
               width="100%"
               top="0"
               left="0"
               flexDirection="column"
               justifyContent="center"
               alignItems="center"
               color={cmf("#979797", 'gray.200')}
               cursor="move"
               {...attributes}
               {...listeners}
            >
               <Icon as={BiDotsHorizontal} fontSize="1.6rem" />
               <Icon as={BiDotsHorizontal} mt="-1.2rem" fontSize="1.6rem" />
            </Flex>
            
            <Box
               position="absolute"
               right="0"
               top="0"
            >
               <IconButton onClick={editOnOpen} aria-label="" as={BiEdit} p="1" size="sm" />
            </Box>
            
            <Box mt="3">
               <QuestionContent isEditing={false} index={index} />
            </Box>
         
         
         </Box>
         <Divider my="4" />
      </>
   )
   
})

export default Question
