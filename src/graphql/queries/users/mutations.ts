import { gql } from '@apollo/client'

export const UPDATE_NEW_USER = gql`
mutation UpdateNewUser($email: String = "", $first_name: String = "", $last_name: String = "", $middle_name: String = "", $school_id: Int = 10, $username: String = "", $student_id: String = "", $role: Int = 10) {
  update_users(where: {email: {_eq: $email}}, _set: {first_name: $first_name, last_name: $last_name, middle_name: $middle_name, school_id: $school_id, username: $username, student_id: $student_id, role: $role, is_active: true}) {
    affected_rows
    returning {
      first_name
      middle_name
      last_name
      student_id
      username
      school_id
      email
      name
      image
      id
      role
    }
  }
}
`
