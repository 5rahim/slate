import { BiReset } from '@react-icons/all-files/bi/BiReset'
import { BiTrash } from '@react-icons/all-files/bi/BiTrash'
import { BiX } from '@react-icons/all-files/bi/BiX'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { testEditor_useHelpers } from '@slate/components/TestCreator/hooks'
import QuestionContent from '@slate/components/TestCreator/QuestionContent'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { useDeleteQuestion, useRemoveTestQuestion } from '@slate/graphql/schemas/gradebook_items/hooks'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { IconButton } from 'chalkui/dist/cjs/Components/Button/IconButton'
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from 'chalkui/dist/cjs/Components/Dropdown/Dropdown'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Modal, ModalBody, ModalContent, ModalOverlay } from 'chalkui/dist/cjs/Components/Modal/Modal'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useTestCreatorQuestion } from './Provider'

interface QuestionEditProps {
   isOpen: boolean,
   onClose: any,
   // data: Test_Questions,
   index: number
}

const QuestionEdit: React.FC<QuestionEditProps> = (props) => {
   const t = useTypeSafeTranslation()
   const dispatch = useDispatch()
   const { children, isOpen, onClose, index, ...rest } = props
   const { testQuestion, isTouched } = useTestCreatorQuestion()
   const { renderType } = testEditor_useHelpers(testQuestion?.id)
   
   const [deleteQuestion] = useDeleteQuestion({
      onCompleted: () => {
      
      },
   })
   const [removeTestQuestion] = useRemoveTestQuestion({
      onCompleted: () => {
      
      },
   })
   
   function handleDeleteQuestion() {
      onClose()
      deleteQuestion({ test_question_id: testQuestion?.id, question_id: testQuestion?.question?.id })
   }
   
   function handleRemoveTestQuestion() {
      onClose()
      removeTestQuestion({ id: testQuestion?.id })
   }
   
   function handleClose() {
      if (isTouched && !confirm('Are you sure? You have not saved the changes you made')) return
      onClose()
   }
   
   return (
      <>
         <Modal
            size="4xl"
            isOpen={isOpen}
            onClose={handleClose}
            // closeOnOverlayClick={false}
         >
            <ModalOverlay />
            <ModalContent>
               <IconButton
                  onClick={handleClose}
                  borderRadius="50%"
                  position="absolute"
                  as={BiX}
                  colorScheme="red.500"
                  variant="primary"
                  aria-label=""
                  right="-1.2rem"
                  top="-1.2rem"
                  size="md"
                  opacity=".5"
                  cursor="pointer"
                  _hover={{
                     opacity: "1"
                  }}
               />
               <AlignedFlex p="6" pb="0" width="100%">
                  <Box width="100%">
                     {renderType(testQuestion?.question?.type)}
                  </Box>
                  
                  <ComponentVisibility.InstructorOnly>
                     {isOpen && ( <>
                        
                        <Dropdown>
                           <DropdownButton
                              as={IconButton}
                              icon={<BiTrash />}
                              colorScheme="red.500" variant="secondary" p="1" size="sm"
                           >
                           </DropdownButton>
                           <DropdownList zIndex="4">
                              <DropdownItem fontSize="md" onClick={() => handleRemoveTestQuestion()} icon={<BiReset />}>
                                 {t('course:Remove from this quiz')}
                              </DropdownItem>
                              <DropdownItem fontSize="md" onClick={() => handleDeleteQuestion()} icon={<BiTrash />}>
                                 {t('course:Delete from library')}
                              </DropdownItem>
                           </DropdownList>
                        </Dropdown>
                     </> )}
                  </ComponentVisibility.InstructorOnly>
               </AlignedFlex>
               <ModalBody pb="5">
                  
                  <QuestionContent isEditing={isOpen} index={index} />
               
               </ModalBody>
               
               {/*<ModalFooter gridGap={5}>*/}
               {/*   <Button*/}
               {/*      colorScheme="brand.100"*/}
               {/*      width="100%"*/}
               {/*      type="submit"*/}
               {/*   >*/}
               {/*      {t('Save')}*/}
               {/*   </Button>*/}
               {/*   <Button colorScheme="brand.800" onClick={onClose} isFullWidth>*/}
               {/*      {t('Cancel')}*/}
               {/*   </Button>*/}
               {/*</ModalFooter>*/}
            </ModalContent>
         </Modal>
      </>
   )
   
}

export default QuestionEdit
