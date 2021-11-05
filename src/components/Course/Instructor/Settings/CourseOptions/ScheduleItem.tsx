import {
   Box, Button, IconBox, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure,
} from 'chalkui/dist/cjs/React'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiCalendar } from 'react-icons/bi'
import { MenuCelledListItem } from 'slate/components/UI/MenuCelledList'

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
               <ModalHeader textAlign="center">{t('course:options.Change the duration of the course')}</ModalHeader>
               <ModalBody textAlign="center">
                  
                  <Text>Monday</Text>
                  <Box>
                     <Select>
                        <option></option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                     </Select>
                  </Box>
                  
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
