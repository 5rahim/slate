import { Empty } from '@slate/components/UI/Empty'
import { DataListModule } from '@slate/graphql/DataListModule'
import { getAnnouncements } from '@slate/graphql/schemas/announcements/hooks'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useGlobalCache } from '@slate/hooks/useGlobalCache'
import { AnnouncementListItem } from '@slate/modules/Course/Shared/Announcements/AnnouncementListItem'
import { DividedList, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { ListProps, Skeleton } from 'chalkui/dist/cjs/React'
import React, { useEffect } from 'react'
import { FcAdvertising } from 'react-icons/fc'

export function AnnouncementList({ ...rest }: ListProps) {
   const course = useCurrentCourse()
   
   const [announcements, loading, empty] = getAnnouncements(course?.id)
   
   const cache = useGlobalCache()
   
   useEffect(() => {
      cache.writeAnnouncements(announcements, loading)
   }, [cache, announcements, loading])
   
   return (
      <DataListModule
         data={cache.readAnnouncements(announcements)}
         dataIsLoading={cache.isDataLoading(announcements, loading)}
         dataIsEmpty={cache.noAnnouncements(empty, loading)}
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
