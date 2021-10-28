import { QueryResult, useQuery } from '@apollo/client'
import { GET_SCHOOL_BY_SHORT_NAME_QUERY, GET_SCHOOLS_QUERY } from './query'
import { NextRouter } from 'next/router'
import { handleQueryError, queryReturn } from '../../utils'
import SlateSchool from '../../types/Schools'

export const useCurrentSchoolQuery = (iid: string): QueryResult => {
   
   
   const res = useQuery(GET_SCHOOL_BY_SHORT_NAME_QUERY, {
      variables: { short_name: iid },
      ssr: true
   })
   
   handleQueryError(res)
   
   return queryReturn('schools', res, "single")

}

export const useCurrentSchool = (iid: string): SlateSchool => {
   const { data, error } = useCurrentSchoolQuery(iid)
   return data
}

export const useSchools = () => {
   const { loading, error, data } = useQuery(GET_SCHOOLS_QUERY)
   
   if (!loading && data.schools) {
      return {
         loading,
         error,
         data: data.schools,
      }
   }
   
   return {
      loading,
      error,
      data,
   }
}
