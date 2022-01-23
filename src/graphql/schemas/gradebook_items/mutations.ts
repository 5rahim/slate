import { gql } from '@apollo/client'

export const CREATE_ASSIGNMENT = gql`
    mutation CreateAssignment($gradebook_item_id: uuid!, $assign_to: jsonb, $assessment_id: uuid!, $assessment_type: String!, $attempts_allowed: Int!, $attempts_grading: String!, $available_from: timestamp, $available_until: timestamp, $course_id: uuid!, $max_points: Int!, $scoring_type: String!, $status: String!, $submission_type: String!, $accommodations: String, $assignment_id: uuid!, $name: String!, $type: String!, $files: String, $description: String) {
        insert_gradebook_items_one(object: {id: $gradebook_item_id, assign_to: $assign_to, assessment_id: $assessment_id, assessment_type: $assessment_type, attempts_allowed: $attempts_allowed, attempts_grading: $attempts_grading, available_from: $available_from, available_until: $available_until, course_id: $course_id, max_points: $max_points, status: $status, scoring_type: $scoring_type, submission_type: $submission_type, accommodations: $accommodations}) {
            id
        }
        insert_assignments_one(object: {id: $assignment_id, name: $name, type: $type, gradebook_item_id: $gradebook_item_id, files: $files, description: $description}) {
            id
        }
    }
`

export const EDIT_ASSIGNMENT = gql`
    mutation EditAssignment($gradebook_item_id: uuid!, $assign_to: jsonb, $assessment_id: uuid!, $assessment_type: String!, $attempts_allowed: Int!, $attempts_grading: String!, $available_from: timestamp, $available_until: timestamp, $course_id: uuid!, $max_points: Int!, $scoring_type: String!, $status: String!, $submission_type: String!, $accommodations: String, $assignment_id: uuid!, $name: String!, $type: String!, $files: String, $description: String) {
        update_gradebook_items_by_pk(_set: {id: $gradebook_item_id, assign_to: $assign_to, assessment_id: $assessment_id, assessment_type: $assessment_type, attempts_allowed: $attempts_allowed, attempts_grading: $attempts_grading, available_from: $available_from, available_until: $available_until, course_id: $course_id, max_points: $max_points, status: $status, scoring_type: $scoring_type, submission_type: $submission_type, accommodations: $accommodations}, pk_columns: {id: $gradebook_item_id}) {
            id
        }
        update_assignments_by_pk(_set: {id: $assignment_id, name: $name, type: $type, gradebook_item_id: $gradebook_item_id, files: $files, description: $description}, pk_columns: {id: $assessment_id}) {
            id
        }
    }
`

export const CREATE_TEST = gql`
    mutation CreateTest($time_limit: Int!, $settings: jsonb!, $gradebook_item_id: uuid!, $assign_to: jsonb, $assessment_id: uuid!, $assessment_type: String!, $attempts_allowed: Int!, $attempts_grading: String!, $available_from: timestamp, $available_until: timestamp, $course_id: uuid!, $max_points: Int!, $scoring_type: String!, $status: String!, $accommodations: String, $test_id: uuid!, $name: String!, $description: String) {
        insert_gradebook_items_one(object: {id: $gradebook_item_id, assign_to: $assign_to, assessment_id: $assessment_id, assessment_type: $assessment_type, attempts_allowed: $attempts_allowed, attempts_grading: $attempts_grading, available_from: $available_from, available_until: $available_until, course_id: $course_id, max_points: $max_points, status: $status, scoring_type: $scoring_type, accommodations: $accommodations}) {
            id
        }
        insert_tests_one(object: {id: $test_id, settings: $settings, time_limit: $time_limit, name: $name, gradebook_item_id: $gradebook_item_id, description: $description}) {
            id
        }
    }
`

export const EDIT_TEST = gql`
    mutation EditTest($time_limit: Int!, $settings: jsonb!, $gradebook_item_id: uuid!, $assign_to: jsonb, $assessment_id: uuid!, $assessment_type: String!, $attempts_allowed: Int!, $attempts_grading: String!, $available_from: timestamp, $available_until: timestamp, $course_id: uuid!, $max_points: Int!, $scoring_type: String!, $status: String!, $accommodations: String, $test_id: uuid!, $name: String!, $description: String) {
        update_gradebook_items_by_pk(_set: {id: $gradebook_item_id, assign_to: $assign_to, assessment_id: $assessment_id, assessment_type: $assessment_type, attempts_allowed: $attempts_allowed, attempts_grading: $attempts_grading, available_from: $available_from, available_until: $available_until, course_id: $course_id, max_points: $max_points, status: $status, scoring_type: $scoring_type, accommodations: $accommodations}, pk_columns: {id: $gradebook_item_id}) {
            id
        }
        update_tests_by_pk(_set: {id: $test_id, settings: $settings, time_limit: $time_limit, name: $name, gradebook_item_id: $gradebook_item_id, description: $description}, pk_columns: {id: $assessment_id}) {
            id
        }
    }
`


export const CREATE_ASSESSMENT_SUBMISSION = gql`
    mutation CreateAssessmentSubmission($content: jsonb!, $group_id: uuid, $student_id: Int!, $gradebook_item_id: uuid!) {
        insert_gradebook_item_submissions_one(object: {content: $content, group_id: $group_id, student_id: $student_id, gradebook_item_id: $gradebook_item_id}) {
            id
        }
    }
`

export const CREATE_QUESTION = gql`
    mutation CreateQuestion($answer_keys: jsonb!, $content: jsonb!, $course_id: uuid!, $type: String!, $order: Int!, $question_id: uuid!, $test_id: uuid!) {
        insert_questions_one(object: {answer_keys: $answer_keys, content: $content, course_id: $course_id, type: $type, id: $question_id}) {
            id
        }
        insert_test_questions_one(object: {order: $order, question_id: $question_id, test_id: $test_id}) {
            id
        }
    }
`

export const UPDATE_TEST_QUESTION_ORDER = gql`
    mutation UpdateTestQuestionOrder($objects: [test_questions_insert_input!]!) {
        insert_test_questions(objects: $objects, on_conflict: {constraint: test_questions_pkey, update_columns: order}) {
            affected_rows
        }
    }
`

export const UPDATE_QUESTION_CONTENT = gql`
    mutation UpdateQuestionContent($id: uuid!, $content: jsonb!, $answer_keys: jsonb!) {
        update_questions_by_pk(pk_columns: {id: $id}, _set: {content: $content, answer_keys: $answer_keys}) {
            id
        }
    }
`

export const DELETE_QUESTION = gql`
    mutation DeleteQuestion($test_question_id: uuid!, $question_id: uuid!) {
        delete_test_questions_by_pk(id: $test_question_id) {
            id
        }
        
        delete_questions_by_pk(id: $question_id) {
            id
        }
    }
`

export const REMOVE_TEST_QUESTION = gql`
    mutation RemoveTestQuestion($id: uuid!) {
        delete_test_questions_by_pk(id: $id) {
            id
        }
    }
`
