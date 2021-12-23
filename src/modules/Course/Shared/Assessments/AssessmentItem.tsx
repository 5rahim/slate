import { AiOutlineSnippets } from '@react-icons/all-files/ai/AiOutlineSnippets'
import { BiCalendarExclamation } from '@react-icons/all-files/bi/BiCalendarExclamation'
import { BiDotsVerticalRounded } from '@react-icons/all-files/bi/BiDotsVerticalRounded'
import { BiEdit } from '@react-icons/all-files/bi/BiEdit'
import { BiTrash } from '@react-icons/all-files/bi/BiTrash'
import { FcInspection } from '@react-icons/all-files/fc/FcInspection'
import { VscChecklist } from '@react-icons/all-files/vsc/VscChecklist'
import { ComponentVisibility, HideItemInStudentView } from '@slate/components/ComponentVisibility'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { Gradebook_Items } from '@slate/generated/graphql'
import { usePublishDateSetting } from '@slate/hooks/settings/usePublishDateSetting'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCourseHelpers } from '@slate/hooks/useCourseHelpers'
import { useGradebookItemHelpers } from '@slate/hooks/useGradebookItemHelpers'
import { useLinkHref } from '@slate/hooks/useLinkHref'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from 'chalkui/dist/cjs/Components/Dropdown/Dropdown'
import Icon from 'chalkui/dist/cjs/Components/Icon/Icon'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox/IconBox'
import { Box, Flex, ListItem } from 'chalkui/dist/cjs/Components/Layout'
import { Badge } from 'chalkui/dist/cjs/Components/Layout/Badge'
import { Tag } from 'chalkui/dist/cjs/Components/Tag/Tag'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'

const AssignmentEdit = dynamic(() => import('@slate/modules/Course/Instructor/Assessments/Assignments/AssignmentEdit'))
const TestEdit = dynamic(() => import('@slate/modules/Course/Instructor/Assessments/Tests/TestEdit'))

interface AssessmentItemProps {
   gradebookItem: Gradebook_Items
   data: Gradebook_Items['assignment'] | Gradebook_Items['test']
}

