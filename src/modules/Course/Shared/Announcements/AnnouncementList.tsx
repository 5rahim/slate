import { FcAdvertising } from '@react-icons/all-files/fc/FcAdvertising'
import { Empty } from '@slate/components/UI/Empty'
import { Announcements } from '@slate/generated/graphql'
import { DataListModule } from '@slate/graphql/DataListModule'
import { getAnnouncements } from '@slate/graphql/schemas/announcements/hooks'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useCachedQuery } from '@slate/store/cache/hooks/useCachedQuery'
import { DividedList, ListProps, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Skeleton } from 'chalkui/dist/cjs/Components/Skeleton/Skeleton'
import dynamic from 'next/dynamic'
import React from 'react'

const AnnouncementListItem = dynamic(() => import('@slate/modules/Course/Shared/Announcements/AnnouncementListItem'))


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
