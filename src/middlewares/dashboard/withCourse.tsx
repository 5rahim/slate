import { LoadingScreen } from '@slate/components/UI/LoadingScreen'
import { SlateCourse } from '@slate/types/Course'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCourseById } from '../../graphql/queries/courses/hooks'
import { CourseActions } from '../../store/slices/courseSlice'
import { Utils } from '../../utils'


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
      
      if (!course_id)
         return router.push(Utils.Url.accessDeniedLink(props.iid))
      
      const [course, courseIsLoading] = getCourseById(course_id as string)
      
      useEffect(() => {
         
         if (!courseIsLoading && !!course) {
            setDisplayPage(true)
            dispatch(CourseActions.set(course as SlateCourse))
         } else if (!courseIsLoading && !course) {
            router.push(Utils.Url.accessDeniedLink(props.iid))
         }
         
      }, [courseIsLoading, course])
      
      return displayPage ? <Component {...props} course={course} /> : <LoadingScreen />
      
      
   }
   
   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      Course.getInitialProps = Component.getInitialProps
   }
   
   return Course
}
