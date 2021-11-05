import { gql } from '@apollo/client'

export const GET_SCHOOL_BY_SHORT_NAME_QUERY = gql`
    query GetSchoolByShortName($short_name: String!) {
        schools(limit: 1, where: {short_name: {_eq: $short_name}}) {
            id
            is_active
            name
            short_name
            type
        }
    }
`

