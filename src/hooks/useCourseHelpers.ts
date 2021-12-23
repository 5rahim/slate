import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'

export const useCourseHelpers = () => {
   
   const course = useCurrentCourse()
   
   return {
      course_enrollmentCount : course.enrollments_aggregate?.aggregate?.count ?? 0
   }
   
}
