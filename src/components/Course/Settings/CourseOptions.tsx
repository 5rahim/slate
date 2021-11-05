import { DividedList, Flex, ListItem } from 'chalkui/dist/cjs/Components/Layout'
import {
   Box, Button, Dropdown, DropdownButton, DropdownItem, DropdownList, FormControl, FormLabel, IconBox, IconButton, Input, Link, Modal, ModalBody,
   ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useBreakpointValue, useClipboard, useDisclosure,
} from 'chalkui/dist/cjs/React'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiCalendar, BiCopy, BiErrorCircle, BiHide, BiLink, BiListPlus, BiLock, BiLockOpen, BiShow, BiSliderAlt, BiUserPin } from 'react-icons/bi'
import { CourseModuleBox } from 'slate/components/Course/CourseModuleBox'
import { Datepicker } from 'slate/components/Datepicker'
import { MediaComponent } from 'slate/components/Layout/MediaQueries/MediaComponent'
import { useMutateCourseAvailability, useMutateCourseCode, useMutateCourseDuration } from 'slate/graphql/queries/courses/hooks'
import { useCurrentCourse } from 'slate/hooks/use-current-course'
import { useCurrentUser } from 'slate/hooks/use-current-user'
import { DurationDateFormat } from 'slate/types/Course'
import { MenuCelledList, MenuCelledListItem } from 'slate/ui/MenuCelledList'
import { Utils } from 'slate/utils'


