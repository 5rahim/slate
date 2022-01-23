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

    query GetCourseById($id: uuid!, $with_details: Boolean!) {
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
            enrollments_aggregate @include(if: $with_details) {
                aggregate {
                    count
                }
            }
            management @include(if: $with_details) {
                course_id
                id
                manager_id
                manager {
                    ...otherUser
                }
            }
            enrollments @include(if: $with_details) {
                authorized
                authorized_at
                course_id
                created_at
                id
                student_id
                student {
                    ...otherUser
                }
            }
            groups {
                id
                name
                membership_aggregate {
                    aggregate {
                        count
                    }
                }
                membership {
                    student {
                        ...otherUser
                    }
                    id
                    group_id
                    student_id
                }
            }
        }
    }
`

export const GET_ALL_COURSE_ENROLLMENTS = gql`
    query GetAllCourseEnrollments {
        course_enrollment {
            id,
            course_id,
            student_id,
            authorized,
            created_at,
            authorized_at,
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
            id,
            course_id,
            student_id,
            authorized,
            created_at,
            authorized_at,
            student {
                id
                title
                image
                first_name
                last_name
                middle_name
                username
            }
        }
    }
`

export const GET_VALID_COURSE_ENROLLMENTS = gql`
    query GetValidCourseEnrollments($course_id: uuid!) {
        course_enrollment(where: {_and: {course_id: {_eq: $course_id}, authorized: {_eq: true}}}) {
            id,
            course_id,
            student_id,
            authorized,
            created_at,
            authorized_at,
            student {
                id
                title
                image
                first_name
                last_name
                middle_name
                username
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
    query GetCourseManagements($course_id: uuid!) {
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
