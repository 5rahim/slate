import { gql } from '@apollo/client'

export const UPDATE_COURSE_BANNER_COLOR = gql`
mutation UpdateCourseBannerColor($id: uuid = "", $banner_color: String = "", $instructor_id: Int = 10) {
  update_courses(where: {_and: {id: {_eq: $id}, instructor_id: {_eq: $instructor_id}}}, _set: {banner_color: $banner_color}) {
    affected_rows
    returning {
      access_code
      available
      banner_color
      banner_image
      description
      duration
      id
      instructor_id
      level
      name
    }
  }
}
`
