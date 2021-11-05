import { gql } from '@apollo/client'


export const GET_USER_BY_EMAIL_QUERY = gql`
    fragment baseUser on users {
        id
        title
        birthdate
        city
        country
        created_at
        department
        education_level
        email
        email_verified
        first_name
        gender
        home_phone
        image
        is_active
        job_title
        last_name
        middle_name
        mobile_phone
        name
        other_name
        postal_code
        role
        school_id
        state
        street_1
        street_2
        student_id
        suffix
        updated_at
        username
        work_phone
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
