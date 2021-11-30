import { Announcements, CreateAnnouncementMutationVariables } from '@slate/generated/graphql'
import { SlateMutationHook, useMutationHookCreator } from '@slate/graphql/hooks/useMutationHookCreator'
import { useQueryHookCreator } from '@slate/graphql/hooks/useQueryHookCreator'
import { GET_ANNOUNCEMENTS } from '@slate/graphql/schemas/announcements/queries'
import { Parameter } from '@slate/types/Parameters'
import { CREATE_ANNOUNCEMENT, DELETE_ANNOUNCEMENT, UPDATE_ANNOUNCEMENT } from './mutations'

export const useCreateAnnouncement: SlateMutationHook<CreateAnnouncementMutationVariables> = (options) => {
   
   return useMutationHookCreator(CREATE_ANNOUNCEMENT, {
      refetchQueries: [
         { query: GET_ANNOUNCEMENTS },
         'GetAnnouncements',
      ],
      ...options,
   })
   
}

export const getAnnouncements = (course_id: Parameter<string>) => {
   return useQueryHookCreator<Announcements[] | null>(
      "announcements",
      GET_ANNOUNCEMENTS,
      "array",
      {
         variables: { course_id: course_id },
         fetchPolicy: 'cache-first',
      })
}

export const useUpdateAnnouncement = () => {
   return useMutationHookCreator(UPDATE_ANNOUNCEMENT, {
      refetchQueries: [{ query: GET_ANNOUNCEMENTS }, 'GetAnnouncements'],
      successAlert: { type: "toast", title: "Announcement updated" },
   })
}


export const useDeleteAnnouncement: SlateMutationHook<any> = (options) => {
   return useMutationHookCreator(DELETE_ANNOUNCEMENT, {
      refetchQueries: [{ query: GET_ANNOUNCEMENTS }, 'GetAnnouncements'],
      successAlert: { type: "toast", title: "Announcement deleted" },
      ...options
   })
}
