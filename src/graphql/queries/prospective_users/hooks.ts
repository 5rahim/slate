import { QueryResult, QueryTuple, useLazyQuery, useQuery } from '@apollo/client'
import { GET_PROSPECTIVE_USER_QUERY, GET_PROSPECTIVE_USER_QUERY_BY_EMAIL, GET_PROSPECTIVE_USER_QUERY_BY_STUDENT_ID } from './query'
import { handleLazyQueryError, handleQueryError, lazyQueryReturn, queryReturn } from '../../utils'

export const useLazyProspectiveUserByStudentID = (student_id: string): QueryTuple<any, any> => {
   
   const res = useLazyQuery(GET_PROSPECTIVE_USER_QUERY_BY_STUDENT_ID, {
      variables: { student_id },
      fetchPolicy: 'no-cache'
   })
   
   handleLazyQueryError(res)
   
   return lazyQueryReturn('prospective_users', res, "single")
   
}

export const useLazyProspectiveUser = (studentID: string, code: string): QueryTuple<any, any> => {
   
   const res = useLazyQuery(GET_PROSPECTIVE_USER_QUERY, {
      variables: { student_id: studentID, code },
      fetchPolicy: 'no-cache'
   })
   
   handleLazyQueryError(res)
   
   return lazyQueryReturn('prospective_users', res, "single")
}


export const useLazyProspectiveUserByEmail = (email: string | undefined | null): QueryTuple<any, any> => {
   
   const res = useLazyQuery(GET_PROSPECTIVE_USER_QUERY_BY_EMAIL, {
      variables: { email },
      fetchPolicy: 'no-cache'
   })
   
   handleLazyQueryError(res)
   
   return lazyQueryReturn('prospective_users', res, "single")
   
}
