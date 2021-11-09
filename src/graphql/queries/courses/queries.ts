import { gql } from '@apollo/client'


export const GET_COURSE_BY_ID = gql`
    fragment otherUser on users {
        id
        title
        image
        first_name
        last_name
        middle_name
        username
    }

    query GetCourseById($id: uuid!) {
        courses(order_by: {name: asc}, limit: 1, where: {id: {_eq: $id}}) {
            access_code
            available
            banner_color
            background_color
            banner_image
            description
            duration
            schedule
            id
            instructor {
                ...otherUser
            }
            instructor_id
            level
            name
            #            management {
            #                course_id
            #                id
            #                manager_id
            #                manager {
            #                    ...otherUser
            #                }
            #            }
        }
    }
`

export const GET_ALL_COURSE_ENROLLMENTS = gql`
    query GetAllCourseEnrollments {
        course_enrollment {
            course {
                name
                access_code
                available
                background_color
                banner_color
                banner_image
                description
                duration
                id
                schedule
                instructor_id
                level
                instructor {
                    first_name
                    middle_name
                    last_name
                    image
                }
            }
        }
    }
`

export const GET_COURSE_ENROLLMENTS = gql`
    query GetCourseEnrollments($course_id: uuid!) {
        course_enrollment(where: {course_id: {_eq: $course_id}}) {
            course {
                name
                access_code
                available
                background_color
                banner_color
                banner_image
                description
                duration
                id
                schedule
                instructor_id
                level
                instructor {
                    first_name
                    middle_name
                    last_name
                    image
                }
            }
        }
    }
`

export const GET_ALL_COURSE_MANAGEMENTS = gql`
    query GetAllCourseManagements {
        course_management {
            id,
            manager {
                first_name
                middle_name
                last_name
                image
                id
            }
            course {
                access_code
                available
                background_color
                banner_color
                banner_image
                description
                duration
                id
                instructor_id
                level
                name
                schedule
                instructor {
                    first_name
                    middle_name
                    last_name
                    image
                    id
                }
                enrollments {
                    id
                    student {
                        first_name
                        last_name
                        middle_name
                        image
                    }
                }
            }
        }
    }
`

export const GET_COURSE_MANAGEMENTS = gql`
    query getCourseManagements($course_id: uuid!) {
        course_management(where: {course_id: {_eq: $course_id}}) {
            id,
            manager {
                first_name
                middle_name
                last_name
                image
                id
            }
            course {
                access_code
                available
                background_color
                banner_color
                banner_image
                description
                duration
                id
                instructor_id
                level
                name
                schedule
                instructor {
                    first_name
                    middle_name
                    last_name
                    image
                    id
                }
                enrollments {
                    id
                    student {
                        first_name
                        last_name
                        middle_name
                        image
                    }
                }
            }
        }
    }
`

export const GET_OWN_COURSES = gql`
    query GetOwnCourses {
        courses(order_by: {name: asc}) {
            access_code
            available
            background_color
            banner_color
            banner_image
            description
            duration
            id
            level
            instructor_id
            name
            enrollments {
                id
                student {
                    first_name
                    last_name
                    middle_name
                    image
                }
            }
        }
    }
`
