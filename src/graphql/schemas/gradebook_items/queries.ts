import { gql } from '@apollo/client'

export const GET_GRADEBOOK_ITEMS = gql`
    query GetGradebookItems($course_id: uuid!, $with_enrollment: Boolean!) {
        gradebook_items(where: {course_id: {_eq: $course_id}}) {
            accommodations
            assessment_id
            assessment_type
            attempts_allowed
            attempts_grading
            available_from
            available_until
            course_id
            grading_rubric_id
            id
            max_points
            scoring_type
            status
            submission_type
            assignment {
                description
                files
                gradebook_item_id
                id
                name
                type
            }
            submissions_aggregate {
                aggregate {
                    count
                }
            }
            course {
                enrollments_aggregate(where: {authorized: {_eq: true}}) @include(if: $with_enrollment) {
                    aggregate {
                        count
                    }
                }
            }
        }
    }
`
