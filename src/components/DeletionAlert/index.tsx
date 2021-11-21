import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { AppSelectors } from '@slate/store/slices/appSlice'
import { AlertDialogCloseButton, AlertDialogHeader, Text } from 'chalkui/dist/cjs'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import {
   AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Button, Flex, IconBox,
} from 'chalkui/dist/cjs/React'
import React from 'react'
import { BiTrash } from 'react-icons/bi'
import { useSelector } from 'react-redux'

interface DeletionAlertProps {
   onClose: any
   isOpen: any
   handleDelete: any
   type: 'announcement'
}

export function DeletionAlert({ onClose, isOpen, handleDelete, type }: DeletionAlertProps) {
   
   const cancelRef: any = React.useRef()
   const t = useTypeSafeTranslation()
   
   const mutationIsLoading = useSelector(AppSelectors.mutationIsLoading)
   
   return (
      <AlertDialog
         motionPreset="slideInBottom"
         leastDestructiveRef={cancelRef}
         onClose={onClose}
         isOpen={isOpen}
         isCentered
      >
         <AlertDialogOverlay />
      
         <AlertDialogContent>
            {/*<AlertDialogHeader>Discard Changes?</AlertDialogHeader>*/}
            <AlertDialogCloseButton />
            <Flex>
               <IconBox colorScheme="red.500" isCircular icon={<BiTrash />} mt={4} ml={4} position="absolute" />
               <Box pl="3.5rem">
                  <AlertDialogHeader>{t('Confirmation')}</AlertDialogHeader>
                  <AlertDialogBody>
                     <Text>
                        {t(`alert:delete.${type}`)}&nbsp;{t('course:This action is irreversible')}
                     </Text>
                  </AlertDialogBody>
                  <AlertDialogFooter gridGap=".5rem">
                     <Button variant="secondary" isLoading={mutationIsLoading} colorScheme="red.500" onClick={handleDelete}>
                        {t('Delete')}
                     </Button>
                     <Button isDisabled={mutationIsLoading} colorScheme="secondary" variant="secondary" ref={cancelRef} onClick={onClose}>
                        {t('Cancel')}
                     </Button>
                  </AlertDialogFooter>
               </Box>
            </Flex>
         </AlertDialogContent>
      </AlertDialog>
   )
   
}
