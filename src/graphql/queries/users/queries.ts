import { gql } from '@apollo/client'
import BaseUser from '../../fragments/BaseUser'


export const GET_USER_BY_EMAIL_QUERY = gql`
${BaseUser}

query GetUserByEmail($email: String = "") {
  users(where: {email: {_eq: $email}}, limit: 1) {
    ...baseUser
  }
}
`
