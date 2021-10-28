import { gql } from '@apollo/client'
import OtherUser from '../../fragments/OtherUser'


export const GET_COURSE_BY_ID = gql`
${OtherUser}

query GetCourseById($id: uuid = "", $user_id: Int = 10) {
  courses(limit: 1, where: {_and: {id: {_eq: $id}, _or: [{instructor_id: {_eq: $user_id}}, {_and: {enrollments: {student_id: {_eq: $user_id}}},  available: {_eq: true} }]}}) {
    access_code
    available
    banner_color
    background_color
    banner_image
    description
    duration
    id
    instructor {
      ...otherUser
    }
    instructor_id
    level
    name
    management {
      course_id
      id
      manager_id
      manager {
        ...otherUser
      }
    }
  }
}
`
