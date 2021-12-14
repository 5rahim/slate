import { Modules } from '@slate/generated/graphql'
import { UnitActions, UnitSelectors } from '@slate/store/slices/unitSlice'
import { useDispatch, useSelector } from 'react-redux'

export const useModuleFolder = () => {
   
   const dispatch = useDispatch()
   const openedFolder = useSelector(UnitSelectors.openedFolder)
   const shouldOpenFolder = useSelector(UnitSelectors.shouldOpenFolder)
   
   return {
   
      isFolderOpen: !!openedFolder,
      
      openedFolder: openedFolder,
      
      openFolder: (module: Modules) => {
         dispatch(UnitActions.setOpenedFolder(module))
      },
      
      shouldOpenFolder: (module: Modules | null) => {
         dispatch(UnitActions.setShouldOpenFolder(module))
      },
      
      openPendingFolder: () => {
         dispatch(UnitActions.setOpenedFolder(shouldOpenFolder))
         dispatch(UnitActions.setShouldOpenFolder(null))
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
