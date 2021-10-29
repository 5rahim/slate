import { gql } from '@apollo/client'

export const UPDATE_PROSPECTIVE_USER_EMAIL = gql`
mutation MyMutation($student_id: String = "", $email: String = "", $registration_step: Int = 10) {
  update_prospective_users(where: {student_id: {_eq: $student_id}}, _set: {email: $email, registration_step: $registration_step}) {
    affected_rows
  }
}
   `
