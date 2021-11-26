import { Units } from '@slate/generated/graphql'
import { useQueryHookCreator } from '@slate/graphql/hooks/useQueryHookCreator'
import { GET_UNITS } from '@slate/graphql/schemas/units/queries'

export const getUnits = (course_id: string) => {
   return useQueryHookCreator<Units[] | null>("units", GET_UNITS, "array", {
      variables: { course_id },
      fetchPolicy: 'no-cache',
      debug: false
   })
}
