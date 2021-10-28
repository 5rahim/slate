import SlateUser from '../graphql/types/User'
import { SlateCourse } from '../graphql/types/Course'

export const rolesMap: any = {
   'student': 1,
   'grader': 2,
   'assistant': 3,
   'instructor': 4,
}

export const Permissions = {
   only: (user: SlateUser | undefined, ...roles: string[]) => {
      let hasAccess: number = 0
      if(user) {
         for (let i = 0; i < roles.length; i++) {
            const role = roles[i]
            if (user.role == rolesMap[role])
               hasAccess += 1
         }
         return hasAccess !== 0;
      }
      return false
   },
   isInstructorOfCourse: (user: SlateUser | undefined, course: SlateCourse) => {
      return user?.id === course?.instructor_id
   }

}
