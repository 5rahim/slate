import { gql } from '@apollo/client'


export const CREATE_MODULE = gql`
    mutation CreateModule($content: String!, $order: Int!, $unit_id: uuid!, $type: String!, $folder_id: uuid, $status: String!) {
        insert_modules(objects: {content: $content, order: $order, unit_id: $unit_id, type: $type, folder_id: $folder_id, status: $status}) {
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
            available_from
            status
            type
            unit_id
            folder_id
        }
    }
`

export const GET_MODULE_BY_ID = gql`
    query GetModuleById($id: uuid!) {
        modules(where: {id: {_eq: $id}}, order_by: {order: asc}) {
            content
            id
            order
            available_from
            status
            type
            unit_id
            folder_id
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
        update_modules_by_pk(pk_columns: {id: $id}, _set: {order: $order, unit_id: $unit_id, folder_id: null}) {
            id
        }
    }
`
export const CHANGE_MODULE_FOLDER = gql`
    mutation ChangeModuleFolder($id: uuid!, $folder_id: uuid) {
        update_modules_by_pk(pk_columns: {id: $id}, _set: {folder_id: $folder_id, order: 999}) {
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
    mutation UpdateModule($id: uuid!, $content: String!, $status: String!, $available_from: timestamp!, $folder_id: uuid) {
        update_modules_by_pk(pk_columns: {id: $id}, _set: {content: $content, status: $status, available_from: $available_from, folder_id: $folder_id}) {
            id
        }
    }
`
