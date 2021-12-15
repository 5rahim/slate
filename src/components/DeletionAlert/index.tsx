import { BiTrash } from '@react-icons/all-files/bi/BiTrash'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { AppSelectors } from '@slate/store/slices/appSlice'
import { Button } from 'chalkui/dist/cjs/Components/Button/Button'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox/IconBox'
import { Box, Flex } from 'chalkui/dist/cjs/Components/Layout'
import {
   AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
} from 'chalkui/dist/cjs/Components/Modal/AlertDialog'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React from 'react'
import { useSelector } from 'react-redux'

interface DeletionAlertProps {
   onClose: any
   isOpen: any
   handleDelete: any
   type: 'announcement' | 'module' | 'shortcut'
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
                     <Button isLoading={mutationIsLoading} colorScheme="red.500" onClick={handleDelete}>
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
