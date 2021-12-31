import { gql } from '@apollo/client'


export const GET_GRADEBOOK_ITEMS = gql`
    query GetGradebookItems($course_id: uuid!, $student_id: Int!, $is_assigned: jsonb!) {
        gradebook_items(where: {
            _and: {
                course_id: {_eq: $course_id},
                _or: [
                    {assign_to: {_contains: $is_assigned}},
                    {course: {instructor: {id: {_eq: $student_id}}}},
                    {course: {management: { manager: {id: {_eq: $student_id}}}}},
                ]
            }
        }, order_by: {created_at: desc}) {
            accommodations
            created_at
            assessment_id
            assessment_type
            attempts_allowed
            attempts_grading
            available_from
            available_until
            assign_to
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
            # Get own submissions
            submissions_aggregate(where: {student_id: {_eq: $student_id}}, distinct_on: student_id) {
                aggregate {
                    count
                }
            }
            # Get total submissions for all students
            total_submissions: submissions_aggregate(distinct_on: student_id) {
                aggregate {
                    count
                }
            }
        }
    }
`

export const GET_ASSIGNMENT = gql`
    query GetAssignment($student_id: Int!, $assignment_id: uuid!) {
        assignments(where: {id: {_eq: $assignment_id}}) {
            description
            files
            gradebook_item_id
            id
            name
            type
            gradebook_item {
                id
                created_at
                accommodations
                assessment_id
                assessment_type
                attempts_allowed
                attempts_grading
                available_from
                available_until
                course_id
                assign_to
                max_points
                grading_rubric_id
                scoring_type
                status
                submission_type
                submissions(where: {student_id: {_eq: $student_id}}, order_by: {created_at: desc}) {
                    created_at
                    content
                    group_id
                    id
                    student_id
                }
                submissions_aggregate(where: {student_id: {_eq: $student_id}}) {
                    aggregate {
                        count
                    }
                }
                grade_items(where: {_and: {student_id: {_eq: $student_id}, status: {_eq: "available"}}}) {
                    points
                    status
                    student_id
                }
            }
        }
    }
`
