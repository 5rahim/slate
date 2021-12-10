import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BiArchiveIn } from '@react-icons/all-files/bi/BiArchiveIn'
import { BiDotsVertical } from '@react-icons/all-files/bi/BiDotsVertical'
import { BiDotsVerticalRounded } from '@react-icons/all-files/bi/BiDotsVerticalRounded'
import { BiEdit } from '@react-icons/all-files/bi/BiEdit'
import { BiHeading } from '@react-icons/all-files/bi/BiHeading'
import { ComponentVisibility, HideItemInStudentView } from '@slate/components/ComponentVisibility'
import { Modules } from '@slate/generated/graphql'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
import { useLinkHref } from '@slate/hooks/useLinkHref'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { UnitModuleTypes } from '@slate/types/UnitModules'
import { Utils } from '@slate/utils'
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from 'chalkui/dist/cjs/Components/Dropdown/Dropdown'
import Icon from 'chalkui/dist/cjs/Components/Icon/Icon'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox/IconBox'
import { Flex, ListItem } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import React, { useRef } from 'react'

interface ModuleItemProps {
   data: Modules
   id: string
}

export const ModuleItem = ({ data, id }: ModuleItemProps) => {
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure()
   const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure()
   const { linkToUnit } = useLinkHref()
   const { formatDate } = useDateFormatter()
   const cancelRef: any = useRef()
   
   const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
   } = useSortable({ id: id })
   
   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   }
   
   return (
      <HideItemInStudentView showIf={data.status === 'available' || ( data.status === 'scheduled' && Utils.Dates.publicationDateHasPassed(data.publish_on) )}>
         
         {/*<UnitAddArchive data={data} onClose={archiveOnClose} isOpen={archiveIsOpen} cancelRef={cancelRef} />*/}
         
         {/*<UnitEdit*/}
         {/*   isOpen={isOpen}*/}
         {/*   onClose={onClose}*/}
         {/*   data={data}*/}
         {/*/>*/}
         
         <ListItem
            ref={setNodeRef}
            style={style}
            width="100%"
            position="relative"
            bgColor={cmf('white', 'transparent')}
            _hover={{
               bgColor: cmf('gray.100', 'gray.800')
            }}
         >
            
            <Flex>
   
               <ComponentVisibility.InstructorOnly>
                  <Flex
                     bgColor={cmf('#f0f0f0', 'gray.700')}
                     color={cmf("#979797", 'gray.200')}
                     height="100%"
                     width="1.2rem"
                     justify="center"
                     align="center"
                     cursor="ns-resize"
                     borderBottomRightRadius="md"
                     {...attributes}
                     {...listeners}
                  >
                     <Icon as={BiDotsVertical} fontSize="1.6rem" />
                  </Flex>
               </ComponentVisibility.InstructorOnly>
   
               {
                  data.type === UnitModuleTypes.TextHeader && (
                     <ModuleContent icon={BiHeading} iconColor="blue.500">
                        <Text fontSize="xl" fontWeight="700">{data.content}</Text>
                     </ModuleContent>
                  )
               }
   
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
                        <DropdownItem icon={<BiEdit />} onClick={editOnOpen}>
                           {t('Edit')}
                        </DropdownItem>
                        <DropdownItem icon={<BiArchiveIn />} onClick={deleteOnOpen}>
                           {t('Delete')}
                        </DropdownItem>
                     </DropdownList>
                  </Dropdown>
   
               </ComponentVisibility.InstructorOnly>
               
            </Flex>
         
         </ListItem>
      
      </HideItemInStudentView>
   )
}

interface ModuleContentProps {
   icon: any,
   iconColor: any,
   children?: React.ReactNode
}

function ModuleContent({ icon, iconColor, children }: ModuleContentProps) {

   return (
      <Box
         px="3"
         py="3"
         width="100%"
      >
         
         <Flex
            alignItems="center"
         >
            <Flex mr="2">
               <IconBox p=".5rem" size="md" fontSize="xs" colorScheme={iconColor} variant="secondary" as={icon}/>
            </Flex>
   
            <Box>
               {children}
            </Box>
         </Flex>
         
         {/*<Box>*/}
         {/*   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aut beatae eligendi itaque, maiores nobis numquam pariatur perspiciatis temporibus, totam vero voluptate. Debitis harum quaerat vero! Accusantium possimus reprehenderit veritatis!*/}
         {/*</Box>*/}
   
      </Box>
   )

}