export function CourseOptions() {
   const {t} = useTranslation(['common', 'course'], {useSuspense: false})
   
   const {isOpen: availabilityModalIsOpen, onOpen: openAvailabilityModal, onClose: closeAvailabilityModal} = useDisclosure()
   const {isOpen: detailsModalIsOpen, onOpen: openDetailsModal, onClose: closeDetailsModal} = useDisclosure()
   const {isOpen: durationModalIsOpen, onOpen: openDurationModal, onClose: closeDurationModal} = useDisclosure()
   const {isOpen: scheduleModalIsOpen, onOpen: openScheduleModal, onClose: closeScheduleModal} = useDisclosure()
   const {isOpen: accessCodeViewIsOpen, onToggle: toggleAccessCodeView} = useDisclosure()
   
   const datePickerOrientation = useBreakpointValue<"vertical" | "horizontal">({base: "vertical", md: "horizontal"})
   
   const {register, handleSubmit, formState: {errors}} = useForm()
   
   const course = useCurrentCourse()
   const user = useCurrentUser()
   
   const hasAssistants = course?.management?.length && course?.management.length > 0
   
   const [courseDuration, setCourseDuration] = useState<DurationDateFormat | null>(Utils.Dates.parseDurationDateObject(course?.duration))
   const [courseSchedule, setCourseSchedule] = useState<any>([])
   
   useEffect(() => {
      console.log(Utils.Dates.getScheduleObjectFromSelectorDates(courseSchedule))
   }, [courseSchedule])
   
   const [updateAvailability] = useMutateCourseAvailability()
   const [updateCourseCode] = useMutateCourseCode()
   const [updateCourseDuration] = useMutateCourseDuration()
   
   const {onCopy} = useClipboard(course?.access_code ?? '')
   
   /**
    * Mutations
    */
   function handleChangeCourseAvailability() {
      course && updateAvailability({id: course.id, available: !course.available})
      closeAvailabilityModal()
   }
   
   function handleChangeCourseCode() {
      if (course && user.first_name && user.last_name) {
         updateCourseCode({
            id: course.id,
            code: user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase() + Math.floor(100000 + Math.random() * 900000),
         })
      }
   }
   
   function handleDeleteCourseCode() {
      toggleAccessCodeView()
      course && updateCourseCode({
         id: course.id,
         code: null,
      })
   }
   
   function handleChangeCourseDuration() {
      course && updateCourseDuration({
         id: course.id,
         duration: Utils.Dates.durationDateObjectToString(courseDuration),
      })
      setCourseDuration(null)
   }
   
   function onDetailsSubmit(data: any) {
   
   }
   
   const startDate = new Date("2021-08-23T14:27:01.444Z")
   
   return (
      <CourseModuleBox headerText={t('course:Course Options')} headerIcon={<BiSliderAlt/>}>
         <DividedList spacing={2} width="full">
            
            <ListItem>
               <Flex alignItems="center" gridGap={2}>
                  
                  <Box as={course?.available ? BiShow : BiHide} width="40px" fontSize="1.6rem"/>
                  
                  <Box fontSize="md">
                     
                     <Flex gridGap={2} alignItems="center">
                        <Text
                           fontSize="lg"
                           fontWeight="700"
                        >{t(`course:options.status.title`, {status: course?.available ? 'available' : 'hidden'})}</Text>
                        
                        {!course?.available && (
                           <IconBox colorScheme="red.500" icon={<BiErrorCircle/>} size="sm"/>
                        )}
                     </Flex>
                     
                     <Flex>
                        <Text>{t(`course:options.status.description`, {what: course?.available ? 'is' : 'is not'})} |
                           &nbsp;
                           {/*<Link onClick={openAvailabilityModal}>{t('Edit')}</Link>*/}
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
                        <ModalOverlay/>
                        <ModalContent textAlign="center">
                           <IconBox isCircular icon={course?.available ? <BiLock/> : <BiLockOpen/>} colorScheme="primary" margin="0 auto" mt={3}/>
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
                  
                  </Box>
               
               </Flex>
            </ListItem>
            
            
            <ListItem>
               <Flex alignItems="center" gridGap={2}>
                  <Box as={BiLink} width="40px" fontSize="1.6rem"/>
                  <Box fontSize="md">
                     <Flex alignItems="center" gridGap={2}>
                        <Text fontSize="lg" fontWeight="700">{t('course:Access Code')}</Text>
                        
                        {!course?.access_code && (
                           <Tooltip label={t('course:options:Create an access code to allow students to join your course')} aria-label="Indication">
                              <IconBox colorScheme="red.500" icon={<BiErrorCircle/>} size="sm"/>
                           </Tooltip>
                        )}
                     
                     </Flex>
                     <Flex>
                        <Text>{t(course?.access_code ? "course:options.code.yes" : "course:options.code.no")} |&nbsp;</Text>
                        {course?.access_code ?
                           (
                              <>
                                 <Link onClick={toggleAccessCodeView}>{accessCodeViewIsOpen ? t('Close') : t('View')}</Link>
                              </>
                           )
                           :
                           (
                              <Dropdown>
                                 <DropdownButton as={Link} colorScheme={'gray.100'}>
                                    {t('Create')}
                                 </DropdownButton>
                                 <DropdownList>
                                    <DropdownItem
                                       onClick={handleChangeCourseCode}
                                    >{t('course:options.Create a new access code')}
                                    </DropdownItem>
                                 </DropdownList>
                              </Dropdown>
                           )
                        }
                     </Flex>
                     <Flex display={accessCodeViewIsOpen ? "flex" : "none"} gridGap=".5rem">
                        <Text fontSize="xl">{course?.access_code}</Text>
                        <Tooltip label={t('course:options.Copy the access code')}>
                           <IconButton size="sm" icon={<BiCopy/>} aria-label="" onClick={onCopy}/>
                        </Tooltip>
                        |&nbsp;
                        <Dropdown>
                           <DropdownButton as={Link} colorScheme={'gray.100'}>
                              {t('course:options.Change the access code')}
                           </DropdownButton>
                           <DropdownList>
                              <DropdownItem
                                 onClick={handleChangeCourseCode}
                              >{t('course:options.Create a new access code')}
                              </DropdownItem>
                              <DropdownItem
                                 onClick={handleDeleteCourseCode}
                              >{t('Delete')}
                              </DropdownItem>
                           </DropdownList>
                        </Dropdown>
                     </Flex>
                  </Box>
               </Flex>
            </ListItem>
            
            <ListItem>
               <Flex alignItems="center" gridGap={2}>
                  <Box as={BiUserPin} width="40px" fontSize="1.6rem"/>
                  <Box fontSize="md" width="full">
                     
                     <Text fontSize="lg" fontWeight="700">{t('course:Management')}</Text>
                     <Flex>
                        <Text>{t(hasAssistants ? "course:options.assistant.yes" : "course:options.assistant.no")}</Text>
                        
                        &nbsp;|&nbsp;
                        <Link>{hasAssistants ? 'View' : 'Add'}</Link>
                     
                     </Flex>
                  </Box>
               </Flex>
            </ListItem>
            
            <ListItem>
               <Flex alignItems="center" gridGap={2}>
                  <Box as={BiListPlus} width="40px" fontSize="1.6rem"/>
                  <Box fontSize="md" width="100%">
                     <Text fontSize="lg" fontWeight="700" mb={2}>{t('course:More options')}</Text>
                     
                     <MenuCelledList>
                        <MenuCelledListItem onClick={openDetailsModal}>
                           {t('course:options.Course details')}
                        </MenuCelledListItem>
                        <MenuCelledListItem onClick={openDurationModal}>
                           {t('course:options.Course duration')}
                        </MenuCelledListItem>
                        <MenuCelledListItem onClick={openScheduleModal}>
                           {t('course:options.Course schedule')}
                        </MenuCelledListItem>
                        <MenuCelledListItem>
                           {t('Analytics')}
                        </MenuCelledListItem>
                     </MenuCelledList>
                  </Box>
               </Flex>
               
               <Modal size="xl" isOpen={detailsModalIsOpen} onClose={closeDetailsModal}>
                  <ModalOverlay/>
                  <ModalContent textAlign="center">
                     <IconBox isCircular icon={course?.available ? <BiLock/> : <BiLockOpen/>} colorScheme="primary" margin="0 auto" mt={3}/>
                     <ModalHeader textAlign="center">{t('course:options.Change details about the course')}</ModalHeader>
                     <form onSubmit={handleSubmit(onDetailsSubmit)}>
                        <ModalBody textAlign="center">
                           
                           
                           <FormControl mb={3} id="student_id" isRequired={true}>
                              <FormLabel>{t('form:Name')}</FormLabel>
                              <Input {...register("name", {required: true})} defaultValue={course?.name} placeholder={t('form:Name')}/>
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
               
               <Modal size="3xl" isOpen={durationModalIsOpen} onClose={closeDurationModal}>
                  <ModalOverlay/>
                  <ModalContent textAlign="center">
                     <ModalCloseButton/>
                     <IconBox isCircular icon={<BiCalendar/>} colorScheme="primary" margin="0 auto" mt={3}/>
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
               
               <Modal size="3xl" isOpen={scheduleModalIsOpen} onClose={closeScheduleModal}>
                  <ModalOverlay/>
                  <ModalContent textAlign="center">
                     <ModalCloseButton/>
                     <IconBox isCircular icon={<BiCalendar/>} colorScheme="primary" margin="0 auto" mt={3}/>
                     <ModalHeader textAlign="center">{t('course:options.Change the duration of the course')}</ModalHeader>
                     <ModalBody textAlign="center">
                        
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
                           onClick={handleChangeCourseDuration}
                           // isDisabled={!courseDuration || (!courseDuration?.startDate || !courseDuration?.endDate)}
                        >{t('Save')}</Button>
                        
                        <Button colorScheme="brand.800" onClick={closeScheduleModal} isFullWidth>
                           {t('Cancel')}
                        </Button>
                     </ModalFooter>
                  </ModalContent>
               </Modal>
            
            
            </ListItem>
         </DividedList>
      </CourseModuleBox>
   )
   
}
