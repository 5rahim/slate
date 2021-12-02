import { LoadingScreen } from '@slate/components/UI/LoadingScreen'
import { getUnitById } from '@slate/graphql/schemas/units/hooks'
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
      const { isReallyStudent } = useUserRole()
      
      if (!unit_id)
         return router.push(Utils.Url.accessDeniedLink(props.iid))
      
      const storedUnit = useSelector(UnitSelectors.getAll)
      const [unit, unitIsLoading] = getUnitById(unit_id as string)
      
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
         
         if (!unitIsLoading && !!unit && ( ( unit.available ) || ( unit.is_scheduled && Utils.Dates.publicationDateHasPassed(unit.publish_on) ) || !isReallyStudent )) {
            setDisplayPage(true)
            dispatch(UnitActions.setUnit(unit))
            dispatch(UnitActions.setIsAllowed(true))
            
         } else if (!unitIsLoading && isReallyStudent && ( !unit || !unit.available || (unit.is_scheduled && !Utils.Dates.publicationDateHasPassed(unit.publish_on)) )) {
            router.push(Utils.Url.accessDeniedLink(props.iid))
         }
         
      }, [unit, isReallyStudent])
      
      return displayPage ? <Component {...props} unit={unit} /> : <LoadingScreen text="withUnit" />
      
      
   }
   
   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      Unit.getInitialProps = Component.getInitialProps
   }
   
   return Unit
}
