import { Modules } from '@slate/generated/graphql'
import { UnitActions, UnitSelectors } from '@slate/store/slices/unitSlice'
import { useDispatch, useSelector } from 'react-redux'

export const useModuleFolder = () => {
   
   const dispatch = useDispatch()
   const openedFolder = useSelector(UnitSelectors.openedFolder)
   
   return {
   
      isFolderOpen: !!openedFolder,
      
      openedFolder: openedFolder,
      
      openFolder: (module: Modules) => {
         dispatch(UnitActions.setOpenedFolder(module))
      },
      
      closeFolder: () => {
         dispatch(UnitActions.setOpenedFolder(null))
      },
      
      hasFolder: (module: Modules) => {
        return !!module.folder_id
      },
      
      isInOpenedFolder: (module: Modules) => {
         return !!module.folder_id && module.folder_id === openedFolder?.id
      }
      
   }
   
}
