import { gql } from '@apollo/client'

export const GET_SCHOOL_BY_SHORT_NAME_QUERY = gql`
query MyQuery($short_name: String = "") {
  schools(limit: 1, where: {short_name: {_eq: $short_name}}) {
    id
    is_active
    name
    short_name
    type
  }
}
`

export const GET_SCHOOL_BY_ID_QUERY = gql`
query MyQuery($id: Int = 10) {
  schools(limit: 1, where: {id: {_eq: $id}}) {
    id
    is_active
    name
    short_name
    type
  }
}
`


export const GET_SCHOOLS_QUERY = gql`
query GetSchools {
  schools {
    id
    is_active
    name
    short_name
    type
  }
}
`
