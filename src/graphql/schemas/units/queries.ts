import { gql } from '@apollo/client'


/**
 * I have to add "order_by: {available_from: desc}" because of a bug where Hasura returns available_from in non-UTC format
 */

export const GET_UNIT_BY_ID = gql`
    query GetUnitById($id: uuid!) {
        units(limit: 1, where: {id: {_eq: $id}}, order_by: {available_from: desc}) {
            archived
            status
            course_id
            id
            number
            order
            available_from
            title
            type
        }
    }

`

export const GET_UNITS = gql`
    query GetUnits($course_id: uuid!) {
        units(order_by: {order: asc}, where: {_and: {course_id: {_eq: $course_id}, archived: {_eq: false}}}) {
            archived
            status
            course_id
            id
            title
            number
            order
            available_from
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
            status
            course_id
            id
            title
            number
            order
            available_from
            type
        }
    }
`
