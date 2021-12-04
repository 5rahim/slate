import {
   ArchiveUnitMutationVariables, CreateUnitMutationVariables, UnarchiveUnitMutationVariables, Units, UpdateUnitDetailsMutationVariables,
} from '@slate/generated/graphql'
import { useLazyQueryHookCreator } from '@slate/graphql/hooks/useLazyQueryHookCreator'
import { SlateMutationHook, useMutationHookCreator } from '@slate/graphql/hooks/useMutationHookCreator'
import { useQueryHookCreator } from '@slate/graphql/hooks/useQueryHookCreator'
import { ARCHIVE_UNIT, CREATE_UNIT, UNARCHIVE_UNIT, UPDATE_UNIT_DETAILS, UPDATE_UNIT_ORDER } from '@slate/graphql/schemas/units/mutations'
import { GET_ARCHIVED_UNITS, GET_UNIT_BY_ID, GET_UNITS } from '@slate/graphql/schemas/units/queries'
import { useCurrentUnit } from '@slate/hooks/useCurrentUnit'

export const getUnitById = (id: string) => {
   
   return useQueryHookCreator<Units>('units', GET_UNIT_BY_ID, "object", {
      variables: { id }, fetchPolicy: 'no-cache', nextFetchPolicy: "cache-and-network",
   })
   
}

export const getUnits = (course_id: string) => {
   return useQueryHookCreator<Units[] | null>("units", GET_UNITS, "array", {
      variables: { course_id },
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'cache-and-network',
      debug: false,
   })
}


export const getLazyUnits = (course_id: string) => {
   return useLazyQueryHookCreator<Units[] | null>("units", GET_UNITS, "array", {
      variables: { course_id },
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'cache-and-network',
      debug: false,
   })
}

export const getArchivedUnits = (course_id: string) => {
   return useQueryHookCreator<Units[] | null>("units", GET_ARCHIVED_UNITS, "array", {
      variables: { course_id },
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'cache-and-network',
      debug: false,
   })
}

export const useCreateUnit: SlateMutationHook<CreateUnitMutationVariables> = (options) => {
   
   return useMutationHookCreator(CREATE_UNIT, {
      refetchQueries: [
         { query: GET_UNITS },
         { query: GET_ARCHIVED_UNITS },
         'GetUnits',
         'GetArchivedUnits',
      ],
      ...options,
   })
   
}
export const useMutateUnitDetails: SlateMutationHook<UpdateUnitDetailsMutationVariables> = (options) => {
   
   const unit = useCurrentUnit()
   
   return useMutationHookCreator(UPDATE_UNIT_DETAILS, {
      refetchQueries: [
         { query: GET_UNITS },
         { query: GET_ARCHIVED_UNITS },
         { query: GET_UNIT_BY_ID, variables: { id: unit?.id } },
         'GetUnits',
         'GetArchivedUnits',
      ],
      successAlert: { type: "toast", title: "Unit has been updated" },
      ...options,
   })
   
}

export const useMutateUnitOrder = () => {
   
   return useMutationHookCreator(
      UPDATE_UNIT_ORDER,
      {
         refetchQueries: [
            { query: GET_UNITS },
            { query: GET_ARCHIVED_UNITS },
            'GetUnits',
            'GetArchivedUnits',
         ],
      },
   )
}


export const useMutateArchiveUnit: SlateMutationHook<ArchiveUnitMutationVariables> = (options) => {
   
   return useMutationHookCreator(
      ARCHIVE_UNIT,
      {
         refetchQueries: [
            { query: GET_UNITS },
            { query: GET_ARCHIVED_UNITS },
            'GetUnits',
            'GetArchivedUnits',
         ],
         successAlert: { type: "toast", title: "Unit has been archived" },
         ...options,
      },
   )
}



export const useMutateUnarchiveUnit: SlateMutationHook<UnarchiveUnitMutationVariables> = (options) => {
   
   return useMutationHookCreator(
      UNARCHIVE_UNIT,
      {
         refetchQueries: [
            { query: GET_UNITS },
            { query: GET_ARCHIVED_UNITS },
            'GetUnits',
            'GetArchivedUnits',
         ],
         successAlert: { type: "toast", title: "Unit has been unarchived" },
         ...options,
      },
   )
}
