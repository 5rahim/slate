import { useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities"
import { BiArchiveIn } from '@react-icons/all-files/bi/BiArchiveIn'
import { BiCalendarAlt } from '@react-icons/all-files/bi/BiCalendarAlt'
import { BiCheckCircle } from '@react-icons/all-files/bi/BiCheckCircle'
import { BiDotsVertical } from '@react-icons/all-files/bi/BiDotsVertical'
import { BiDotsVerticalRounded } from '@react-icons/all-files/bi/BiDotsVerticalRounded'
import { BiEdit } from '@react-icons/all-files/bi/BiEdit'
import { BiFolder } from '@react-icons/all-files/bi/BiFolder'
import { BiHide } from '@react-icons/all-files/bi/BiHide'
import { BiNotepad } from '@react-icons/all-files/bi/BiNotepad'
import { ComponentVisibility, HideItemInStudentView } from '@slate/components/ComponentVisibility'
import { Units } from '@slate/generated/graphql'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
import { useLinkHref } from '@slate/hooks/useLinkHref'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { UnitAddArchive } from '@slate/modules/Course/Instructor/Units/UnitAddArchive'
import { UnitEdit } from '@slate/modules/Course/Instructor/Units/UnitEdit'
import { Utils } from '@slate/utils'
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from 'chalkui/dist/cjs/Components/Dropdown/Dropdown'
import Icon from 'chalkui/dist/cjs/Components/Icon/Icon'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox/IconBox'
import { Box, Flex, ListItem } from 'chalkui/dist/cjs/Components/Layout'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import Link from 'next/link'
import React, { useRef } from 'react'

interface UnitItemProps {
   data: Units
   id: string
}

export const UnitItem = ({ data, id }: UnitItemProps) => {
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const { isOpen: archiveIsOpen, onOpen: archiveOnOpen, onClose: archiveOnClose } = useDisclosure()
   const { linkToUnit } = useLinkHref()
   const { formatDate } = useDateFormatter()
   const cancelRef: any = useRef()
   const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
   } = useSortable({
      id: id,
      transition: {
         duration: 150, // milliseconds
         easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
   })
   
   
   const style = {
      transform: CSS.Transform.toString(transform ? {
         x: 0,
         y: transform.y,
         scaleX: transform.scaleX,
         scaleY: transform.scaleY,
      } : transform),
      transition,
   }
   
   return (
      <HideItemInStudentView showIf={( data.available ) || ( data.is_scheduled && Utils.Dates.publicationDateHasPassed(data.publish_on) )}>
         
         <UnitAddArchive data={data} onClose={archiveOnClose} isOpen={archiveIsOpen} cancelRef={cancelRef} />
         
         <UnitEdit
            isOpen={isOpen}
            onClose={onClose}
            data={data}
         />
         
         <ListItem>
            
            <Flex
               ref={setNodeRef}
               style={style}
               height="3.5rem"
               alignItems="center"
               overflow="hidden"
               bgColor="white"
               // _hover={{
               //    bgColor: cmf('#e5e5e5', 'gray.700'),
               // }}
            >
               
               <ComponentVisibility.InstructorOnly>
                  <Flex
                     color={cmf("#979797", 'gray.200')}
                     mr="-.7rem"
                     height="100%"
                     width="2rem"
                     justify="center"
                     align="center"
                     cursor="ns-resize"
                     {...attributes}
                     {...listeners}
                  >
                     <Icon as={BiDotsVertical} fontSize="1.6rem" />
                     <Icon as={BiDotsVertical} ml="-1.2rem" fontSize="1.6rem" />
                  </Flex>
               </ComponentVisibility.InstructorOnly>
               
               <Flex px="4" width="100%" justifyContent="space-between" alignItems="center">
                  
                  <Link href={linkToUnit(data.id)}>
                     <Flex alignItems="center" cursor="pointer" _hover={{ color: 'brand.400' }}>
                        
                        {
                           data.type !== 'folder' ? (
                                 <Flex mr="3" position="relative" alignItems="center" gridGap=".7rem">
                                    <IconBox p=".5rem" size="md" fontSize="xs" colorScheme="purple.500" variant="secondary" as={BiNotepad} />
                                    <Flex>
                                       <Text fontWeight="bold" fontSize="lg">{t('form:' + data.type)}
                                          &nbsp;{data.number}
                                       </Text>
                                       {!!data.title && <Text fontWeight="bold" fontSize="lg">: {data.title}</Text>}
                                    </Flex>
                                 </Flex>
                              ) :
                              (
                                 <Flex mr="3" position="relative" alignItems="center" gridGap=".7rem">
                                    <IconBox p=".5rem" size="md" fontSize="xs" colorScheme="purple.500" variant="secondary" as={BiFolder} />
                                    <Text fontWeight="bold" fontSize="lg">{data.number}</Text>
                                 </Flex>
                              )
                        }
                     </Flex>
                  </Link>
                  
                  <ComponentVisibility.AssistantAndHigher>
                     <Flex alignItems="center">
                        {( data.is_scheduled && !data.available ) && (
                           <>
                              <Text
                                 color={cmf("gray.500", "gray.300")}
                                 mr="2"
                              >{t('Accessible on')} {formatDate(data.publish_on, 'short with hours')}</Text>
                              <Icon as={BiCalendarAlt} fontSize="2xl" mr="2" />
                           </>
                        )}
                        
                        <Box mr="2">
                           {
                              data.available || ( data.is_scheduled && Utils.Dates.publicationDateHasPassed(data.publish_on) )
                                 ? <Icon as={BiCheckCircle} color="green.500" fontSize="2xl" />
                                 :
                                 <Icon as={BiHide} fontSize="2xl" />
                           }
                        </Box>
                        
                        <ComponentVisibility.InstructorOnly>
                           <Dropdown>
                              <DropdownButton
                                 as={Box}
                                 aria-label="Options"
                                 size="lg"
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
                                 <DropdownItem icon={<BiEdit />} onClick={onOpen}>
                                    {t('Edit')}
                                 </DropdownItem>
                                 <DropdownItem icon={<BiArchiveIn />} onClick={archiveOnOpen}>
                                    {t('Archive')}
                                 </DropdownItem>
                              </DropdownList>
                           </Dropdown>
                        </ComponentVisibility.InstructorOnly>
                     
                     </Flex>
                  </ComponentVisibility.AssistantAndHigher>
               
               </Flex>
            </Flex>
         
         </ListItem>
      
      </HideItemInStudentView>
   )
}
