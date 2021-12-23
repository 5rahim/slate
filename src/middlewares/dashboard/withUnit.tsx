import { getUnitById } from '@slate/graphql/schemas/units/hooks'
import { usePublishDateSetting } from '@slate/hooks/settings/usePublishDateSetting'
import { useUserRole } from '@slate/hooks/useUserRole'
import { UnitActions, UnitSelectors } from '@slate/store/slices/unitSlice'
import { Utils } from '@slate/utils'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


interface WithUnitProps {

}

/**
 * Secures unit pages
 * Stores unit data
 * @param {WithUnitProps} props
 * @returns {(Component: NextPage) => (props: any) => (Promise<boolean>)}
 */
export const withUnit = (props?: WithUnitProps) => (Component: NextPage) => {
   
   const Unit = (props: any) => {
      
      const router = useRouter()
      const { unit_id } = router.query
      const dispatch = useDispatch()
      const { isReallyStudent, isAssistantOrInstructor, isReallyAssistantOrInstructor } = useUserRole()
      
      const { publishDateHelpers } = usePublishDateSetting()
      
      if (!unit_id)
         return router.push(Utils.Url.accessDeniedLink(props.iid))
      
      const storedUnit = useSelector(UnitSelectors.getAll)
      const [unit, unitIsLoading] = getUnitById(unit_id as string, isReallyAssistantOrInstructor)
      
      const [displayPage, setDisplayPage] = useState<boolean>(storedUnit.unit?.id === unit_id)
      
      /**
       * Stored unit
       */
      useEffect(() => {
         if (storedUnit && storedUnit.unit?.id === unit_id && storedUnit.unit && storedUnit.isAllowed) {
            setDisplayPage(true)
         }
      }, [storedUnit, unit_id])
      
      useEffect(() => {
         
         const isAvailable = unit ? publishDateHelpers.isAvailable({ status: unit.status, availableFrom: unit.available_from }) : false
         
         if (!unitIsLoading && !!unit && ( isAvailable || !isReallyStudent ) && (isAssistantOrInstructor || !unit.archived)) {
            setDisplayPage(true)
            dispatch(UnitActions.setUnit(unit))
            dispatch(UnitActions.setIsAllowed(true))
            
         } else if (!unitIsLoading && isReallyStudent && ( !unit || !isAvailable )) {
            router.push(Utils.Url.accessDeniedLink(props.iid))
         }
         
      }, [unit, isReallyStudent])
      
      return <Component {...props} unit={unit} displayPage={displayPage} />
      
      
   }
   
   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      Unit.getInitialProps = Component.getInitialProps
   }
   
   return Unit
}
