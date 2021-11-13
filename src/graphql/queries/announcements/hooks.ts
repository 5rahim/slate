import { MutationFunctionOptions } from '@apollo/client'
import { GET_ANNOUNCEMENTS } from '@slate/graphql/queries/announcements/queries'
import { SlateMutationHook, useMutationHookCreator, useQueryHookCreator } from '@slate/graphql/utils'
import { Parameter } from '@slate/types/Parameters'
import { CREATE_ANNOUNCEMENT } from './mutations'

export const useCreateAnnouncement: SlateMutationHook = (options) => {
   
   return useMutationHookCreator(CREATE_ANNOUNCEMENT, {
      refetchQueries: [
         { query: GET_ANNOUNCEMENTS },
         'GetAnnouncements',
      ],
      ...options
   })
   
}

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
