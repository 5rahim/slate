import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useCurrentSchool } from '@slate/hooks/useCurrentSchool'

export const useLinkHref = () => {
   
   const { id } = useCurrentCourse()
   const { iid } = useCurrentSchool()
   
   return {
      getCourseHref: (to: string) => {
         return {
            pathname: '/[iid]/u/course/[course_id]' + to,
            query: { course_id: id, iid },
         }
      },
      linkToUnit: (unit_id: string) => {
         return {
            pathname: '/[iid]/u/course/[course_id]/unit/[unit_id]',
            query: { course_id: id, iid, unit_id },
         }
      },
   }
   
}
