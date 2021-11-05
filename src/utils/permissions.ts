import { SlateCourse } from 'slate/types/Course'
import { Parameter } from 'slate/types/Parameters'
import { SlateRoles, SlateUser } from 'slate/types/User'

export const rolesMap: any = [
   'student',
   'grader',
   'assistant',
   'instructor',
]

export const Permissions = {
   only: (user: Parameter<SlateUser>, ...roles: SlateRoles[]) => {
      if (user) {
         // @ts-ignore
         return roles.includes(user.role)
      }
      return false
   },
   isInstructorOfCourse: (user: Parameter<SlateUser>, course: Parameter<SlateCourse>) => {
      return user?.id === course?.instructor_id
   },
   
}
