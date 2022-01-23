import { gql } from '@apollo/client'


export const GET_GRADEBOOK_ITEMS = gql`
  query GetGradebookItems($course_id: uuid!, $student_id: Int!, $is_assigned: jsonb!, $where: gradebook_item_submissions_bool_exp) {
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
        time_limit
        settings
        name
      }
      # Get own submissions
      submissions_aggregate(where: $where, distinct_on: student_id) {
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
  query GetAssignment($student_id: Int!, $assignment_id: uuid!, $where: gradebook_item_submissions_bool_exp ) {
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
        submissions(where: $where, order_by: {created_at: desc}) {
          created_at
          content
          group_id
          id
          student_id
          student {
            id
            image
            first_name
            middle_name
            last_name
          }
        }
        submissions_aggregate(where: $where) {
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

export const GET_TEST_QUESTIONS_QUERY = gql`
  query GetTestQuestions($test_id: uuid!) {
    test_questions(where: {test_id: {_eq: $test_id}}, order_by: { order: asc }) {
      id
      order
      question_id
      test_id
      question {
        id
        type
        course_id
        content
        answer_keys
      }
    }
  }
  `
