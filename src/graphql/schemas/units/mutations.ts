import { gql } from '@apollo/client'

export const CREATE_UNIT = gql`
    mutation CreateUnit($available: Boolean!, $course_id: uuid!, $id: uuid!, $is_scheduled: Boolean!, $name: String, $number: String!, $order: Int!, $publish_on: timestamp, $type: String!) {
        insert_units(objects: {archived: false, available: $available, course_id: $course_id, id: $id, is_scheduled: $is_scheduled, name: $name, number: $number, order: $order, publish_on: $publish_on, type: $type}) {
            affected_rows
        }
    }
`

export const ARCHIVE_UNIT = gql`
    mutation ArchiveUnit($id: uuid!, $archived: Boolean!) {
        update_units_by_pk(pk_columns: {id: $id}, _set: {archived: $archived}) {
            id
        }
    }
`


export const UPDATE_UNIT_DETAILS = gql`
    mutation UpdateUnit($id: uuid!, $type: String!, $publish_on: timestamp, $number: String!, $name: String, $is_scheduled: Boolean!) {
        update_units_by_pk(pk_columns: {id: $id}, _set: {name: $name, number: $number, publish_on: $publish_on, type: $type, is_scheduled: $is_scheduled}) {
            id
        }
    }
`

export const CHANGE_UNIT_ORDER = gql`
    mutation ChangeUnitOrder($id: uuid!, $order: Int!) {
        update_units_by_pk(pk_columns: {id: $id}, _set: {order: $order}) {
            id
        }
    }
`
