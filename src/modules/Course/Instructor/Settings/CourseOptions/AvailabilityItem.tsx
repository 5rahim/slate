import { ModuleSection } from '@slate/components/UI/Course/ModuleSection'
import { useMutateCourseAvailability } from '@slate/graphql/schemas/courses/hooks'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import {
   Button, Dropdown, DropdownButton, DropdownItem, DropdownList, Flex, IconBox, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
   ModalOverlay, Text, useDisclosure,
} from 'chalkui/dist/cjs/React'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BiHide, BiLock, BiLockOpen, BiShow } from 'react-icons/bi'

export const AvailabilityItem = () => {
   const { t } = useTranslation(['common', 'course'], { useSuspense: false })
   
   const course = useCurrentCourse()
   
   const [updateAvailability] = useMutateCourseAvailability()
   
   const { isOpen: availabilityModalIsOpen, onOpen: openAvailabilityModal, onClose: closeAvailabilityModal } = useDisclosure()
   
   function handleChangeCourseAvailability() {
      course && updateAvailability({ id: course.id, available: !course.available })
      closeAvailabilityModal()
   }
   
   
   return (
      <ModuleSection
         icon={course?.available ? BiShow : BiHide}
         title={t(`course:options.status.title`, { status: course?.available ? 'available' : 'hidden' })}
         showAlertIcon={!course?.available}
      >
         <>
            
            <Flex>
               <Text mr="2">
                  {t(`course:options.status.description`, { what: course?.available ? 'is' : 'is not' })}
               </Text>
               
               <Dropdown>
                  <DropdownButton as={Link} colorScheme={'gray.100'}>
                     {t('Edit')}
                  </DropdownButton>
                  <DropdownList>
                     <DropdownItem
                        onClick={openAvailabilityModal}
                     >{t(!course?.available ? 'course:options.Make course accessible' : 'course:options.Make course non-accessible')}
                     </DropdownItem>
                  </DropdownList>
               </Dropdown>
            </Flex>
            
            <Modal isOpen={availabilityModalIsOpen} onClose={closeAvailabilityModal}>
               <ModalOverlay />
               <ModalContent textAlign="center">
                  <IconBox isCircular icon={course?.available ? <BiLock /> : <BiLockOpen />} colorScheme="primary" margin="0 auto" mt={3} />
                  <ModalHeader textAlign="center">{t('course:options.Change course accessibility')}</ModalHeader>
                  <ModalBody textAlign="center">
                     {t(!course?.available
                        ? 'course:options.Are you sure make accessible'
                        : 'course:options.Are you sure make non-accessible')}
                  </ModalBody>
                  
                  <ModalFooter gridGap={5}>
                     <Button colorScheme="brand.300" onClick={handleChangeCourseAvailability} isFullWidth>
                        {t('Confirm')}
                     </Button>
                     <Button colorScheme="brand.800" onClick={closeAvailabilityModal} isFullWidth>
                        {t('Cancel')}
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </>
      </ModuleSection>
   )
   
}
