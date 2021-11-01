import {
   BiHide, BiShow, BiLink, BiSliderAlt, BiUserPin, BiAlarmExclamation, BiErrorCircle, BiLock, BiLockOpen, BiListPlus, BiCopy,
} from 'react-icons/bi'
import { Center, DividedList, Flex, ListItem } from 'chalkui/dist/cjs/Components/Layout'
import {
   Box, Link, Text, IconBox, Tooltip, DropdownButton, Dropdown, DropdownList, DropdownItem, useDisclosure, Button, ModalFooter, ModalBody,
   ModalHeader, ModalContent, ModalOverlay, Modal, IconButton, useClipboard,
} from 'chalkui/dist/cjs/React'
import { CourseModuleBox } from 'slate/components/Course/CourseModuleBox'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCurrentCourse } from 'slate/hooks/use-current-course'
import { useMutateCourseAvailability, useMutateCourseCode } from 'slate/graphql/queries/courses/hooks'
import { useCurrentUser } from 'slate/hooks/use-current-user'

export function CourseOptions() {
   const { t } = useTranslation(['common', 'course'], { useSuspense: false })
   const { isOpen: availabilityModalIsOpen, onOpen: openAvailabilityModal, onClose: closeAvailabilityModal } = useDisclosure()
   const { isOpen: accessCodeViewIsOpen, onToggle: toggleAccessCodeView } = useDisclosure()
   const course = useCurrentCourse()
   
   const user = useCurrentUser()
   const hasAssistants = course?.management?.length && course?.management.length > 0
   const [updateAvailability] = useMutateCourseAvailability()
   
   const [updateCourseCode] = useMutateCourseCode()
   
   const { onCopy } = useClipboard(course?.access_code)
   
   function handleChangeCourseAvailability() {
      course && updateAvailability({ id: course.id, available: !course.available })
      closeAvailabilityModal()
   }
   
   function handleChangeCourseCode() {
      course && updateCourseCode({
         id: course.id,
         code: user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase() + Math.floor(100000 + Math.random() * 900000)
      })
   }
   
   
   return (
      <CourseModuleBox headerText={t('course:Course Options')} headerIcon={<BiSliderAlt />}>
         <DividedList spacing={2} width="full">
            
            <ListItem>
               <Flex alignItems="center">
                  
                  <Box as={course?.available ? BiShow : BiHide} width="40px" fontSize="1.6rem" />
                  
                  <Box fontSize="md">
                     
                     <Text fontSize="lg"
                           fontWeight="700">{t(`course:options.status.title`, { status: course?.available ? 'available' : 'hidden' })}</Text>
                     
                     <Flex>
                        <Text>{t(`course:options.status.description`, { what: course?.available ? 'is' : 'is not' })} |
                           &nbsp;
                           {/*<Link onClick={openAvailabilityModal}>{t('Edit')}</Link>*/}
                        </Text>
   
                        <Dropdown>
                           <DropdownButton as={Link} colorScheme={'gray.100'}>
                              {t('Edit')}
                           </DropdownButton>
                           <DropdownList>
                              <DropdownItem
                                 onClick={openAvailabilityModal}>{t(!course?.available ? 'course:options.Make course accessible' : 'course:options.Make course non-accessible')}
                              </DropdownItem>
                           </DropdownList>
                        </Dropdown>
                     </Flex>
                     
                     <Modal isOpen={availabilityModalIsOpen} onClose={closeAvailabilityModal}>
                        <ModalOverlay />
                        <ModalContent textAlign="center">
                           <IconBox isCircular icon={course?.available ? <BiLock /> : <BiLockOpen />} colorScheme="primary" margin="0 auto" mt={3} />
                           <ModalHeader textAlign="center">Change course accessibility</ModalHeader>
                           <ModalBody textAlign="center">
                              {t(!course?.available ? 'course:options.Are you sure make accessible' : 'course:options.Are you sure make non-accessible')}
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
               <Flex alignItems="center">
                  <Box as={BiLink} width="40px" fontSize="1.6rem" />
                  <Box fontSize="md">
                     <Flex alignItems="center" gridGap={1}>
                        <Text fontSize="lg" fontWeight="700">{t('course:Access Code')}</Text>
                        
                        {!course?.access_code && (
                           <Tooltip label="Create an access code to allow students to join your course" aria-label="Indication">
                              <IconBox colorScheme="red.500" icon={<BiErrorCircle />} size="sm" />
                           </Tooltip>
                        )}
                        
                     </Flex>
                     <Flex>
                        <Text>{t(course?.access_code ? "course:options.code.yes" : "course:options.code.no")} |&nbsp;</Text>
                        {course?.access_code ?
                           (
                              <>
                                 <Link onClick={toggleAccessCodeView}>{t('View')}</Link>
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
                                       onClick={handleChangeCourseCode}>{t('course:options.Create a new access code')}
                                    </DropdownItem>
                                 </DropdownList>
                              </Dropdown>
                           )
                        }
                     </Flex>
                     <Flex display={accessCodeViewIsOpen ? "flex" : "none"} gridGap=".5rem">
                        <Text fontSize="xl">{course?.access_code}</Text>
                        <Tooltip label={t('course:options.Copy the access code')}>
                           <IconButton size="sm" icon={<BiCopy/>} aria-label="" onClick={onCopy} />
                        </Tooltip>
                         |&nbsp;
                        <Dropdown>
                           <DropdownButton as={Link} colorScheme={'gray.100'}>
                              {t('course:options.Change the access code')}
                           </DropdownButton>
                           <DropdownList>
                              <DropdownItem
                                 onClick={handleChangeCourseCode}>{t('course:options.Create a new access code')}
                              </DropdownItem>
                           </DropdownList>
                        </Dropdown>
                     </Flex>
                  </Box>
               </Flex>
            </ListItem>
            <ListItem>
               <Flex alignItems="center">
                  <Box as={BiUserPin} width="40px" fontSize="1.6rem" />
                  <Box fontSize="md">
                     <Text fontSize="lg" fontWeight="700">{t('course:Management')}</Text>
                     <Text>{t(hasAssistants ? "course:options.assistant.yes" : "course:options.assistant.no")} |
                        &nbsp;<>
                           {
                              hasAssistants ? <Link>View</Link> : <Link>{t('Add')}</Link>
                           }
                        </>
                     </Text>
                  </Box>
               </Flex>
            </ListItem>
            <ListItem>
               <Flex alignItems="center">
                  <Box as={BiListPlus} width="40px" fontSize="1.6rem" />
                  <Box fontSize="md">
                     <Text fontSize="lg" fontWeight="700">{t('course:More options')}</Text>
                        <Link>{t('course:options.Change details about the course')}</Link>
                  </Box>
               </Flex>
            </ListItem>
         </DividedList>
      </CourseModuleBox>
   )
   
}
