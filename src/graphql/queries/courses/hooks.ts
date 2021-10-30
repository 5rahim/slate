import { QueryResult, useQuery } from '@apollo/client'
import { legacyHandleQueryError, legacyQueryReturn } from '../../utils'
import { GET_COURSE_BY_ID } from './queries'

// TODO: Replace by new query paradigm
export const getCourseById = (id: string, user_id: number): QueryResult => {
   
   const res = useQuery(GET_COURSE_BY_ID, {
      variables: { id, user_id },
      fetchPolicy: 'no-cache',
   })
   
   legacyHandleQueryError(res)
   
   return legacyQueryReturn('courses', res, 'single')
   
}
