import { gql } from '@apollo/client'

export const GET_ANNOUNCEMENTS = gql`
    query GetAnnouncements($course_id: uuid!) {
        announcements(where: {course_id: {_eq: $course_id}}, order_by: {publish_on: desc}) {
            id
            is_scheduled
            publish_on
            title
            message
            created_at
            course_id
            author_id
            author {
                id
                first_name
                last_name
                middle_name
                image
            }
        }
    }
`
