import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useCurrentUser } from '@slate/hooks/useCurrentUser'

export const useCurrentGroup = () => {
   const course = useCurrentCourse()
   const user = useCurrentUser()
   const data = user.group_membership?.filter((a) => a.group?.course_id === course?.id)[0]
  
   return data?.group
}
