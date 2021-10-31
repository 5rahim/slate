import { useSelector } from 'react-redux'
import { CourseSelectors } from 'slate/store/slices/courseSlice'

export const useCurrentCourse = () => {
   return useSelector(CourseSelectors.get)
}
