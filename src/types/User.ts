import { Users } from '@slate/generated/graphql'

export type SlateRoles = "admin" | "student" | "instructor" | "assistant"

export type SlateUser = Users

// export default interface SlateUser {
//    email: string
//    first_name: string
//    image: string
//    id: number
//    middle_name: string
//    last_name: string
//    name: string
//    username: string
//    school_id: number
//    role: SlateRoles
//    postal_code: string
//    other_name: string
//    state: string
//    street_1: string
//    street_2: string
//    student_id: string
//    title: string
//    suffix: string
//    updated_at: string
//    work_phone: string
//    home_phone: string
//    gender: string
//    is_active: boolean
//    job_title: string
//    email_verified: string
//    mobile_phone: string
//    education_level: string
//    department: string
//    created_at: string
//    country: string
//    city: string
//    birthdate: string
//    school: SlateSchool
//    enrolled_courses: EnrolledCourse[] | []
//    managing_courses: ManagingCourse[] | []
//    own_courses: SlateCourse[] | []
// }
