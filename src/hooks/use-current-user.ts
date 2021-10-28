import { useSelector } from 'react-redux'
import { UserSelectors } from '../store/slices/userSlice'

export const useCurrentUser = () => {
   return useSelector(UserSelectors.get)
}
