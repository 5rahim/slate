import { Users } from '@slate/generated/graphql'
import { getUserSettings } from '@slate/graphql/schemas/users/hooks'
import { useUserSessionProfile } from '@slate/hooks/useCurrentUser'
import { useEffect, useState } from 'react'

export const useUserSettings = () => {

   const {profile} = useUserSessionProfile()
   
   const [data] = getUserSettings(profile)
   
   const [settings, setSettings] = useState({ hour_format: '24', date_format: 'DMY' })
   
   useEffect(() => {
      setSettings({ hour_format: data?.hour_format ?? '24', date_format: data?.date_format ?? 'DMY' })
   }, [data])

   return settings as Pick<Users, 'date_format' | 'hour_format'>
   
}
