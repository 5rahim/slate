import { gql } from '@apollo/client'


export const CREATE_MODULE = gql`
    mutation CreateModule($content: String!, $order: Int!, $unit_id: uuid!, $type: String!) {
        insert_modules(objects: {content: $content, order: $order, unit_id: $unit_id, type: $type}) {
            affected_rows
        }
    }
`

export const GET_MODULES = gql`
    query GetModules($unit_id: uuid!) {
        modules(where: {unit_id: {_eq: $unit_id}}, order_by: {order: asc}) {
            content
            id
            order
            publish_on
            status
            type
            unit_id
        }
    }
`

export const UPDATE_MODULE_ORDER = gql`
    mutation UpdateModuleOrder($objects: [modules_insert_input!]!) {
        insert_modules(objects: $objects, on_conflict: {constraint: module_pkey, update_columns: order}) {
            affected_rows
        }
    }
`

export const MOVE_MODULE = gql`
    mutation MoveModule($id: uuid!, $order: Int!, $unit_id: uuid!) {
        update_modules_by_pk(pk_columns: {id: $id}, _set: {order: $order, unit_id: $unit_id}) {
            id
        }
    }
`

export const DELETE_MODULE = gql`
    mutation DeleteModule($id: uuid!) {
        delete_modules_by_pk(id: $id) {
            id
        }
    }
`


export const UPDATE_MODULE = gql`
    mutation UpdateModule($id: uuid!, $content: String!, $status: String!, $publish_on: timestamp!) {
        update_modules_by_pk(pk_columns: {id: $id}, _set: {content: $content, status: $status, publish_on: $publish_on}) {
            id
        }
    }
`
