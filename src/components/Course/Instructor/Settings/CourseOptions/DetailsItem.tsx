import {
   Button, FormControl, FormLabel, IconBox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure,
} from 'chalkui/dist/cjs/React'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiLock, BiLockOpen } from 'react-icons/bi'
import { MenuCelledListItem } from 'slate/components/UI/MenuCelledList'
import { useCurrentCourse } from 'slate/hooks/use-current-course'

export function DetailsItem() {
   const { t } = useTranslation(['common', 'course'], { useSuspense: false })
   
   const { isOpen: detailsModalIsOpen, onOpen: openDetailsModal, onClose: closeDetailsModal } = useDisclosure()
   
   const course = useCurrentCourse()
   
   const { register, handleSubmit, formState: { errors } } = useForm()
   
   function onDetailsSubmit(data: any) {
   
   }
   
   return (
      <>
         <MenuCelledListItem onClick={openDetailsModal}>
            {t('course:options.Course details')}
         </MenuCelledListItem>
         
         <Modal size="xl" isOpen={detailsModalIsOpen} onClose={closeDetailsModal}>
            <ModalOverlay />
            <ModalContent textAlign="center">
               <IconBox isCircular icon={course?.available ? <BiLock /> : <BiLockOpen />} colorScheme="primary" margin="0 auto" mt={3} />
               <ModalHeader textAlign="center">{t('course:options.Change details about the course')}</ModalHeader>
               <form onSubmit={handleSubmit(onDetailsSubmit)}>
                  <ModalBody textAlign="center">
                     
                     
                     <FormControl mb={3} id="student_id" isRequired={true}>
                        <FormLabel>{t('form:Name')}</FormLabel>
                        <Input {...register("name", { required: true })} defaultValue={course?.name} placeholder={t('form:Name')} />
                     </FormControl>
                     
                     
                     <FormControl mb={3} id="code">
                        <FormLabel>{t('form:Description')}</FormLabel>
                        <Input
                           {...register("description")}
                           defaultValue={course?.description}
                           placeholder={t('form:Description')}
                           type="text"
                        />
                     </FormControl>
                  
                  
                  </ModalBody>
                  
                  <ModalFooter gridGap={5}>
                     <Button colorScheme="brand.100" width="100%" type="submit">{t('Save')}</Button>
                     <Button colorScheme="brand.800" onClick={closeDetailsModal} isFullWidth>
                        {t('Cancel')}
                     </Button>
                  </ModalFooter>
               </form>
            </ModalContent>
         </Modal>
      </>
   )
}
