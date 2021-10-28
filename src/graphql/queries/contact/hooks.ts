import { useQuery }          from '@apollo/client'
import { GET_SCHOOLS_QUERY } from './query'

export const useContacts = () => {
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
