import { gql } from '@apollo/client'

export const GET_TEST_QUESTIONS = gql`
  subscription GetTestQuestionsSubscription($test_id: uuid!) {
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
