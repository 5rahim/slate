import { gql } from '@apollo/client'

export const GET_UNITS = gql`
    query GetUnits($course_id: uuid!) {
        units(order_by: {order: asc}, where: {_and: {course_id: {_eq: $course_id}, archived: {_eq: false}}}) {
            archived
            available
            course_id
            id
            is_scheduled
            title
            number
            order
            publish_on
            type
        }
    }
`

export const UNARCHIVED_UNIT_COUNT = gql`
    query UnarchivedUnitCount($course_id: uuid!) {
        units_aggregate(where: {_and: {course_id: {_eq: $course_id}, archived: {_eq: false}}}) {
            aggregate {
                count
            }
        }
    }
`

export const GET_ARCHIVED_UNITS = gql`
    query GetArchivedUnits($course_id: uuid!) {
        units(order_by: {order: asc}, where: {_and: {course_id: {_eq: $course_id}, archived: {_eq: true}}}) {
            archived
            available
            course_id
            id
            is_scheduled
            title
            number
            order
            publish_on
            type
        }
    }
`
