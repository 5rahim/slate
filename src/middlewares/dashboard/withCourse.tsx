import { LoadingScreen } from '@slate/components/UI/LoadingScreen'
import { getLazyCourseById, getLazyStudentEnrollments } from '@slate/graphql/schemas/courses/hooks'
import { useUserSessionProfile } from '@slate/hooks/useCurrentUser'
import { useUserRole } from '@slate/hooks/useUserRole'
import { CourseActions, CourseSelectors } from '@slate/store/slices/courseSlice'
import { Utils } from '@slate/utils'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


interface WithCourseProps {

}

/**
 * Secures course pages
 * Stores course data
 * @param {WithCourseProps} props
 * @returns {(Component: NextPage) => (props: any) => (Promise<boolean>)}
 */
export const withCourse = (props?: WithCourseProps) => (Component: NextPage) => {
   
   const Course = (props: any) => {
      
      const router = useRouter()
      const { course_id } = router.query
      const dispatch = useDispatch()
      const { profile } = useUserSessionProfile()
      const { isReallyStudent } = useUserRole()
      
      if (!course_id)
         return router.push(Utils.Url.accessDeniedLink(props.iid))
      
      const storedCourse = useSelector(CourseSelectors.getAll)
      const [fetchCourse, course, courseIsLoading] = getLazyCourseById(course_id as string) // TODO: Change to normal fetch
      
      const [fetchEnrollment, enrollment, enrollmentIsLoading] = getLazyStudentEnrollments(course_id as string)
      
      const [displayPage, setDisplayPage] = useState<boolean>(storedCourse.isEnrolled)
   
      /**
       * If the course isn't stored in Redux,
       * Send request for course data and enrollment.
       * Otherwise, use stored course data to display page.
       */
      useEffect(() => {
         if(!!course_id && (!storedCourse.course || storedCourse.course.id !== course_id)) {
            fetchCourse && fetchCourse()
            fetchEnrollment && fetchEnrollment()
         }
         
         if(!!course_id && storedCourse && storedCourse.course && (storedCourse.course.id === course_id) && storedCourse.isEnrolled) {
            setDisplayPage(true)
         }
      }, [storedCourse])
      
      useEffect(() => {
         
         /**
          * Give access when:
          * AND course exists
          * AND (Enrollment exists and is authorized when student OR is not student)
          */
         if (!courseIsLoading && !enrollmentIsLoading && !!course && ( ( !!enrollment && enrollment[0].authorized && course.available && isReallyStudent ) || !isReallyStudent )) {
            setDisplayPage(true)
            dispatch(CourseActions.setCourse(course))
            dispatch(CourseActions.setIsEnrolled(true))
            /**
             * Refuse access when:
             * AND course doesn't exist
             * OR (Is not enrolled as student OR Is enrolled but not authorized as student)
             */
         } else if (( !courseIsLoading && !enrollmentIsLoading ) && ( !course || ( !enrollment && isReallyStudent ) || ( !!enrollment && !enrollment[0].authorized && isReallyStudent ) || !course.available )) {
            router.push(Utils.Url.accessDeniedLink(props.iid))
         }
         
      }, [course, enrollment, isReallyStudent])
      
      return displayPage ? <Component {...props} course={course} /> : <LoadingScreen text="withCourse" />
      
      
   }
   
   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      Course.getInitialProps = Component.getInitialProps
   }
   
   return Course
}
