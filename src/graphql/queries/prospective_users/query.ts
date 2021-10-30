import { gql } from '@apollo/client'

export const GET_PROSPECTIVE_USER_BY_STUDENT_ID_AND_CODE_QUERY = gql`
query MyQuery($student_id: String = "", $code: String = "") {
  prospective_users(where: {_and: {student_id: {_eq: $student_id}, code: {_eq: $code}}}) {
    id
    registration_step
    email
    code
    first_name
    is_active
    last_name
    middle_name
    role
    school_id
    student_id
    username
    school {
      short_name
    }
  }
}
`


export const GET_PROSPECTIVE_USER_QUERY_BY_STUDENT_ID = gql`
query MyQuery($student_id: String = "") {
  prospective_users(limit: 1, where: {student_id: {_eq: $student_id}}) {
    code
    email
    first_name
    id
    is_active
    last_name
    middle_name
    phone
    school_id
    student_id
    username
    role
  }
}

`


export const GET_PROSPECTIVE_USER_QUERY_BY_EMAIL = gql`
query MyQuery($email: String = "") {
  prospective_users(limit: 1, where: {email: {_eq: $email}}) {
    code
    email
    first_name
    id
    is_active
    last_name
    middle_name
    phone
    school_id
    student_id
    username
    role
  }
}

`
