import { gql } from '@apollo/client'

export const UPDATE_COURSE_BANNER_COLOR = gql`
mutation UpdateCourseBannerColor($id: uuid = "", $banner_color: String = "") {
  update_courses(where: {id: {_eq: $id}}, _set: {banner_color: $banner_color}) {
    affected_rows
    returning {
      banner_color
    }
  }
}
`
