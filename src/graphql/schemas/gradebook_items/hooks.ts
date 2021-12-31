import {
   Assignments, CreateAssessmentSubmissionMutationVariables, CreateAssignmentMutationVariables, CreateTestMutationVariables,
   EditAssignmentMutationVariables, EditTestMutationVariables, Gradebook_Items,
} from '@slate/generated/graphql'
import { useLazyQueryHookCreator } from '@slate/graphql/hooks/useLazyQueryHookCreator'
import { SlateMutationHook, useMutationHookCreator } from '@slate/graphql/hooks/useMutationHookCreator'
import {
   CREATE_ASSESSMENT_SUBMISSION, CREATE_ASSIGNMENT, CREATE_TEST, EDIT_ASSIGNMENT, EDIT_TEST,
} from '@slate/graphql/schemas/gradebook_items/mutations'
import { GET_ASSIGNMENT, GET_GRADEBOOK_ITEMS } from '@slate/graphql/schemas/gradebook_items/queries'
import { useCurrentUser } from '@slate/hooks/useCurrentUser'
import { useUserRole } from '@slate/hooks/useUserRole'

export const useCreateAssessmentSubmission: SlateMutationHook<CreateAssessmentSubmissionMutationVariables> = (options) => {
   
   return useMutationHookCreator(CREATE_ASSESSMENT_SUBMISSION, {
      refetchQueries: [
         { query: GET_GRADEBOOK_ITEMS },
         'GetGradebookItems',
      ],
      // successAlert: { type: "toast", title: "Assignment created" },
      ...options,
   })
   
}
export const useCreateAssignment: SlateMutationHook<CreateAssignmentMutationVariables> = (options) => {
   
   return useMutationHookCreator(CREATE_ASSIGNMENT, {
      refetchQueries: [
         { query: GET_GRADEBOOK_ITEMS },
         'GetGradebookItems',
      ],
      successAlert: { type: "toast", title: "Assignment created" },
      ...options,
   })
   
}

export const useEditAssignment: SlateMutationHook<EditAssignmentMutationVariables> = (options) => {
   
   return useMutationHookCreator(EDIT_ASSIGNMENT, {
      refetchQueries: [
         { query: GET_GRADEBOOK_ITEMS },
         'GetGradebookItems',
      ],
      successAlert: { type: "toast", title: "Assignment updated" },
      ...options,
   })
   
}


export const useCreateTest: SlateMutationHook<CreateTestMutationVariables> = (options) => {
   
   return useMutationHookCreator(CREATE_TEST, {
      refetchQueries: [
         { query: GET_GRADEBOOK_ITEMS },
         'GetGradebookItems',
      ],
      successAlert: { type: "toast", title: "Test created" },
      ...options,
   })
   
}

export const useEditTest: SlateMutationHook<EditTestMutationVariables> = (options) => {
   
   return useMutationHookCreator(EDIT_TEST, {
      refetchQueries: [
         { query: GET_GRADEBOOK_ITEMS },
         'GetGradebookItems',
      ],
      successAlert: { type: "toast", title: "Test updated" },
      ...options,
   })
   
}


export const getLazyGradebookItems = (course_id: string, withEnrollment: boolean) => {
   const user = useCurrentUser()
   const {isReallyAssistantOrInstructor} = useUserRole()
   return useLazyQueryHookCreator<Gradebook_Items[] | null>("gradebook_items", GET_GRADEBOOK_ITEMS, "array", {
      variables: { course_id, student_id: user.id, is_assigned: user.id },
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'cache-and-network',
      debug: false,
   })
}

export const getLazyAssignment = () => {
   const user = useCurrentUser()
   
   return useLazyQueryHookCreator<Assignments | null>("assignments", GET_ASSIGNMENT, "object", {
      variables: { student_id: user.id },
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'cache-and-network',
      debug: false,
   })
}
