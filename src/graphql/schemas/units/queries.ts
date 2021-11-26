import { gql } from '@apollo/client'

export const GET_UNITS = gql`
    query GetUnits($course_id: uuid = "") {
        units(order_by: {order: asc}, where: {course_id: {_eq: $course_id}}) {
            archived
            available
            course_id
            id
            is_scheduled
            name
            number
            order
            publish_on
            type
        }
    }

`
