import {
   Assignments, CreateAssessmentSubmissionMutationVariables, CreateAssignmentMutationVariables, CreateQuestionMutationVariables,
   CreateTestMutationVariables, DeleteQuestionMutationVariables, EditAssignmentMutationVariables, EditTestMutationVariables, Gradebook_Items,
   RemoveTestQuestionMutationVariables, Test_Questions, UpdateQuestionContentMutationVariables,
} from '@slate/generated/graphql'
import { useLazyQueryHookCreator } from '@slate/graphql/hooks/useLazyQueryHookCreator'
import { SlateMutationHook, useMutationHookCreator } from '@slate/graphql/hooks/useMutationHookCreator'
import { useSubscriptionHookCreator } from '@slate/graphql/hooks/useSubscriptionHookCreator'
import {
   CREATE_ASSESSMENT_SUBMISSION, CREATE_ASSIGNMENT, CREATE_QUESTION, CREATE_TEST, DELETE_QUESTION, EDIT_ASSIGNMENT, EDIT_TEST, REMOVE_TEST_QUESTION,
   UPDATE_QUESTION_CONTENT, UPDATE_TEST_QUESTION_ORDER,
} from '@slate/graphql/schemas/gradebook_items/mutations'
import { GET_ASSIGNMENT, GET_GRADEBOOK_ITEMS, GET_TEST_QUESTIONS_QUERY } from '@slate/graphql/schemas/gradebook_items/queries'
import { GET_TEST_QUESTIONS } from '@slate/graphql/schemas/gradebook_items/subscriptions'
import { useCurrentGroup } from '@slate/hooks/settings/useCurrentGroup'
import { useCurrentUser } from '@slate/hooks/useCurrentUser'
import { useUserRole } from '@slate/hooks/useUserRole'


/**
 * Test Questions
 */

export const getTestQuestionSubscription = (test_id: string) => {
   return useSubscriptionHookCreator<Test_Questions[] | null>('test_questions', GET_TEST_QUESTIONS, 'array', {
      variables: { test_id },
   })
}
export const getLazyTestQuestions = (test_id: string) => {
   return useLazyQueryHookCreator<Test_Questions[] | null>('test_questions', GET_TEST_QUESTIONS_QUERY, 'array', {
      variables: { test_id },
   })
}

export const useCreateQuestion: SlateMutationHook<CreateQuestionMutationVariables> = (options?) => {
   return useMutationHookCreator(CREATE_QUESTION, {
      ...options,
   })
}

export const useUpdateQuestionContent: SlateMutationHook<UpdateQuestionContentMutationVariables> = (options?) => {
   return useMutationHookCreator(UPDATE_QUESTION_CONTENT, {
      ...options,
   })
}

export const useDeleteQuestion: SlateMutationHook<DeleteQuestionMutationVariables> = (options?) => {
   return useMutationHookCreator(DELETE_QUESTION, {
      ...options,
   })
}

export const useRemoveTestQuestion: SlateMutationHook<RemoveTestQuestionMutationVariables> = (options?) => {
   return useMutationHookCreator(REMOVE_TEST_QUESTION, {
      ...options,
   })
}


export const useChangeTestQuestionOrder = () => {
   
   return useMutationHookCreator(
      UPDATE_TEST_QUESTION_ORDER, {},
   )
}

/**
 * Assignments
 */

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
   const group = useCurrentGroup()
   const { isReallyAssistantOrInstructor } = useUserRole()
   const where = !!group ?
      { _or: [{ student_id: { _eq: user.id } }, { group_id: { _eq: group.id } }] } :
      { student_id: { _eq: user.id } }
   
   return useLazyQueryHookCreator<Gradebook_Items[] | null>("gradebook_items", GET_GRADEBOOK_ITEMS, "array", {
      variables: { course_id, student_id: user.id, is_assigned: user.id, where: where },
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'cache-and-network',
      debug: false,
   })
}

export const getLazyAssignment = () => {
   const user = useCurrentUser()
   const group = useCurrentGroup()
   const where = !!group ?
      { _or: [{ student_id: { _eq: user.id } }, { group_id: { _eq: group.id } }] } :
      { student_id: { _eq: user.id } }
   
   return useLazyQueryHookCreator<Assignments | null>("assignments", GET_ASSIGNMENT, "object", {
      variables: {
         student_id: user.id,
         where: where,
      },
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'cache-and-network',
      debug: false,
   })
}
