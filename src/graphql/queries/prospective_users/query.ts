import { gql } from '@apollo/client'

export const GET_PROSPECTIVE_USER_QUERY = gql`
query MyQuery($student_id: String = "", $code: String = "") {
  prospective_users(limit: 1, where: {student_id: {_eq: $student_id}, _and: {code: {_eq: $code}}}) {
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
