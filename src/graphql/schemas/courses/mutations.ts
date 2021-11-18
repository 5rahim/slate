import { gql } from '@apollo/client'

export const UPDATE_COURSE_BANNER_COLOR = gql`
    mutation UpdateCourseBannerColor($id: uuid!, $banner_color: String!) {
        update_courses(where: {id: {_eq: $id}}, _set: {banner_color: $banner_color}) {
            affected_rows
            returning {
                banner_color
            }
        }
    }
`


export const UPDATE_COURSE_BACKGROUND_COLOR = gql`
    mutation UpdateCourseBackgroundColor($id: uuid!, $background_color: String!) {
        update_courses(where: {id: {_eq: $id}}, _set: {background_color: $background_color}) {
            affected_rows
            returning {
                background_color
            }
        }
    }
`


export const UPDATE_COURSE_AVAILABILITY = gql`
    mutation UpdateCourseAvailability($id: uuid!, $available: Boolean!) {
        update_courses(where: {id: {_eq: $id}}, _set: {available: $available}) {
            affected_rows
            returning {
                available
            }
        }
    }
`


export const UPDATE_COURSE_CODE = gql`
    mutation UpdateCourseCode($id: uuid!, $code: String) {
        update_courses(where: {id: {_eq: $id}}, _set: {access_code: $code}) {
            affected_rows
            returning {
                access_code
            }
        }
    }
`


export const UPDATE_COURSE_DURATION = gql`
    mutation UpdateCourseDuration($id: uuid!, $duration: String) {
        update_courses(where: {id: {_eq: $id}}, _set: {duration: $duration}) {
            affected_rows
            returning {
                duration
            }
        }
    }
`


export const UPDATE_COURSE_DETAILS = gql`
    mutation MyMutation($id: uuid!, $description: String, $name: String!, $level: String) {
        update_courses(where: {id: {_eq: $id}}, _set: {description: $description, name: $name, level: $level}) {
            affected_rows
            returning {
                description
                name
                level
            }
        }
    }

`
