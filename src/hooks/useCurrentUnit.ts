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
   return `${t('form:' + unit?.type)} ${unit?.number}${!!unit?.title ? `:  ${unit?.title}` : ``}`
}
