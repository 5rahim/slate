import { Courses } from '@slate/generated/graphql'
import { CourseSelectors } from '@slate/store/slices/courseSlice'
import { useSelector } from 'react-redux'

export const useCurrentCourse = () => {
   // TODO: Might throw errors when course is undefined
   return useSelector(CourseSelectors.getCourse) as Courses
}
