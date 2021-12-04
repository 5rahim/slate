import { QueryTuple, useLazyQuery } from '@apollo/client'
import { legacyHangleQueryError, legacyLazyQueryReturn } from '../../utils'
import { GET_PROSPECTIVE_USER_BY_STUDENT_ID, GET_PROSPECTIVE_USER_BY_STUDENT_ID_AND_CODE } from './queries'


/**
 * @deprecated
 * @param {string} student_id
 * @returns {QueryTuple<any, any>}
 */
export const useLazyProspectiveUserByStudentID = (student_id: string): QueryTuple<any, any> => {
   
   const res = useLazyQuery(GET_PROSPECTIVE_USER_BY_STUDENT_ID, {
      variables: { student_id },
      fetchPolicy: 'no-cache',
   })
   
   legacyHangleQueryError(res)
   
   return legacyLazyQueryReturn('prospective_users', res, "single")
   
}

/**
 * @deprecated
 * @param {string} student_id
 * @param {string} code
 * @returns {QueryTuple<any, any>}
 */
export const useLazyProspectiveUserByStudentIdAndCode = (student_id: string, code: string): QueryTuple<any, any> => {
   
   const res = useLazyQuery(GET_PROSPECTIVE_USER_BY_STUDENT_ID_AND_CODE, {
      variables: { student_id, code },
      fetchPolicy: 'no-cache',
   })
   
   legacyHangleQueryError(res)
   
   return legacyLazyQueryReturn('prospective_users', res, "single")
}

