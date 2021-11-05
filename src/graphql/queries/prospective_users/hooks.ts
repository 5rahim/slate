import { QueryTuple, useLazyQuery } from '@apollo/client'
import { legacyHangleQueryError, legacyLazyQueryReturn } from '../../utils'
import { GET_PROSPECTIVE_USER_BY_STUDENT_ID_AND_CODE_QUERY, GET_PROSPECTIVE_USER_QUERY_BY_STUDENT_ID } from './queries'

export const useLazyProspectiveUserByStudentID = (student_id: string): QueryTuple<any, any> => {
   
   const res = useLazyQuery(GET_PROSPECTIVE_USER_QUERY_BY_STUDENT_ID, {
      variables: { student_id },
      fetchPolicy: 'no-cache',
   })
   
   legacyHangleQueryError(res)
   
   return legacyLazyQueryReturn('prospective_users', res, "single")
   
}

export const useLazyProspectiveUserByStudentIdAndCode = (student_id: string, code: string): QueryTuple<any, any> => {
   
   const res = useLazyQuery(GET_PROSPECTIVE_USER_BY_STUDENT_ID_AND_CODE_QUERY, {
      variables: { student_id, code },
      fetchPolicy: 'no-cache',
   })
   
   legacyHangleQueryError(res)
   
   return legacyLazyQueryReturn('prospective_users', res, "single")
}

