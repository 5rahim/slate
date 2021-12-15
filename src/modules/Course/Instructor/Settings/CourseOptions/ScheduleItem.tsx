import { BiCalendar } from '@react-icons/all-files/bi/BiCalendar'
import { ScheduleSelector } from '@slate/components/ScheduleSelector'
import { MenuCelledListItem } from '@slate/components/UI/MenuCelledList'
import { Button } from 'chalkui/dist/cjs/Components/Button/Button'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox/IconBox'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from 'chalkui/dist/cjs/Components/Modal/Modal'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'


export function ScheduleItem() {
   const { t } = useTranslation(['common', 'course'], { useSuspense: false })
   
   const { isOpen: scheduleModalIsOpen, onOpen: openScheduleModal, onClose: closeScheduleModal } = useDisclosure()
   
   const [courseSchedule, setCourseSchedule] = useState<any>([])
   
   
   return (
      <>
         <MenuCelledListItem onClick={openScheduleModal}>
            {t('course:options.Course schedule')}
         </MenuCelledListItem>
         
         <Modal size="3xl" isOpen={scheduleModalIsOpen} onClose={closeScheduleModal}>
            <ModalOverlay />
            <ModalContent textAlign="center">
               <ModalCloseButton />
               <IconBox isCircular icon={<BiCalendar />} colorScheme="primary" margin="0 auto" mt={3} />
               <ModalHeader textAlign="center">{t('course:options.Change the schedule of the course')}</ModalHeader>
               <ModalBody textAlign="center">
                  
                  <ScheduleSelector />
                  
                  {/*<ScheduleSelector*/}
                  {/*   dateFormat="iii"*/}
                  {/*   startDate={startDate}*/}
                  {/*   selection={courseSchedule}*/}
                  {/*   numDays={7}*/}
                  {/*   minTime={8}*/}
                  {/*   maxTime={23}*/}
                  {/*   hourlyChunks={4}*/}
                  {/*   onChange={(s) => setCourseSchedule(s)}*/}
                  {/*/>*/}
               
               </ModalBody>
               
               <ModalFooter gridGap={5}>
                  <Button
                     colorScheme="brand.100"
                     width="100%"
                     // onClick={handleChangeCourseDuration}
                     // isDisabled={!courseDuration || (!courseDuration?.startDate || !courseDuration?.endDate)}
                  >{t('Save')}</Button>
                  
                  <Button colorScheme="brand.800" onClick={closeScheduleModal} isFullWidth>
                     {t('Cancel')}
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}
