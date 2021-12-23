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
            test {
                description
                gradebook_item_id
                id
                name
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

export const GET_ASSIGNMENT = gql`
    query GetAssignment($student_id: Int!, $assignment_id: uuid!, $with_details: Boolean!) {
        assignments(where: {id: {_eq: $assignment_id}}) {
            description
            files
            gradebook_item_id
            id
            name
            type
            gradebook_item {
                id
                accommodations
                assessment_id
                assessment_type
                attempts_allowed
                attempts_grading
                available_from
                available_until
                course_id
                max_points
                grading_rubric_id
                scoring_type
                status
                submission_type
                submissions(where: {assignment_submission: {student_id: {_eq: $student_id}}}) {
                    assignment_submission {
                        files
                        group_id
                        id
                        student_id
                        text
                        assignment_id
                    }
                }
                submissions_aggregate @include(if: $with_details) {
                    aggregate {
                        count
                    }
                }
            }
        }
    }
`