export const AssessmentItem = ({ gradebookItem, data }: AssessmentItemProps) => {
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const { isOpen: assignmentEditIsOpen, onOpen: assignmentEditOnOpen, onClose: assignmentEditOnClose } = useDisclosure()
   const { isOpen: testEditIsOpen, onOpen: testEditOnOpen, onClose: testEditOnClose } = useDisclosure()
   const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure()
   const { linkToAssignment } = useLinkHref()

   const { course_enrollmentCount } = useCourseHelpers()
   
   const {
      gradebookItem_hasSubmittedAttempt,
      gradebookItem_submissionCount,
      gradebookItem_dueDate,
      gradebookItem_dueDateColor,
   } = useGradebookItemHelpers()
   const { publishDateHelpers } = usePublishDateSetting()
   
   
   const isVisible = publishDateHelpers.isAvailable({ status: gradebookItem.status, availableFrom: gradebookItem.available_from })
   
   return (
      <HideItemInStudentView showIf={isVisible}>
         
         {/*<UnitAddArchive data={data} onClose={deleteOnClose} isOpen={deleteIsOpen} cancelRef={cancelRef} />*/}
   
         {assignmentEditIsOpen && <AssignmentEdit
            isOpen={assignmentEditIsOpen}
            onClose={assignmentEditOnClose}
            data={{ gradebookItem }}
         />}
         
         {testEditIsOpen && <TestEdit
            isOpen={testEditIsOpen}
            onClose={testEditOnClose}
            data={{ gradebookItem }}
         />}
         
         <ListItem>
            
            <Flex
               py="3"
               alignItems="center"
               bgColor={cmf('white', 'transparent')}
               _hover={{
                  bgColor: cmf("gray.100", 'gray.700'),
               }}
            >
               
               <Flex width="100%" justifyContent="space-between" alignItems="center">
                  {
                     gradebookItem.assessment_type === 'assignment' && (
                        
                        <Flex width="100%" mr="3" alignItems="center" justifyContent="space-between">
                           
                           <Flex position="relative" alignItems="center" gridGap=".7rem">
                              <IconBox
                                 p=".5rem"
                                 size="md"
                                 fontSize="xs"
                                 colorScheme="purple.500"
                                 variant="secondary"
                                 as={AiOutlineSnippets}
                                 opacity={isVisible ? "1" : ".5"}
                              />
                              
                              <ComponentVisibility.StudentOnly>
                                 <Box>
                                       <Link href={linkToAssignment(data?.id)}>
                                          <Flex
                                             cursor="pointer"
                                             _hover={{ color: cmf('messenger.500', 'messenger.500') }}
                                             textDecoration="underline"
                                          >
                                             <Text fontWeight="bold" fontSize="lg">
                                                {data?.name}
                                             </Text>
                                          </Flex>
                                       </Link>
                                    <AlignedFlex fontSize="lg">
                                       <Icon fontSize="xl" as={BiCalendarExclamation} />
                                       <Text color={gradebookItem_dueDateColor(gradebookItem, gradebookItem_hasSubmittedAttempt(gradebookItem))}>
                                          {gradebookItem_dueDate(gradebookItem)}
                                       </Text>
                                    </AlignedFlex>
                                 </Box>
                              </ComponentVisibility.StudentOnly>
                              
                              <ComponentVisibility.AssistantAndHigher>
                                 <Box
                                 >
                                    <Text fontWeight="bold" fontSize="lg">
                                       {data?.name}
                                    </Text>
                                    <AlignedFlex fontSize="lg">
                                       <Icon fontSize="xl" as={BiCalendarExclamation} />
                                       <Text color={gradebookItem_dueDateColor(gradebookItem, true)}>
                                          {gradebookItem_dueDate(gradebookItem)}
                                       </Text>
                                    </AlignedFlex>
                                 </Box>
                              </ComponentVisibility.AssistantAndHigher>
                           
                           </Flex>
                           
                           <ComponentVisibility.StudentOnly>
                                 <Badge fontSize=".85rem" pill colorScheme={gradebookItem_hasSubmittedAttempt(gradebookItem) ? 'green.500' : 'gray.500'}>
                                    {t(gradebookItem_hasSubmittedAttempt(gradebookItem) ? 'Completed' : 'Not completed')}
                                 </Badge>
                           </ComponentVisibility.StudentOnly>
                           
                           <ComponentVisibility.AssistantAndHigher>
                              <Tag size="lg">
                                 <strong>{gradebookItem_submissionCount(gradebookItem)}</strong>/{course_enrollmentCount} {t('submissions')}
                              </Tag>
                           </ComponentVisibility.AssistantAndHigher>
                        
                        </Flex>
                     )
                  }
                  {
                     gradebookItem.assessment_type === 'test' && (
                        
                        <Flex width="100%" mr="3" alignItems="center" justifyContent="space-between">
                           
                           <Flex position="relative" alignItems="center" gridGap=".7rem">
                              <IconBox
                                 p=".5rem"
                                 size="md"
                                 fontSize="xs"
                                 colorScheme="blue.500"
                                 variant="secondary"
                                 as={VscChecklist}
                                 opacity={isVisible ? "1" : ".5"}
                              />
                              
                              <ComponentVisibility.StudentOnly>
                                 <Box>
                                       <Flex
                                          cursor="pointer"
                                          _hover={{ color: cmf('messenger.500', 'messenger.500') }}
                                          textDecoration="underline"
                                       >
                                          <Text fontWeight="bold" fontSize="lg">
                                             {data?.name}
                                          </Text>
                                       </Flex>
                                    <AlignedFlex fontSize="lg">
                                       <Icon fontSize="xl" as={BiCalendarExclamation} />
                                       <Text color={gradebookItem_dueDateColor(gradebookItem, gradebookItem_hasSubmittedAttempt(gradebookItem))}>
                                          {gradebookItem_dueDate(gradebookItem)}
                                       </Text>
                                    </AlignedFlex>
                                 </Box>
                              </ComponentVisibility.StudentOnly>
                              
                              <ComponentVisibility.AssistantAndHigher>
                                 <Box
                                 >
                                    <Text fontWeight="bold" fontSize="lg">
                                       {data?.name}
                                    </Text>
                                    <AlignedFlex fontSize="lg">
                                       <Icon fontSize="xl" as={BiCalendarExclamation} />
                                       <Text color={gradebookItem_dueDateColor(gradebookItem, true)}>
                                          {gradebookItem_dueDate(gradebookItem)}
                                       </Text>
                                    </AlignedFlex>
                                 </Box>
                              </ComponentVisibility.AssistantAndHigher>
                           
                           </Flex>
                           
                           <ComponentVisibility.StudentOnly>
                                 <Badge fontSize=".85rem" pill colorScheme={gradebookItem_hasSubmittedAttempt(gradebookItem) ? 'green.500' : 'gray.500'}>
                                    {t(gradebookItem_hasSubmittedAttempt(gradebookItem) ? 'Completed' : 'Not completed')}
                                 </Badge>
                           </ComponentVisibility.StudentOnly>
                           
                           <ComponentVisibility.AssistantAndHigher>
                              <Tag size="lg">
                                 <strong>{gradebookItem_submissionCount(gradebookItem)}</strong>/{course_enrollmentCount} {t('submissions')}
                              </Tag>
                           </ComponentVisibility.AssistantAndHigher>
                        
                        </Flex>
                     )
                  }
                  
                  <ComponentVisibility.AssistantAndHigher>
                     <Flex alignItems="center">
   
                        {publishDateHelpers.icons({ status: gradebookItem.status, availableFrom: gradebookItem.available_from })}
                        
                        <ComponentVisibility.AssistantAndHigher>
                           <Dropdown>
                              <DropdownButton
                                 as={Box}
                                 aria-label="Options"
                                 size="lg"
                                 ml="1"
                                 variant="outline"
                                 cursor="pointer"
                                 color={cmf('gray.300', 'gray.300')}
                                 _hover={{
                                    color: cmf('black', 'white'),
                                 }}
                              >
                                 <Box
                                    fontSize="1.6rem"
                                 >
                                    <Icon as={BiDotsVerticalRounded} />
                                 </Box>
                              
                              </DropdownButton>
                              <DropdownList>
                                 <DropdownItem
                                    icon={<FcInspection />}
                                 >
                                    {t('course:View submissions')}
                                 </DropdownItem>
                                 <DropdownItem
                                    icon={<BiEdit />}
                                    onClick={gradebookItem.assessment_type === 'assignment' ? assignmentEditOnOpen : testEditOnOpen}
                                 >
                                    {t('Edit')}
                                 </DropdownItem>
                                 
                                 <ComponentVisibility.InstructorOnly>
                                    <DropdownItem icon={<BiTrash />} onClick={deleteOnOpen}>
                                       {t('Delete')}
                                    </DropdownItem>
                                 </ComponentVisibility.InstructorOnly>
                              
                              </DropdownList>
                           </Dropdown>
                        </ComponentVisibility.AssistantAndHigher>
                     
                     </Flex>
                  </ComponentVisibility.AssistantAndHigher>
               
               </Flex>
            </Flex>
         
         </ListItem>
      
      </HideItemInStudentView>
   )
}
