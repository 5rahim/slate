import { SlateUser } from './User'
import { Courses } from 'slate/generated/graphql'

export interface DurationDateFormat {
   startDate: Date | null
   endDate: Date | null
}

export interface EnrolledCourse {
   authorized: boolean
   authorized_at?: number
   course_id: string
   created_at: string
   id: string
   student_id: number
   course: Omit<SlateCourse, "enrollments" | "management">
}

export interface ManagingCourse {
   course_id: string
   id: string
   student_id: number
   course: SlateCourse
}

// export interface SlateCourse {
//    access_code: string
//    available: boolean
//    banner_color?: string
//    background_color?: string
//    banner_image?: string
//    description?: string
//    schedule?: string
//    duration?: string
//    id: string
//    instructor_id: number
//    level?: string
//    name: string
//    instructor: SlateUser
//    enrollments?: Enrollment[]
//    management?: Management[]
// }

export type SlateCourse = Courses

export interface Enrollment {
   id: string
   course_id?: string
   student_id?: number
   student?: Omit<SlateUser, "enrolled_courses" | "managing_courses" | "own_courses">
}

export interface Management {
   id: string
   course_id: string
   manager_id?: number
   manager?: Omit<SlateUser, "enrolled_courses" | "managing_courses" | "own_courses">
}
