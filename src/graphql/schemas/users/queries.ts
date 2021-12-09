import { gql } from '@apollo/client'


export const GET_USER_BY_EMAIL = gql`
    fragment baseUser on users {
        id
        title
        created_at
        email
        email_verified
        first_name
        image
        is_active
        last_name
        middle_name
        name
        role
        school_id
        student_id
        updated_at
        username
        school {
            id
            is_active
            name
            short_name
            type
        }
    }

    query GetUserByEmail($email: String!) {
        users(where: {email: {_eq: $email}}, limit: 1) {
            ...baseUser

        }
    }
`

export const GET_USER_SETTINGS = gql`
    query GetUserSettings($email: String!) {
        users(where: {email: {_eq: $email}}, limit: 1) {
            date_format
            hour_format
        }
    }
`
