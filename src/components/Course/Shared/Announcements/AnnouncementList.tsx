import { PermissionComponent } from '@slate/components/Permissions'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { RichTextContent } from '@slate/components/UI/RichTextContent'
import { getAnnouncements } from '@slate/graphql/queries/announcements/hooks'
import { useCMF } from '@slate/hooks/use-color-mode-function'
import { useCurrentCourse } from '@slate/hooks/use-current-course'
import { Utils } from '@slate/utils'
import { DividedList, Flex, ListItem, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Avatar, Box, Dropdown, DropdownButton, DropdownItem, DropdownList, Icon, ListProps, Skeleton, Tag, Text } from 'chalkui/dist/cjs/React'
import { differenceInDays, formatDistance, isEqual } from 'date-fns'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BiDotsHorizontal, BiEdit, BiTrash } from 'react-icons/bi'
import { useLocale } from '@slate/hooks/use-locale'
import {utcToZonedTime} from 'date-fns-tz'

export function AnnouncementList({ ...rest }: ListProps) {
   const { t } = useTranslation(['common', 'course'], { useSuspense: false })
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
            <DividedList spacing={5} border="1px solid" borderColor={cmf("gray.200", "gray.600")} width="100%" overflowY={"auto"} pr={1} {...rest}>
               
               {announcements?.map((announcement) => {
   
                  console.log(differenceInDays(new Date(announcement.publish_on + "Z"), new Date()))
                  
                  return (
                     <ListItem
                        key={announcement.id}
                        width="full"
                        p={4}
                     >
                        <Flex alignItems="center" width="full">
                           
                           <Box fontSize="md" width="full">
                              
                              <Flex justifyContent="space-between">
                                 
                                 <Flex mb={0} gridGap=".5rem" flexDirection={['column', 'row']}>
                                    <Text fontSize="lg" fontWeight="bold">{announcement.title}</Text>
                                 </Flex>
                                 
                                 
                                 <PermissionComponent.AssistantAndHigher>
                                    <Flex alignItems="center" gridGap="1rem">
                                       <Flex gridGap=".5rem">
                                          {( !announcement.published && announcement.publish_on ) && (
                                             <Tag
                                                variant="secondary"
                                                pill
                                                colorScheme={cmf("black", "white")}
                                             >
                                                {t('Not published')}
                                             </Tag>
                                          )}
                                          {/*{!( announcement.published && !announcement.publish_on ) &&*/}
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
                                 
                                 {
                                    announcement?.published && (
                                       <Text fontStyle="italic" color={cmf("gray.500", "gray.300")}>
                                          Posted {formatDistance(new Date(), new Date(announcement?.created_at))} ago
                                       </Text>
                                    )
                                 }
                                 
                                 {
                                    announcement?.publish_on && (
                                       <Text fontStyle="italic" color={cmf("gray.500", "gray.300")}>
                                          {announcement?.publish_on}
                                          {/*Will be posted on {formatDistance(new Date(), new Date(announcement?.pubish_on))}*/}
                                       </Text>
                                    )
                                 }
                              
                              </AlignedFlex>
                              
                              <RichTextContent content={announcement.message} />
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
