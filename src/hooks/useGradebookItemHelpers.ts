import { Gradebook_Items } from '@slate/generated/graphql'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useCurrentUser } from '@slate/hooks/useCurrentUser'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Parameter } from '@slate/types/Parameters'
import { Utils } from '@slate/utils'
import differenceInDays from 'date-fns/differenceInDays'

export const useGradebookItemHelpers = () => {
   const user = useCurrentUser()
   const course = useCurrentCourse()
   const t = useTypeSafeTranslation()
   const {formatDistanceToNow} = useDateFormatter()
   
   return {
   
      /** All **/
      gradebookItem_submissionCount: (gradebookItem: Parameter<Gradebook_Items>) => {
        return gradebookItem?.submissions_aggregate?.aggregate?.count as number
      },
      
      /**
       * See if student has submitted an attempt
       */
      gradebookItem_hasSubmittedAttempt: (gradebookItem: Parameter<Gradebook_Items>): boolean => {
         const submissionCount = gradebookItem?.submissions_aggregate?.aggregate?.count
         return submissionCount ? submissionCount > 0 : false
      },
      
      /**
       * See student's submission count
       */
      gradebookItem_submittedAttemptCount: (gradebookItem: Parameter<Gradebook_Items>): number => {
         return gradebookItem?.submissions_aggregate?.aggregate?.count ?? 0
      },
      
      /**
       * See if student can submit more attempts
       */
      gradebookItem_canSubmit: (gradebookItem: Parameter<Gradebook_Items>): boolean => {
         const attemptCount = gradebookItem?.attempts_allowed ?? 0
         const submissionCount = gradebookItem?.submissions_aggregate?.aggregate?.count ?? 0
         return submissionCount < attemptCount
      },
      
      /**
       * See if student is accomodated
       */
      gradebookItem_isAccommodated: (gradebookItem: Parameter<Gradebook_Items>): boolean => {
         const accommodations: number[] = gradebookItem?.accommodations ? JSON.parse(gradebookItem.accommodations) : []
         return accommodations.includes(user.id)
      },
   
      /**
       * Get student's final grade
       */
      gradebookItem_finalGrade: (gradebookItem: Parameter<Gradebook_Items>) => {
         if(!gradebookItem) return '_'
         const points = gradebookItem.grade_items[0]?.points
         if(!points) return '_'
         const scoringType = gradebookItem.scoring_type
         if(scoringType === 'points')
            return points + '/' + gradebookItem.max_points
         else
            return points + '%'
      },
      
      gradebookItem_dueDays: (gradebookItem: Parameter<Gradebook_Items>) => {
         if(!gradebookItem) return 'N/A'
         const diff = differenceInDays(new Date(gradebookItem.available_until), new Date())
         return diff > 0 ? diff : 0
      },
      
      gradebookItem_dueDate: (gradebookItem: Parameter<Gradebook_Items>) => {
         const dateHasPassed = Utils.Dates.dateHasPassed(gradebookItem?.available_until)
         if(!dateHasPassed) {
            return gradebookItem?.available_until ? t('course:Due in') + ' ' + formatDistanceToNow(gradebookItem.available_until) : t('course:No due date')
         } else {
            return t('course:Due') + ' ' + formatDistanceToNow(gradebookItem?.available_until, { addSuffix: true })
         }
      },
   
      gradebookItem_dueDateColor: (gradebookItem: Parameter<Gradebook_Items>, hasSubmittedAnAttempt: boolean) => {
         const cmf = useCMF()
         const dateHasPassed = Utils.Dates.dateHasPassed(gradebookItem?.available_until)
         if(!gradebookItem?.available_until || hasSubmittedAnAttempt) return cmf('black', 'white')
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
