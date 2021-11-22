import { useUserSessionProfile } from '@slate/hooks/useCurrentUser'

export const useUserRole = () => {
   
   const { profile } = useUserSessionProfile()
   
   return {
      isStudent: profile?.role === 'student',
      isInstructor: profile?.role === 'instructor',
      isAssistant: profile?.role === 'assistant',
      isAssistantOrInstructor: profile?.role === 'instructor' || profile?.role === 'assistant'
   }
   
}
