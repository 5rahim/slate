import { FcAdvertising } from '@react-icons/all-files/fc/FcAdvertising'
import { Empty } from '@slate/components/UI/Empty'
import { Announcements } from '@slate/generated/graphql'
import { DataListModule } from '@slate/graphql/DataListModule'
import { getAnnouncements } from '@slate/graphql/schemas/announcements/hooks'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { AnnouncementListItem } from '@slate/modules/Course/Shared/Announcements/AnnouncementListItem'
import { useCachedQuery } from '@slate/store/cache/hooks/useCachedQuery'
import { DividedList, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { ListProps, Skeleton } from 'chalkui/dist/cjs/React'
import React from 'react'

export function AnnouncementList({ ...rest }: ListProps) {
   const course = useCurrentCourse()
   
   const [announcements, loading, empty] = useCachedQuery<Announcements[] | null>('announcements', getAnnouncements(course?.id))
   
   return (
      <DataListModule
         data={announcements}
         dataIsLoading={loading}
         dataIsEmpty={empty}
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
