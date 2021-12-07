import { getLazyUserSettings } from '@slate/graphql/schemas/users/hooks'
import { useUserSessionProfile } from '@slate/hooks/useCurrentUser'
import { UserActions, UserSelectors } from '@slate/store/slices/userSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface UserSettings {
   hourFormat: string,
   dateFormat: string,
   settingsAreLoading: boolean
}

export const useUserSettings = (): UserSettings => {
   const dispatch = useDispatch()
   const { profile } = useUserSessionProfile()
   
   const [fetchSettings, data, loading] = getLazyUserSettings(profile)
   const storedSettings = useSelector(UserSelectors.getSettings)
   
   const [settings, setSettings] = useState<UserSettings>({ hourFormat: '24', dateFormat: 'DMY', settingsAreLoading: true })
   
   useEffect(() => {
      if(!storedSettings) {
         fetchSettings && fetchSettings()
      }
   }, [storedSettings])
   
   useEffect(() => {
   
      if(!loading && data) {
         dispatch(UserActions.setSettings(data))
      }
      
      setSettings({
         hourFormat: storedSettings?.hour_format ?? (data?.hour_format ?? '24'),
         dateFormat: storedSettings?.date_format ?? (data?.date_format ?? 'DMY'),
         settingsAreLoading: loading ?? false,
      })
   }, [data, storedSettings, loading])
   
   return settings
   
}
