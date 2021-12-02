import { SchoolSelectors } from '@slate/store/slices/schoolSlice'
import { useSelector } from 'react-redux'

export const useCurrentSchool = () => {
   const iid: string = useSelector(SchoolSelectors.getIID)
   const school = useSelector(SchoolSelectors.getSchool)
   return {
      iid,
      ...school
   }
}
