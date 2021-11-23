import { Empty } from '@slate/components/UI/Empty'
import { DataListModule } from '@slate/graphql/DataListModule'
import { getAnnouncements } from '@slate/graphql/schemas/announcements/hooks'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { AnnouncementListItem } from '@slate/modules/Course/Shared/Announcements/AnnouncementListItem'
import { DividedList, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { ListProps, Skeleton } from 'chalkui/dist/cjs/React'
import React from 'react'
import { FcAdvertising } from 'react-icons/fc'

export function AnnouncementList({ ...rest }: ListProps) {
   const course = useCurrentCourse()
   
   const [announcements, announcementsLoading, isEmpty] = getAnnouncements(course?.id)
   
   return (
      <DataListModule
         data={announcements}
         dataIsLoading={announcementsLoading}
         dataIsEmpty={isEmpty}
         fallback={
            <Stack>
               <Skeleton width="100px" height="10px" borderRadius="md" />
               <Skeleton width="220px" height="10px" borderRadius="md" />
               <Skeleton height="10px" width="70%" borderRadius="md" />
               <Skeleton height="10px" width="60%" borderRadius="md" />
               <Skeleton height="10px" width="70%" borderRadius="md" />
            </Stack>
         }
         displayData={({ list }) =>
            <DividedList
               spacing={5}
               width="100%"
               overflowY={"auto"}
               pr={1}
               {...rest}
            >
               {list(AnnouncementListItem)}
            </DividedList>
         }
         empty={
            <Empty icon={FcAdvertising} text="No announcements" />
         }
      />
   )
}
