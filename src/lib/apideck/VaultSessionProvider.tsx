import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import camelCaseKeys from 'camelcase-keys'
import { decode } from 'jsonwebtoken'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useState } from 'react'
import { useCookies } from 'react-cookie'
import { createVaultSession } from './createVaultSession'

export interface Session {
   applicationId: string
   consumerId: string
   consumerMetadata?: {
      account_name: string
      user_name: string
      email: string
      image: string
   }
   exp: number
   iat: number
   hideResourceSettings: boolean
   redirectUri: string
   theme: {
      favicon: string
      logo?: string
      primary_color: string
      privacy_url: string
      sidepanel_background_color: string
      sidepanel_text_color: string
      terms_url: string
      vault_name: string
   }
   settings?: {
      show_logs: boolean
   }
   jwt: string
}

export interface VaultSessionContextProps {
   createSession: () => Promise<void>
   setSession: (session: Session) => void
   session: Session
   jwt: string | undefined,
   token: Session | undefined,
   isLoading: boolean
}

export const VaultSessionContext = createContext<Partial<VaultSessionContextProps>>({})

export const ApideckVaultSessionProvider = ({ children }: { children: ReactNode }) => {
   const [session, setSession] = useState<Session>()
   const [jwt, setJWT] = useState<string>()
   const [token, setToken] = useState<Session>()
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const { push } = useRouter()
   const cache = useStoreCache()
   
   const [cookies, setCookie, removeCookie] = useCookies()
   
   const createSession = async () => {
      setIsLoading(true)
      try {
         
         
         const createVaultRes = await createVaultSession(`${window.location.href}?openFilePicker=true`)
         console.log(createVaultRes)
         const sessionUrl = createVaultRes?.data?.session_uri
         const jwt = sessionUrl.substring(sessionUrl.lastIndexOf('/') + 1)
         
         setCookie('vaultJWT', jwt)
         setJWT(jwt)
         
         const decoded = decode(jwt) as Session
         if (decoded) {
            setCookie('vaultToken', camelCaseKeys(decoded))
            setToken(token)
         }
         
         // const applySessionRes = await fetch(`/api/apideck/vault/jwt?jwt=${jwt}`)
         // const { jwt: resJWT, token: resToken } = await applySessionRes.json()
         // setJWT(resJWT)
         // setToken(resToken)
         
         
      }
      catch (e) {
         console.log(e)
      }
      setIsLoading(false)
   }
   
   return (
      <VaultSessionContext.Provider value={{ createSession, session, setSession, isLoading, jwt, token }}>
         {children}
      </VaultSessionContext.Provider>
   )
}

function useEffect(arg0: () => void, arg1: any[]) {
   throw new Error('Function not implemented.')
}

