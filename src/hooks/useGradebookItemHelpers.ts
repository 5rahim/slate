import { GetGradebookItemsQuery, Gradebook_Items } from '@slate/generated/graphql'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useCurrentUser } from '@slate/hooks/useCurrentUser'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useUserRole } from '@slate/hooks/useUserRole'
import { Parameter } from '@slate/types/Parameters'
import { Utils } from '@slate/utils'
import differenceInDays from 'date-fns/differenceInDays'

export const useGradebookItemHelpers = () => {
   const cmf = useCMF()
   const user = useCurrentUser()
   const {isReallyAssistantOrInstructor, isAssistantOrInstructor} = useUserRole()
   const course = useCurrentCourse()
   const t = useTypeSafeTranslation()
   const {formatDistanceToNow, formatDate} = useDateFormatter()
   
   return {
   
      /** All **/
      gbi_totalSubmissionCount: (gradebookItem: Parameter<Gradebook_Items | GetGradebookItemsQuery['gradebook_items'][0]>) => {
        return (gradebookItem as GetGradebookItemsQuery['gradebook_items'][0])?.total_submissions?.aggregate?.count as number
      },
   
      /** All **/
      gbi_maxSubmissions: (gradebookItem: Parameter<Gradebook_Items | GetGradebookItemsQuery['gradebook_items'][0]>) => {
        return (gradebookItem as GetGradebookItemsQuery['gradebook_items'][0])?.assign_to?.length
      },
      
      gbi_submissionCount: (gradebookItem: Parameter<Gradebook_Items>) => {
        return gradebookItem?.submissions_aggregate?.aggregate?.count as number
      },
      
      /**
       * See if student has submitted an attempt
       */
      gbi_hasSubmittedAttempt: (gradebookItem: Parameter<Gradebook_Items>): boolean => {
         const submissionCount = gradebookItem?.submissions_aggregate?.aggregate?.count
         return submissionCount ? submissionCount > 0 : false
      },
      
      /**
       * See student's submission count
       */
      gbi_submittedAttemptCount: (gradebookItem: Parameter<Gradebook_Items>): number => {
         return gradebookItem?.submissions_aggregate?.aggregate?.count ?? 0
      },
      
      /**
       * See if student can submit more attempts
       */
      gbi_canSubmit: (gradebookItem: Parameter<Gradebook_Items>): boolean => {
         const attemptCount = gradebookItem?.attempts_allowed ?? 0
         const submissionCount = gradebookItem?.submissions_aggregate?.aggregate?.count ?? 0
         return submissionCount < attemptCount
      },
      
      /**
       * See if student is accommodated
       */
      gbi_isAccommodated: (gradebookItem: Parameter<Gradebook_Items>): boolean => {
         const accommodations: number[] = gradebookItem?.accommodations ? JSON.parse(gradebookItem.accommodations) : []
         return accommodations.includes(user.id)
      },
   
      
      /**
       * See if student is assigned
       * Return true if the user is an instructor
       */
      gbi_isAssigned: (gradebookItem: Parameter<Gradebook_Items>): boolean => {
         const assignments: number[] = gradebookItem?.assign_to
         return assignments?.includes(user.id) || isReallyAssistantOrInstructor
      },
   
      /**
       * Get student's final grade
       */
      gbi_finalGrade: (gradebookItem: Parameter<Gradebook_Items>) => {
         if(!gradebookItem) return '_'
         const points = gradebookItem.grade_items[0]?.points
         if(!points) return '_'
         const scoringType = gradebookItem.scoring_type
         if(scoringType === 'points')
            return points + '/' + gradebookItem.max_points
         else
            return points + '%'
      },
      
      
      gbi_dueDays: (gradebookItem: Parameter<Gradebook_Items>) => {
         if(!gradebookItem) return 'N/A'
         const diff = differenceInDays(new Date(gradebookItem.available_until), new Date())
         return diff > 0 ? diff : 0
      },
      
      gbi_dueDate: (gradebookItem: Parameter<Gradebook_Items>) => {
         const dateHasPassed = Utils.Dates.dateHasPassed(gradebookItem?.available_until)
         if(!dateHasPassed) {
            return gradebookItem?.available_until ? t('course:Due in') + ' ' + formatDate(gradebookItem.available_until, 'long with hours') : t('course:No due date')
         } else {
            return t('course:Due on') + ' ' + formatDate(gradebookItem?.available_until, 'long with hours')
         }
      },
   
      gbi_dueDateColor: (gradebookItem: Parameter<Gradebook_Items>, hasSubmittedAnAttempt: boolean) => {
         const dateHasPassed = Utils.Dates.dateHasPassed(gradebookItem?.available_until)
         
         if(!gradebookItem?.available_until ||isAssistantOrInstructor) return 'gray.700'
         if(hasSubmittedAnAttempt) return 'gray.700'
         
         if(!dateHasPassed) {
            if(differenceInDays(new Date(gradebookItem.available_until), new Date()) < 2) {
               return 'orange.500'
            } else {
               return 'green.500'
            }
         } else {
            return 'red.500'
         }
      }
   
   }
   
}
