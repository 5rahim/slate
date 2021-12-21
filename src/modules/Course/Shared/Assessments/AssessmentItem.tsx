import { AiOutlineSnippets } from '@react-icons/all-files/ai/AiOutlineSnippets'
import { BiArchiveIn } from '@react-icons/all-files/bi/BiArchiveIn'
import { BiDotsVerticalRounded } from '@react-icons/all-files/bi/BiDotsVerticalRounded'
import { BiEdit } from '@react-icons/all-files/bi/BiEdit'
import { FcInspection } from '@react-icons/all-files/fc/FcInspection'
import { ComponentVisibility, HideItemInStudentView } from '@slate/components/ComponentVisibility'
import { Gradebook_Items } from '@slate/generated/graphql'
import { usePublishDateSetting } from '@slate/hooks/settings/usePublishDateSetting'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
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
import React, { useRef } from 'react'

const AssignmentEdit = dynamic(() => import('@slate/modules/Course/Instructor/Assessments/Assignments/AssignmentEdit'))

interface AssessmentItemProps {
   gradebookItem: Gradebook_Items
   data: Gradebook_Items['assignment'] // | Gradebook_Items['test']
}

export const AssessmentItem = ({ gradebookItem, data }: AssessmentItemProps) => {
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const course = useCurrentCourse()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const { isOpen: assignmentEditIsOpen, onOpen: assignmentEditOnOpen, onClose: assignmentEditOnClose } = useDisclosure()
   const { isOpen: archiveIsOpen, onOpen: archiveOnOpen, onClose: archiveOnClose } = useDisclosure()
   const { linkToAssignment } = useLinkHref()
   const { formatDate } = useDateFormatter()
   const cancelRef: any = useRef()
   
   const {
      gradebookItem_hasSubmittedAttempt,
      gradebookItem_submissionCount,
      gradebookItem_enrolledCount
   } = useGradebookItemHelpers()
   const { publishDateHelpers } = usePublishDateSetting()
   
   
   const isVisible = publishDateHelpers.isAvailable({ status: gradebookItem.status, availableFrom: gradebookItem.available_from })
   
   // const isAvailable = data.available || ( data.is_scheduled && Utils.Dates.dateHasPassed(data.publish_on) )
   // const isScheduledButNotAvailable = data.is_scheduled && !data.available && !Utils.Dates.dateHasPassed(data.publish_on)
   
   return (
      <HideItemInStudentView showIf={isVisible}>
         
         {/*<UnitAddArchive data={data} onClose={archiveOnClose} isOpen={archiveIsOpen} cancelRef={cancelRef} />*/}
   
         {assignmentEditIsOpen && <AssignmentEdit
            isOpen={assignmentEditIsOpen}
            onClose={assignmentEditOnClose}
            data={{ gradebookItem }}
         />}
         
         <ListItem>
            
            <Flex
               height="4rem"
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
                                 <Link href="">
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
                              </ComponentVisibility.StudentOnly>
                              
                              <ComponentVisibility.InstructorOnly>
                                 <Flex
                                 >
                                    <Text fontWeight="bold" fontSize="lg">
                                       {data?.name}
                                    </Text>
                                 </Flex>
                              </ComponentVisibility.InstructorOnly>
                           
                           </Flex>
                           
                           <ComponentVisibility.StudentOnly>
                                 <Badge fontSize=".85rem" pill colorScheme={gradebookItem_hasSubmittedAttempt(gradebookItem) ? 'green.500' : 'gray.500'}>
                                    {t(gradebookItem_hasSubmittedAttempt(gradebookItem) ? 'Completed' : 'Not completed')}
                                 </Badge>
                           </ComponentVisibility.StudentOnly>
                           
                           <ComponentVisibility.AssistantAndHigher>
                              <Tag size="lg">
                                 <strong>{gradebookItem_submissionCount(gradebookItem)} {t('submissions')}&nbsp;</strong> / {gradebookItem_enrolledCount(gradebookItem)}
                              </Tag>
                           </ComponentVisibility.AssistantAndHigher>
                        
                        </Flex>
                     )
                  }
                  
                  <ComponentVisibility.AssistantAndHigher>
                     <Flex alignItems="center">
                        
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
                                    onClick={gradebookItem.assessment_type === 'assignment' ? assignmentEditOnOpen : undefined}
                                 >
                                    {t('Edit')}
                                 </DropdownItem>
                                 
                                 <ComponentVisibility.InstructorOnly>
                                    <DropdownItem icon={<BiArchiveIn />} onClick={archiveOnOpen}>
                                       {t('Archive')}
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
