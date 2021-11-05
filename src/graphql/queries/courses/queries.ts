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
        courses(limit: 1, where: {id: {_eq: $id}}) {
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
            management {
                course_id
                id
                manager_id
                manager {
                    ...otherUser
                }
            }
        }
    }
`

export const GET_COURSE_ENROLLMENTS_QUERY = gql`
    query GetCourseEnrollments {
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

export const GET_OWN_COURSES_QUERY = gql`
    query GetOwnCourses {
        courses {
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
