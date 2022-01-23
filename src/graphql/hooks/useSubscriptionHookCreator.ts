import { DocumentNode, ErrorPolicy, FetchPolicy, SubscriptionHookOptions, SubscriptionResult, useSubscription } from '@apollo/client'
import { handleApolloErrors } from '@slate/graphql/hooks/handleApolloErrors'
import { getData, getSingleObject } from '@slate/graphql/utils'
import { useToast } from 'chalkui/dist/cjs/Components/Toast/UseToast'
import { useEffect, useState } from 'react'

export type SubscriptionHookCreator<T> = (...props: any) => SubscriptionHookCreatorReturn<T>


export interface SubscriptionHookCreatorReturnProps {
   table: string,
   errorMessage?: string,
   subscriptionResult: SubscriptionResult<any>,
   objectOrArray: "object" | "array",
   debug?: boolean
}


/**
 * @example
 * return useSubscriptionHookCreator<SlateUser | null>("users", GET_USER_BY_EMAIL, "object", {
      variables: { email: profile?.email },
      debug: false
   })
 * @param {string} table
 * @param {DocumentNode} document
 * @param objectOrArray
 * @param options
 * @returns {SubscriptionHookCreatorReturn<T>}
 */
export function useSubscriptionHookCreator<T>(
   table: string,
   document: DocumentNode,
   objectOrArray: "object" | "array",
   options: {
      variables?: { [key: string]: any },
      errorPolicy?: ErrorPolicy,
      fetchPolicy?: FetchPolicy
      onCompleted?: (data: T | {}) => void,
      debug?: boolean,
      errorMessage?: string,
      sendNotification?: any
   } & SubscriptionHookOptions,
): SubscriptionHookCreatorReturn<T> {
   
   const { sendNotification, ...rest } = options
   
   options.debug && console.log('[SubscriptionHook]: Subscription started', '\n\tTable: ', table, '\n\tVariables: ', options.variables)
   
   const subscriptionResult = useSubscription(document, {
      variables: options.variables,
      onCompleted: (data: any) => {
         options.onCompleted && options.onCompleted(data)
         console.log('[SubscriptionHook]: Completed', '\n\tTable: ', table,)
         // TODO: Send notification
      },
      fetchPolicy: options.fetchPolicy ?? "no-cache",
      ...rest,
   })
   
   return getSubscriptionHookReturn<T>({ table, subscriptionResult, debug: options.debug, objectOrArray: objectOrArray, errorMessage: options.errorMessage })
   
}

type LoadingState = boolean
type EmptyState = boolean
export type SubscriptionHookCreatorReturn<T> = [T, LoadingState, EmptyState] | [null, false, false]


/**
 * @example
 * const res = useSubscription(GET_USER_BY_EMAIL, {
   variables: { email: profile?.email },
   fetchPolicy: 'no-cache',
})
 
 return getSubscriptionHookReturn({ table: 'users', subscriptionResult: res, objectOrArray: 'object' })
 * @param {string} table
 * @param {string | undefined} errorMessage
 * @param {SubscriptionResult<any, any>} subscriptionResult
 * @param {"object" | "array"} objectOrArray
 * @param {boolean | undefined} debug
 * @returns {SubscriptionHookCreatorReturn<T>}
 */
export function getSubscriptionHookReturn<T>(
   {
      table,
      errorMessage = "Internal Server Error",
      subscriptionResult,
      objectOrArray,
      debug = false,
   }: SubscriptionHookCreatorReturnProps): SubscriptionHookCreatorReturn<T> {
   
   const { loading, error, data, ...resultProperties } = subscriptionResult
   
   const toast = useToast()
   
   const [returnData, setReturnData] = useState<any>(null)
   const [isLoading, setIsLoading] = useState<any>(true)
   const [isEmpty, setIsEmpty] = useState<boolean>(false)
   
   useEffect(() => {
      debug && console.log('[SubscriptionHook]: Subscription concluded', '\n\tTable: ', table, '\n\tRaw data: ', data, '\n\tData: ', returnData)
      // setIsLoading(false)
      setIsEmpty(returnData === null)
   }, [returnData])
   
   useEffect(() => {
      
      if (!loading && data) {
         setReturnData(objectOrArray === 'object' ? getSingleObject(data[table]) : getData(data[table]))
         setIsLoading(false)
      } else if (!loading) {
         setReturnData(null)
      }
      
      if (error) {
         handleApolloErrors(error, errorMessage, debug, toast)
         setReturnData(null)
      }
      
   }, [loading, error, data])
   
   return [returnData, isLoading, isEmpty]
   
}
