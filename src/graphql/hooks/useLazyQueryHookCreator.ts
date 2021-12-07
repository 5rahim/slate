import {
   ApolloClient, DocumentNode, ErrorPolicy, FetchPolicy, LazyQueryHookOptions, QueryLazyOptions, QueryTuple, useLazyQuery,
} from '@apollo/client'
import { handleApolloErrors } from '@slate/graphql/hooks/handleApolloErrors'
import { getData, getSingleObject } from '@slate/graphql/utils'
import { useToast } from 'chalkui/dist/cjs/Components/Toast/UseToast'
import { useEffect, useState } from 'react'

export type LazyQueryHookCreator<TData> = (...props: any) => LazyQueryHookCreatorReturn<TData>


export interface LazyQueryHookCreatorReturnProps {
   table: string,
   errorMessage?: string,
   lazyQueryResult: QueryTuple<any, any>,
   objectOrArray: "object" | "array",
   debug?: boolean
}


/**
 * @param {string} table
 * @param {DocumentNode} query
 * @param objectOrArray
 * @param options
 * @returns {LazyQueryHookCreatorReturn<TData>}
 */
export function useLazyQueryHookCreator<TData>(
   table: string,
   query: DocumentNode,
   objectOrArray: "object" | "array",
   options: {
      variables?: { [key: string]: any },
      errorPolicy?: ErrorPolicy,
      fetchPolicy?: FetchPolicy
      onCompleted?: (data: TData | {}) => void,
      debug?: boolean,
      errorMessage?: string,
      sendNotification?: any
   } & LazyQueryHookOptions,
): LazyQueryHookCreatorReturn<TData> {
   
   const { sendNotification, ...rest } = options
   
   options.debug && console.log('[LazyQueryHook]: Query started', '\n\tTable: ', table, '\n\tVariables: ', options.variables)
   
   const lazyQueryResult = useLazyQuery(query, {
      variables: options.variables,
      onCompleted: (data) => {
         options.onCompleted && options.onCompleted(data)
         console.log('[LazyQueryHook]: Completed', '\n\tTable: ', table)
         // TODO: Send notification
         if (sendNotification) {
         
         }
      },
      fetchPolicy: options.fetchPolicy ?? "cache-first",
      ...rest,
   })
   
   return getLazyQueryHookReturn<TData>({
      table, lazyQueryResult, debug: options.debug, objectOrArray: objectOrArray, errorMessage: options.errorMessage,
   })
   
}

type LoadingState = boolean
type EmptyState = boolean
export type LazyQueryHookCreatorReturn<TData> = [
   ( (options?: QueryLazyOptions<any>) => void ),
   TData,
   LoadingState,
   EmptyState,
      ApolloClient<any> | undefined
] | [null, null, false, false, undefined]


export function getLazyQueryHookReturn<TData>(
   {
      table,
      errorMessage = "Internal Server Error",
      lazyQueryResult,
      objectOrArray,
      debug = false,
   }: LazyQueryHookCreatorReturnProps): LazyQueryHookCreatorReturn<TData> {
   
   const [fetchFunction, { loading, error, data, client, ...resultProperties }] = lazyQueryResult
   
   const toast = useToast()
   
   const [returnData, setReturnData] = useState<any>(null)
   const [isLoading, setIsLoading] = useState<any>(true)
   const [isEmpty, setIsEmpty] = useState<boolean>(false)
   
   useEffect(() => {
      debug && console.log('[LazyQueryHook]: Query concluded', '\n\tTable: ', table, '\n\tRaw data: ', data, '\n\tData: ', returnData)
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
   
   return [fetchFunction, returnData, isLoading, isEmpty, client]
   
}
