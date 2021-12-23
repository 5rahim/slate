import { Gradebook_Items } from '@slate/generated/graphql'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Parameter } from '@slate/types/Parameters'
import { Utils } from '@slate/utils'
import differenceInDays from 'date-fns/differenceInDays'

export const useGradebookItemHelpers = () => {
   
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
         const submissionCount = gradebookItem?.submissions_aggregate.aggregate?.count
         return submissionCount ? submissionCount > 0 : false
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
         const dateHasPassed = Utils.Dates.dateHasPassed(gradebookItem?.available_until)
         if(!gradebookItem?.available_until || hasSubmittedAnAttempt) return 'black'
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
