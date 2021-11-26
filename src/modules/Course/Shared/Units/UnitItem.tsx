import { useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities"
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { Units } from '@slate/generated/graphql'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Utils } from '@slate/utils'
import { Text } from 'chalkui/dist/cjs'
import { Box, Dropdown, DropdownButton, DropdownItem, DropdownList, Flex, Icon, useDisclosure } from 'chalkui/dist/cjs/React'
import React from 'react'
import { BiArchiveIn, BiDotsVerticalRounded, BiEdit, BiHide, BiMoveVertical, BiShow } from 'react-icons/bi'


interface UnitItemProps {
   data: Units
   id: string
}

export const UnitItem = ({ data, id }: UnitItemProps) => {
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const { isOpen: archiveIsOpen, onOpen: archiveOnOpen, onClose: archiveOnClose } = useDisclosure()
   
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
      <Flex
         ref={setNodeRef}
         style={style}
         borderRadius="xl"
         height="60px"
         alignItems="center"
         bgColor={cmf('#efefef', 'gray.700')}
         mb="2"
      >
         <Box pl="2" {...attributes} {...listeners}>
            <Icon as={BiMoveVertical} />
         </Box>
         
         <Flex px="4" width="100%" justifyContent="space-between" alignItems="center">
            
            <Text fontWeight="bold" fontSize="lg">{t(data.type === 'week' ? 'Week' : "Unit")} {data.number}</Text>
            
            <ComponentVisibility.AssistantAndHigher>
               <Flex alignItems="center">
                  <Box mr="2">
                     {
                        data.available || ( data.is_scheduled && Utils.Dates.publicationDateHasPassed(data.publish_on) )
                           ? <Icon as={BiShow} fontSize="2xl" />
                           :
                           <Icon as={BiHide} fontSize="2xl" />
                     }
                  </Box>
   
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
                  
               </Flex>
            </ComponentVisibility.AssistantAndHigher>
         
         </Flex>
      </Flex>
   )
}
