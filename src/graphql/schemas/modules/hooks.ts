import {
   ChangeModuleFolderMutationVariables, CreateModuleMutationVariables, DeleteModuleMutationVariables, Modules, MoveModuleMutationVariables,
} from '@slate/generated/graphql'
import { useLazyQueryHookCreator } from '@slate/graphql/hooks/useLazyQueryHookCreator'
import { SlateMutationHook, useMutationHookCreator } from '@slate/graphql/hooks/useMutationHookCreator'
import {
   CHANGE_MODULE_FOLDER, CREATE_MODULE, DELETE_MODULE, GET_MODULE_BY_ID, GET_MODULES, MOVE_MODULE, UPDATE_MODULE, UPDATE_MODULE_ORDER,
} from '@slate/graphql/schemas/modules/mutations'
import { GET_UNITS } from '@slate/graphql/schemas/units/queries'

export const useCreateModule: SlateMutationHook<CreateModuleMutationVariables> = (options) => {
   
   return useMutationHookCreator(CREATE_MODULE, {
      refetchQueries: [
         { query: GET_MODULES },
         'GetModules',
      ],
      ...options,
   })
   
}

export const useMutateModuleOrder = () => {
   
   return useMutationHookCreator(
      UPDATE_MODULE_ORDER,
      {
         refetchQueries: [
            { query: GET_MODULES },
            'GetModules',
         ],
      },
   )
}


export const useMutateMoveModule: SlateMutationHook<MoveModuleMutationVariables> = (options) => {
   
   return useMutationHookCreator(
      MOVE_MODULE,
      {
         refetchQueries: [
            { query: GET_UNITS },
            { query: GET_MODULES },
            'GetUnits',
            'GetModules',
         ],
         successAlert: { type: "toast", title: "Module moved" },
         ...options,
      },
   )
}

export const useChangeModuleFolder: SlateMutationHook<ChangeModuleFolderMutationVariables> = (options) => {
   
   return useMutationHookCreator(
      CHANGE_MODULE_FOLDER,
      {
         refetchQueries: [
            { query: GET_MODULES },
            'GetModules',
         ],
         successAlert: { type: "toast", title: "Module moved" },
         ...options,
      },
   )
}

export const useDeleteModule: SlateMutationHook<DeleteModuleMutationVariables> = (options) => {
   
   return useMutationHookCreator(
      DELETE_MODULE,
      {
         refetchQueries: [
            { query: GET_MODULES },
            'GetModules',
         ],
         successAlert: { type: "toast", title: "Module deleted" },
         ...options,
      },
   )
}

export const useUpdateModule: SlateMutationHook<DeleteModuleMutationVariables> = (options) => {
   
   return useMutationHookCreator(
      UPDATE_MODULE,
      {
         refetchQueries: [
            { query: GET_MODULES },
            'GetModules',
         ],
         successAlert: { type: "toast", title: "Module updated" },
         ...options,
      },
   )
}

export const getLazyModules = (unit_id: string) => {
   return useLazyQueryHookCreator<Modules[] | null>("modules", GET_MODULES, "array", {
      variables: { unit_id },
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'cache-and-network',
      debug: false,
   })
}

export const getLazyModuleById = () => {
   
   return useLazyQueryHookCreator<Modules>('modules', GET_MODULE_BY_ID, "object", {
      fetchPolicy: 'no-cache', nextFetchPolicy: "cache-and-network",
   })
   
}
