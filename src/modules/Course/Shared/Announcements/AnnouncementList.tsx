import { getAnnouncements } from '@slate/graphql/schemas/announcements/hooks'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { AnnouncementListItem } from '@slate/modules/Course/Shared/Announcements/AnnouncementListItem'
import { DividedList, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { ListProps, Skeleton } from 'chalkui/dist/cjs/React'
import React, { useEffect } from 'react'

export function AnnouncementList({ ...rest }: ListProps) {
   const course = useCurrentCourse()
   
   const [announcements, announcementsLoading] = getAnnouncements(course?.id)
   
   useEffect(() => {
      console.log(announcements)
   }, [announcements])
   
   return (
      <>
         {( !announcementsLoading && !!announcements && announcements?.length > 0 ) && (
            <DividedList
               spacing={5}
               width="100%"
               overflowY={"auto"}
               pr={1}
               {...rest}
            >
               
               {announcements?.map((announcement) => (
                  <AnnouncementListItem key={announcement.id} data={announcement} />
               ))}
            
            </DividedList>
         )}
         {( announcementsLoading ) && (
            <Stack>
               <Skeleton width="100px" height="10px" borderRadius="md" />
               <Skeleton width="220px" height="10px" borderRadius="md" />
               <Skeleton height="10px" width="70%" borderRadius="md" />
               <Skeleton height="10px" width="60%" borderRadius="md" />
               <Skeleton height="10px" width="70%" borderRadius="md" />
               <Skeleton height="10px" borderRadius="md" />
               {/*<Skeleton height="10px" borderRadius="md" />*/}
            </Stack>
         )}
      
      </>
   )
}
