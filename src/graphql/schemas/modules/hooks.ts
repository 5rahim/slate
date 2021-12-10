import { CreateModuleMutationVariables, Modules } from '@slate/generated/graphql'
import { useLazyQueryHookCreator } from '@slate/graphql/hooks/useLazyQueryHookCreator'
import { SlateMutationHook, useMutationHookCreator } from '@slate/graphql/hooks/useMutationHookCreator'
import { CREATE_MODULE, GET_MODULES, UPDATE_MODULE_ORDER } from '@slate/graphql/schemas/modules/mutations'

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

export const getLazyModules = (unit_id: string) => {
   return useLazyQueryHookCreator<Modules[] | null>("modules", GET_MODULES, "array", {
      variables: { unit_id },
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'cache-and-network',
      debug: false,
   })
}
