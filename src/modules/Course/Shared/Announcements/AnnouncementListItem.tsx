import { PermissionComponent } from '@slate/components/Permissions'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { RichTextContent } from '@slate/components/UI/RichTextContent'
import { Announcements } from '@slate/generated/graphql'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useLocale } from '@slate/hooks/useLocale'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { AnnouncementEdit } from '@slate/modules/Course/Instructor/Announcements/AnnouncementEdit'
import { Utils } from '@slate/utils'
import { Flex, ListItem } from 'chalkui/dist/cjs/Components/Layout'
import { Avatar, Box, Dropdown, DropdownButton, DropdownItem, DropdownList, Icon, Tag, Text, useDisclosure } from 'chalkui/dist/cjs/React'
import React from 'react'
import { BiDotsHorizontal, BiEdit, BiTrash } from 'react-icons/bi'

export const AnnouncementListItem = (props: { data: Announcements }) => {
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const locale = useLocale()
   const { data } = props
   
   const { isOpen, onOpen, onClose } = useDisclosure()
   
   return (
      <>
         
         <ListItem
            width="full"
            py={2}
            px={3}
            bgColor={cmf("#fcfcfc", "transparent")}
            borderRadius="md"
         >
            <Flex alignItems="center" width="full">
               
               <Box fontSize="md" width="full">
                  
                  <Flex justifyContent="space-between">
                     
                     <Flex mb={2} gridGap=".5rem" flexDirection={['column', 'row']}>
                        <Text fontSize="lg" fontWeight="bold">{data.title}</Text>
                     </Flex>
                     
                     
                     <PermissionComponent.AssistantAndHigher>
                        <Flex alignItems="center" gridGap="1rem">
                           <Flex gridGap=".5rem">
                              {( data.is_scheduled && !Utils.Dates.publicationDateHasPassed(data.publish_on) ) && (
                                 <Tag
                                    variant="secondary"
                                    pill
                                    colorScheme={cmf("black", "white")}
                                 >
                                    {t('Not published')}
                                 </Tag>
                              )}
                              {/*{!( data.is_scheduled && !data.publish_on ) &&*/}
                              {/*<Tag pill colorScheme="orange.500">{t('Draft')}</Tag>}*/}
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
                                 <DropdownItem icon={<BiEdit />} onClick={onOpen}>
                                    {t('Edit')}
                                 </DropdownItem>
                                 <DropdownItem icon={<BiTrash />}>
                                    {t('Delete')}
                                 </DropdownItem>
                              </DropdownList>
                           </Dropdown>
                        </Flex>
                     </PermissionComponent.AssistantAndHigher>
                  
                  </Flex>
                  
                  <AlignedFlex>
                     
                     <AlignedFlex>
                        <Avatar size="xs" src={data.author?.image as string} />
                        <Text>{Utils.Names.formatLocaleFullName(locale, data.author)}</Text>
                     </AlignedFlex>
                     
                     <Text fontStyle="italic" color={cmf("gray.500", "gray.300")}>
                        {
                           !data.is_scheduled && Utils.Dates.formatDate(new Date(data.created_at), 'long with hours', locale)
                        }
                        {
                           ( data.is_scheduled && Utils.Dates.publicationDateHasPassed(data.publish_on) ) &&
                           Utils.Dates.formatDate(data.publish_on, 'long with hours', locale)
                        }
                     </Text>
                     
                     {
                        data.is_scheduled && !Utils.Dates.publicationDateHasPassed(data.publish_on) && (
                           <Text fontStyle="italic" color={cmf("gray.500", "gray.300")}>
                              {t('Scheduled for')}&nbsp;
                              <strong>{Utils.Dates.formatDate(data.publish_on, 'short with hours', locale)}</strong>
                           </Text>
                        )
                     }
                  
                  </AlignedFlex>
                  
                  <Box mt="3" border="2px dashed" borderColor={cmf("gray.200", "gray.600")} borderRadius="md" px="3">
                     <RichTextContent content={data.message} />
                  </Box>
               </Box>
            </Flex>
         </ListItem>
         
         <AnnouncementEdit isOpen={isOpen} onClose={onClose} data={data} />
      
      </>
   )
   
}
