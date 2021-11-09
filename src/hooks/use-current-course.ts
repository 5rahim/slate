import { CourseSelectors } from '@slate/store/slices/courseSlice'
import { useSelector } from 'react-redux'

export const useCurrentCourse = () => {
   return useSelector(CourseSelectors.get)
}
