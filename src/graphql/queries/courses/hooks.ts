import { QueryResult, useQuery } from '@apollo/client'
import { handleQueryError, queryReturn } from '../../utils'
import { GET_COURSE_BY_ID } from './query'

export const getCourseById = (id: string, user_id: number): QueryResult => {
   
   const res = useQuery(GET_COURSE_BY_ID, {
      variables: { id, user_id },
      fetchPolicy: 'no-cache',
   })
   
   handleQueryError(res)
   
   return queryReturn('courses', res, 'single')
   
}
