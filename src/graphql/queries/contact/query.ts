import { gql } from '@apollo/client'

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
