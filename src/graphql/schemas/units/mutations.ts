import { gql } from '@apollo/client'

export const CREATE_UNIT = gql`
    mutation CreateUnit($available: Boolean!, $course_id: uuid!, $is_scheduled: Boolean!, $title: String, $number: String!, $order: Int!, $publish_on: timestamp, $type: String!) {
        insert_units(objects: {archived: false, available: $available, course_id: $course_id, is_scheduled: $is_scheduled, title: $title, number: $number, order: $order, publish_on: $publish_on, type: $type}) {
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
    mutation UpdateUnitDetauks($id: uuid!, $type: String!, $publish_on: timestamp, $number: String!, $title: String, $is_scheduled: Boolean!) {
        update_units_by_pk(pk_columns: {id: $id}, _set: {title: $title, number: $number, publish_on: $publish_on, type: $type, is_scheduled: $is_scheduled}) {
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
