/**
 * Check if course is available for students
 * Return course data
 */

import { NextPage } from 'next'
import { getCourseById } from '../../graphql/queries/courses/hooks'
import { useRouter } from 'next/router'
import { Utils } from '../../utils'
import { useEffect, useState } from 'react'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { useDispatch } from 'react-redux'
import { CourseActions } from '../../store/slices/courseSlice'
import { SlateCourse } from '../../graphql/types/Course'


interface WithCourseProps {

}

export const withCourse = (props?: WithCourseProps) => (Component: NextPage) => {
   
   const Course = (props: any) => {
   
      const router = useRouter()
      const { id } = router.query
      const dispatch = useDispatch()
      const [displayPage, setDisplayPage] = useState<boolean>(false)
      
      if(!id)
         return router.push(Utils.Url.accessDeniedLink(props.iid))
      
      const { loading, data: course } = getCourseById(id as string, props.user.id)
      
      useEffect(() => {
         
         if(!loading && !!course) {
            setDisplayPage(true)
            dispatch(CourseActions.set(course as SlateCourse))
         } else if(!loading && !course) {
            router.push(Utils.Url.accessDeniedLink(props.iid))
         }
         
      }, [loading, course])
      
      return displayPage ? <Component {...props} course={course} /> : <LoadingScreen />
      
      
   }
   
   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      Course.getInitialProps = Component.getInitialProps
   }
   
   return Course
}
