import { LoadingScreen } from '@slate/components/UI/LoadingScreen'
import { getCourseById, getStudentEnrollments } from '@slate/graphql/schemas/courses/hooks'
import { useUserSessionProfile } from '@slate/hooks/useCurrentUser'
import { useUserRole } from '@slate/hooks/useUserRole'
import { CourseActions } from '@slate/store/slices/courseSlice'
import { SlateCourse } from '@slate/types/Course'
import { Utils } from '@slate/utils'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'


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
      const [displayPage, setDisplayPage] = useState<boolean>(false)
      const { profile } = useUserSessionProfile()
      const { isStudent } = useUserRole()
      
      if (!course_id)
         return router.push(Utils.Url.accessDeniedLink(props.iid))
      
      const [course, courseIsLoading] = getCourseById(course_id as string)
      
      const [enrollment, enrollmentIsLoading] = getStudentEnrollments(course_id as string)
      
      useEffect(() => {
         console.log(course?.available)
         /**
          * Give access when:
          * AND course exists
          * AND (Enrollment exists and is authorized when student OR is not student)
          */
         if (!courseIsLoading && !enrollmentIsLoading && !!course && ( ( !!enrollment && enrollment[0].authorized && course.available && isStudent ) || !isStudent )) {
            setDisplayPage(true)
            dispatch(CourseActions.set(course as SlateCourse))
            /**
             * Refuse access when:
             * AND course doesn't exist
             * OR (Is not enrolled as student OR Is enrolled but not authorized as student)
             */
         } else if (( !courseIsLoading && !enrollmentIsLoading ) && ( !course || ( !enrollment && isStudent ) || ( !!enrollment && !enrollment[0].authorized && isStudent ) || !course.available )) {
            router.push(Utils.Url.accessDeniedLink(props.iid))
         }
         
      }, [course, enrollment, isStudent])
      
      return displayPage ? <Component {...props} course={course} /> : <LoadingScreen />
      
      
   }
   
   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      Course.getInitialProps = Component.getInitialProps
   }
   
   return Course
}
