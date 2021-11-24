import { useUserSessionProfile } from '@slate/hooks/useCurrentUser'
import { AppSelectors } from '@slate/store/slices/appSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

/**
 * isReallyStudent and isReallyInstructor are variables used to check the user's true role even in Student View
 * @returns {{isReallyStudent: boolean, isReallyInstructor: boolean, isAssistant: boolean, isInstructor: boolean, isAssistantOrInstructor: boolean,
 *    isStudent: boolean}}
 */
export const useUserRole = () => {
   
   const { profile } = useUserSessionProfile()
   
   const studentView = useSelector(AppSelectors.studentView)
   
   useEffect(() => {
      console.log(studentView)
   }, [studentView])
   
   return {
      isReallyInstructor: profile?.role === 'instructor',
      isReallyStudent: profile?.role === 'student',
      isStudent: studentView ? true : profile?.role === 'student',
      isInstructor: studentView ? false : profile?.role === 'instructor',
      isAssistant: studentView ? false : profile?.role === 'assistant',
      isAssistantOrInstructor: studentView ? false : profile?.role === 'instructor' || profile?.role === 'assistant',
      isStudentOrAssistant: studentView ? false : profile?.role === 'student' || profile?.role === 'assistant'
   }
   
}
