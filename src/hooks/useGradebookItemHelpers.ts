import { Gradebook_Items } from '@slate/generated/graphql'

export const useGradebookItemHelpers = () => {
   
   return {
   
      /** All **/
      gradebookItem_submissionCount: (gradebookItem: Gradebook_Items) => {
        return gradebookItem.submissions_aggregate?.aggregate?.count as number
      },
   
      /** isReallyAssistantOrInstructor **/
      gradebookItem_enrolledCount: (gradebookItem: Gradebook_Items) => {
        return gradebookItem.course?.enrollments_aggregate?.aggregate?.count ?? 0 as number
      },
      
      /**
       * See if student has submitted an attempt
       */
      gradebookItem_hasSubmittedAttempt: (gradebookItem: Gradebook_Items) => {
         const submissionCount = gradebookItem.submissions_aggregate.aggregate?.count
         return submissionCount && submissionCount > 0
      }
   
   }
   
}
