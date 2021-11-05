import { DividedList, Flex, ListItem } from 'chalkui/dist/cjs/Components/Layout'
import { Box, Dropdown, DropdownButton, DropdownItem, DropdownList, Icon, ListProps, Tag, Text } from 'chalkui/dist/cjs/React'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BiDotsHorizontal, BiEdit, BiTrash } from 'react-icons/bi'
import { useCMF } from 'slate/hooks/use-color-mode-function'

export function AnnouncementList({ ...rest }: ListProps) {
   const { t } = useTranslation(['common', 'course'], { useSuspense: false })
   
   const cmf = useCMF()
   
   return (
      <DividedList spacing={2} width="100%" overflowY={"auto"} pr={1} {...rest}>
         <ListItem
            sx={{
               _hover: {
                  // bgColor: colorMode === 'light' ? 'gray.100' : 'gray.800'
               },
            }}
         >
            <Flex alignItems="center">
               <Box fontSize="md">
                  <Flex justifyContent="space-between">
                     <Flex mb={3} gridGap=".5rem" flexDirection={['column', 'row']}>
                        <Text fontSize="lg" fontWeight="bold">Bojack Horseman</Text>
                        <Flex gridGap=".5rem">
                           <Tag variant="primary" pill colorScheme="black">Not published</Tag>
                           <Tag pill colorScheme="orange.500">Draft</Tag>
                        </Flex>
                     </Flex>
                     
                     
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
                              fontSize="1.4rem"
                           >
                              <Icon as={BiDotsHorizontal} />
                           </Box>
                        
                        </DropdownButton>
                        <DropdownList>
                           <DropdownItem icon={<BiEdit />}>
                              {t('Edit')}
                           </DropdownItem>
                           <DropdownItem icon={<BiTrash />}>
                              {t('Delete')}
                           </DropdownItem>
                        </DropdownList>
                     </Dropdown>
                  
                  </Flex>
                  <Text>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cum delectus dolorum, eaque earum,
                     enim facilis ipsam magnam minima modi molestias nisi officia officiis pariatur perferendis saepe
                     tempore
                     ut, vel!
                  </Text>
               </Box>
            </Flex>
         </ListItem>
      </DividedList>
   )
}
