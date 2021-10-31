import SlateUser, { SlateRoles } from '../graphql/types/User'
import { SlateCourse } from '../graphql/types/Course'

export const rolesMap: any = [
   'student',
   'grader',
   'assistant',
   'instructor',
]

export const Permissions = {
   only: (user: SlateUser | undefined, ...roles: SlateRoles[]) => {
      if(user) {
         return roles.includes(user.role);
      }
      return false
   },
   isInstructorOfCourse: (user: SlateUser | undefined, course: SlateCourse) => {
      return user?.id === course?.instructor_id
   }

}
