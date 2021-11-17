import { PermissionComponent } from '@slate/components/Permissions'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { RichTextContent } from '@slate/components/UI/RichTextContent'
import { getAnnouncements } from '@slate/graphql/queries/announcements/hooks'
import { useCMF } from '@slate/hooks/use-color-mode-function'
import { useCurrentCourse } from '@slate/hooks/use-current-course'
import { useLocale } from '@slate/hooks/use-locale'
import { Utils } from '@slate/utils'
import { DividedList, Flex, ListItem, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Avatar, Box, Dropdown, DropdownButton, DropdownItem, DropdownList, Icon, ListProps, Skeleton, Tag, Text } from 'chalkui/dist/cjs/React'
import { differenceInMinutes } from 'date-fns'
import React, { useEffect } from 'react'
import { BiDotsHorizontal, BiEdit, BiTrash } from 'react-icons/bi'
import { useCourseTranslation } from '../../../../hooks/use-course-translation'

export function AnnouncementList({ ...rest }: ListProps) {
   const t = useCourseTranslation()
   const locale = useLocale()
   const cmf = useCMF()
   const course = useCurrentCourse()
   
   const [announcements, announcementsLoading] = getAnnouncements(course?.id)
   
   useEffect(() => {
      console.log(announcements)
   }, [announcements])
   
   return (
      <>
         {( !announcementsLoading && !!announcements && announcements?.length > 0 ) && (
            <DividedList spacing={5} width="100%" overflowY={"auto"} pr={1} {...rest}>
               
               {announcements?.map((announcement) => {
                  
                  console.log(differenceInMinutes(new Date(announcement.publish_on + "Z"), new Date()))
                  
                  return (
                     <ListItem
                        key={announcement.id}
                        width="full"
                     >
                        <Flex alignItems="center" width="full">
                           
                           <Box fontSize="md" width="full">
                              
                              <Flex justifyContent="space-between">
                                 
                                 <Flex mb={2} gridGap=".5rem" flexDirection={['column', 'row']}>
                                    <Text fontSize="lg" fontWeight="bold">{announcement.title}</Text>
                                 </Flex>
                                 
                                 
                                 <PermissionComponent.AssistantAndHigher>
                                    <Flex alignItems="center" gridGap="1rem">
                                       <Flex gridGap=".5rem">
                                          {( announcement.is_scheduled && !Utils.Dates.publicationDateHasPassed(announcement.publish_on) ) && (
                                             <Tag
                                                variant="secondary"
                                                pill
                                                colorScheme={cmf("black", "white")}
                                             >
                                                {t('Not published')}
                                             </Tag>
                                          )}
                                          {/*{!( announcement.is_scheduled && !announcement.publish_on ) &&*/}
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
                                             <DropdownItem icon={<BiEdit />}>
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
                                    <Avatar size="xs" src={announcement?.author?.image as string} />
                                    <Text>{Utils.Names.formatLocaleFullName(locale, announcement?.author)}</Text>
                                 </AlignedFlex>
                                 
                                 <Text fontStyle="italic" color={cmf("gray.500", "gray.300")}>
                                    {
                                       !announcement?.is_scheduled && Utils.Dates.formatDate(new Date(announcement?.created_at), 'long with hours', locale)
                                    }
                                    {
                                       ( announcement?.is_scheduled && Utils.Dates.publicationDateHasPassed(announcement?.publish_on) ) &&
                                       Utils.Dates.formatDate(announcement?.publish_on, 'long with hours', locale)
                                    }
                                 </Text>
                                 
                                 {
                                    announcement.is_scheduled && !Utils.Dates.publicationDateHasPassed(announcement?.publish_on) && (
                                       <Text fontStyle="italic" color={cmf("gray.500", "gray.300")}>
                                          {t('Scheduled for')}&nbsp;
                                          <strong>{Utils.Dates.formatDate(announcement?.publish_on, 'short with hours', locale)}</strong>
                                          {/*Will be posted on {formatDistance(new Date(), new Date(announcement?.pubish_on))}*/}
                                       </Text>
                                    )
                                 }
                              
                              </AlignedFlex>
                              
                              <Box mt="3" border="2px dashed" borderColor={cmf("gray.200", "gray.600")} borderRadius="md" px="3">
                                 <RichTextContent content={announcement.message} />
                              </Box>
                           </Box>
                        </Flex>
                     </ListItem>
                  )
               })}
            
            </DividedList>
         )}
         {( announcementsLoading ) && (
            <Stack>
               <Skeleton height="10px" borderRadius="md" />
               <Skeleton height="10px" borderRadius="md" />
               <Skeleton height="10px" borderRadius="md" />
            </Stack>
         )}
      
      </>
   )
}
