import { Datepicker } from '@slate/components/Datepicker'
import { MediaComponent } from '@slate/components/Layout/MediaQueries/MediaComponent'
import { MenuCelledListItem } from '@slate/components/UI/MenuCelledList'
import { useMutateCourseDuration } from '@slate/graphql/queries/courses/hooks'
import { useCurrentCourse } from '@slate/hooks/use-current-course'
import { DurationDateFormat } from '@slate/types/Course'
import { Utils } from '@slate/utils'
import {
   Button, IconBox, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useBreakpointValue, useDisclosure,
} from 'chalkui/dist/cjs/React'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiCalendar } from 'react-icons/bi'

export function DurationItem() {
   const { t } = useTranslation(['common', 'course'], { useSuspense: false })
   
   const course = useCurrentCourse()
   
   
   const { isOpen: durationModalIsOpen, onOpen: openDurationModal, onClose: closeDurationModal } = useDisclosure()
   const datePickerOrientation = useBreakpointValue<"vertical" | "horizontal">({ base: "vertical", md: "horizontal" })
   
   const [courseDuration, setCourseDuration] = useState<DurationDateFormat | null>(Utils.Dates.parseDurationDateObject(course?.duration))
   
   const [updateCourseDuration] = useMutateCourseDuration()
   
   
   function handleChangeCourseDuration() {
      course && updateCourseDuration({
         id: course.id,
         duration: Utils.Dates.durationDateObjectToString(courseDuration),
      })
      setCourseDuration(null)
   }
   
   return (
      <>
         
         <MenuCelledListItem onClick={openDurationModal}>
            {t('course:options.Course duration')}
         </MenuCelledListItem>
         
         
         <Modal size="3xl" isOpen={durationModalIsOpen} onClose={closeDurationModal}>
            <ModalOverlay />
            <ModalContent textAlign="center">
               <ModalCloseButton />
               <IconBox isCircular icon={<BiCalendar />} colorScheme="primary" margin="0 auto" mt={3} />
               <ModalHeader textAlign="center">{t('course:options.Change the duration of the course')}</ModalHeader>
               <ModalBody textAlign="center">
                  
                  <MediaComponent.HideOnMobile>
                     <Datepicker
                        template={datePickerOrientation}
                        defaultSelectedDates={Utils.Dates.parseDurationDateObject(course?.duration)}
                        onChange={(data) => setCourseDuration(data)}
                     />
                  </MediaComponent.HideOnMobile>
                  
                  <MediaComponent.ShowOnMobileOnly>
                     <Datepicker
                        template={"vertical"}
                        defaultSelectedDates={Utils.Dates.parseDurationDateObject(course?.duration)}
                        onChange={(data) => setCourseDuration(data)}
                     />
                  </MediaComponent.ShowOnMobileOnly>
               
               </ModalBody>
               
               <ModalFooter gridGap={5}>
                  <Button
                     colorScheme="brand.100"
                     width="100%"
                     onClick={handleChangeCourseDuration}
                     isDisabled={!courseDuration || ( !courseDuration?.startDate || !courseDuration?.endDate )}
                  >
                     {t('Save')}
                  </Button>
                  
                  <Button colorScheme="brand.800" onClick={closeDurationModal} isFullWidth>
                     {t('Cancel')}
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      
      </>
   )
   
}
