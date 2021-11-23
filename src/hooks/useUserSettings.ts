import { getUserSettings } from '@slate/graphql/schemas/users/hooks'
import { useUserSessionProfile } from '@slate/hooks/useCurrentUser'
import { useEffect, useState } from 'react'

interface UserSettings {
   hourFormat: string,
   dateFormat: string,
   settingsAreLoading: boolean
}

export const useUserSettings = (): UserSettings => {
   
   const { profile } = useUserSessionProfile()
   
   const [data, loading] = getUserSettings(profile)
   
   const [settings, setSettings] = useState<UserSettings>({ hourFormat: '24', dateFormat: 'DMY', settingsAreLoading: true })
   
   useEffect(() => {
      setSettings({
         hourFormat: data?.hour_format ?? '24',
         dateFormat: data?.date_format ?? 'DMY',
         settingsAreLoading: loading,
      })
   }, [data])
   
   return settings
   
}
