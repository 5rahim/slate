import { gql } from '@apollo/client'

export const CREATE_UNIT = gql`
    mutation CreateUnit($status: String!, $course_id: uuid!, $title: String, $number: String!, $order: Int!, $available_from: timestamp, $type: String!) {
        insert_units(objects: {archived: false, status: $status, course_id: $course_id, title: $title, number: $number, order: $order, available_from: $available_from, type: $type}) {
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

export const UPDATE_UNIT_ORDER = gql`
    mutation UpdateUnitOrder($objects: [units_insert_input!]!) {
        insert_units(objects: $objects, on_conflict: {constraint: unit_pkey, update_columns: order}) {
            affected_rows
        }
    }
`

export const UNARCHIVE_UNIT = gql`
    mutation UnarchiveUnit($id: uuid!, $order: Int!) {
        update_units_by_pk(pk_columns: {id: $id}, _set: {order: $order, archived: false}) {
            id
        }
    }
`

export const UPDATE_UNIT_DETAILS = gql`
    mutation UpdateUnitDetails($id: uuid!, $type: String!, $available_from: timestamp, $number: String!, $title: String, $status: String!) {
        update_units_by_pk(pk_columns: {id: $id}, _set: {title: $title, number: $number, available_from: $available_from, type: $type, status: $status}) {
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
