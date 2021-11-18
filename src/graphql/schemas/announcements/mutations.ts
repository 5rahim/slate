import { gql } from '@apollo/client'

export const CREATE_ANNOUNCEMENT = gql`
    mutation CreateAnnouncement($author_id: Int!, $course_id: uuid!, $message: String!, $publish_on: timestamp, $is_scheduled: Boolean!, $title: String!) {
        insert_announcements_one(object: {author_id: $author_id, course_id: $course_id, message: $message, publish_on: $publish_on, is_scheduled: $is_scheduled, title: $title}) {
            author_id
            course_id
            created_at
            id
            message
            publish_on
            is_scheduled
            title
        }
    }
`
