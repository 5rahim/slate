import { Units } from '@slate/generated/graphql'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { UnitSelectors } from '@slate/store/slices/unitSlice'
import { useSelector } from 'react-redux'

export const useCurrentUnit = () => {
   return useSelector(UnitSelectors.getUnit) as Units
}

export const useCurrentUnitName = () => {
   const t = useTypeSafeTranslation()
   const unit = useCurrentUnit()
   if(unit.type === 'folder') {
      return `${unit?.number}`
   } else {
      return `${t('form:' + unit?.type)} ${unit?.number}${!!unit?.title ? `:  ${unit?.title}` : ``}`
   }
}

export const useUnitHelpers = () => {
   const t = useTypeSafeTranslation()
   
   return {
      getUnitName: (unit: Units) => {
         if(unit.type === 'folder') {
            return `${unit?.number}`
         } else {
            return `${t('form:' + unit?.type)} ${unit?.number}${!!unit?.title ? `:  ${unit?.title}` : ``}`
         }
      }
   }
}
