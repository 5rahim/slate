import { getLazyModuleById } from "@slate/graphql/schemas/modules/hooks"

export const useModuleShortcut = () => {
   
   const [fetch, data, isLoading, isEmpty] = getLazyModuleById()
   
   return {
      
      fetchShortcutModuleData: (id: string) => {
         fetch && fetch({ variables: { id } })
      },
      
      shortcutModule: data
      
   }

}
