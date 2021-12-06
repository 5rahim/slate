import { BiArchiveIn } from '@react-icons/all-files/bi/BiArchiveIn'
import { Units } from '@slate/generated/graphql'
import { useMutateArchiveUnit } from '@slate/graphql/schemas/units/hooks'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { AppSelectors } from '@slate/store/slices/appSlice'
import { AlertDialogCloseButton, AlertDialogHeader, Text } from 'chalkui/dist/cjs'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import {
   AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Button, Flex, IconBox,
} from 'chalkui/dist/cjs/React'
import React from 'react'
import { useSelector } from 'react-redux'

interface UnitAddArchiveProps {
   onClose: any
   isOpen: boolean
   cancelRef: any
   data: Units
}

export const UnitAddArchive = ({ onClose, isOpen, cancelRef, data }: UnitAddArchiveProps) => {
   
   const t = useTypeSafeTranslation()
   const mutationIsLoading = useSelector(AppSelectors.mutationIsLoading)
   
   const [archiveUnit, mutationLoading] = useMutateArchiveUnit()
   
   function handleArchive() {
      archiveUnit({ id: data.id, archived: true })
   }
   
   return (
      <AlertDialog
         motionPreset="slideInBottom"
         leastDestructiveRef={cancelRef}
         onClose={onClose}
         isOpen={isOpen}
         isCentered
      >
         <AlertDialogOverlay />
         
         <AlertDialogContent width="100%">
            <AlertDialogCloseButton />
            <Flex width="100%">
               <IconBox colorScheme="primary" isCircular icon={<BiArchiveIn />} mt={4} ml={4} position="absolute" />
               <Box pl="3.5rem" width="100%">
                  <AlertDialogHeader>{t('course:Archive this unit')}</AlertDialogHeader>
                  <AlertDialogBody>
                     <Text>
                        {t('course:Archive this unit description')}
                     </Text>
                  </AlertDialogBody>
                  <AlertDialogFooter gridGap=".5rem" width="100%">
                     <Button isFullWidth isLoading={mutationIsLoading} colorScheme="primary" onClick={handleArchive}>
                        {t('Archive')}
                     </Button>
                     <Button isFullWidth isDisabled={mutationIsLoading} colorScheme="secondary" ref={cancelRef} onClick={onClose}>
                        {t('Cancel')}
                     </Button>
                  </AlertDialogFooter>
               </Box>
            </Flex>
         </AlertDialogContent>
      </AlertDialog>
   )
   
}
