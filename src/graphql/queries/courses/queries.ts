import { gql } from '@apollo/client'
import OtherUser from '../../fragments/OtherUser'


export const GET_COURSE_BY_ID = gql`
${OtherUser}

query GetCourseById($id: uuid = "") {
  courses(limit: 1, where: {id: {_eq: $id}}) {
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

export const GET_COURSE_ENROLLMENTS_QUERY = gql`
query GetCourseEnrollments {
  course_enrollment {
    course {
      name
      access_code
      available
      background_color
      banner_color
      banner_image
      description
      duration
      id
      instructor_id
      level
      instructor {
        first_name
        middle_name
        last_name
        image
      }
    }
  }
}
`

export const GET_OWN_COURSES_QUERY = gql`
query GetOwnCourses {
  courses {
    access_code
    available
    background_color
    banner_color
    banner_image
    description
    duration
    id
    level
    instructor_id
    name
    enrollments {
      id
      student {
        first_name
        last_name
        middle_name
        image
      }
    }
  }
}
`
