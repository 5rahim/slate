import { gql } from '@apollo/client'
import OtherUser from '../../fragments/OtherUser'
import BaseUser from '../../fragments/BaseUser'


export const GET_USER_BY_EMAIL_QUERY = gql`
${OtherUser}
${BaseUser}

fragment baseCourse on courses {
  access_code
  banner_color
  available
  banner_image
  description
  duration
  id
  instructor_id
  level
  name
  instructor {
     ...otherUser
  }
}

query GetUserByEmail($email: String = "") {
  users(where: {email: {_eq: $email}}, limit: 1) {
    ...baseUser
    enrolled_courses {
      authorized
      authorized_at
      course_id
      created_at
      id
      course {
        ...baseCourse
      }
      student_id
    }
    managing_courses {
      course_id
      id
      manager_id
      course {
        ...baseCourse
        enrollments {
          authorized
          authorized_at
          course_id
          created_at
          id
          student_id
          student {
            ...otherUser
          }
        }
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
    own_courses {
      ...baseCourse
      enrollments {
        authorized
        authorized_at
        course_id
        created_at
        id
        student_id
        student {
          ...otherUser
        }
      }
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
}
`
