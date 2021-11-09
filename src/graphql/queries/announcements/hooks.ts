import { GET_ANNOUNCEMENTS } from '@slate/graphql/queries/announcements/queries'
import { useQueryHookCreator } from '@slate/graphql/utils'
import { Parameter } from '@slate/types/Parameters'

export const getAnnouncements = (course_id: Parameter<string>) => {
   return useQueryHookCreator<any[] | null>(
      "announcements",
      GET_ANNOUNCEMENTS,
      "array",
      {
         variables: { course_id: course_id },
         fetchPolicy: 'no-cache',
      })
}
