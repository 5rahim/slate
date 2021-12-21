import { CreateAssignmentMutationVariables, EditAssignmentMutationVariables, Gradebook_Items } from '@slate/generated/graphql'
import { useLazyQueryHookCreator } from '@slate/graphql/hooks/useLazyQueryHookCreator'
import { SlateMutationHook, useMutationHookCreator } from '@slate/graphql/hooks/useMutationHookCreator'
import { CREATE_ASSIGNMENT, EDIT_ASSIGNMENT } from '@slate/graphql/schemas/gradebook_items/mutations'
import { GET_GRADEBOOK_ITEMS } from '@slate/graphql/schemas/gradebook_items/queries'

export const useCreateAssignment: SlateMutationHook<CreateAssignmentMutationVariables> = (options) => {
   
   return useMutationHookCreator(CREATE_ASSIGNMENT, {
      refetchQueries: [
         { query: GET_GRADEBOOK_ITEMS },
         'GetGradebookItems',
      ],
      ...options,
   })
   
}

export const useEditAssignment: SlateMutationHook<EditAssignmentMutationVariables> = (options) => {
   
   return useMutationHookCreator(EDIT_ASSIGNMENT, {
      refetchQueries: [
         { query: GET_GRADEBOOK_ITEMS },
         'GetGradebookItems',
      ],
      ...options,
   })
   
}


export const getLazyGradebookItems = (course_id: string, withEnrollment: boolean) => {
   return useLazyQueryHookCreator<Gradebook_Items[] | null>("gradebook_items", GET_GRADEBOOK_ITEMS, "array", {
      variables: { course_id, with_enrollment: withEnrollment },
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'cache-and-network',
      debug: false,
   })
}
