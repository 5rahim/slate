import { ApolloClient, DocumentNode, ErrorPolicy, FetchPolicy, QueryHookOptions, QueryResult, useQuery } from '@apollo/client'
import { handleApolloErrors } from '@slate/graphql/hooks/handleApolloErrors'
import { getData, getSingleObject } from '@slate/graphql/utils'
import { useToast } from 'chalkui/dist/cjs/React'
import { useEffect, useState } from 'react'

export type QueryHookCreator<T> = (...props: any) => QueryHookCreatorReturn<T>


export interface QueryHookCreatorReturnProps {
   table: string,
   errorMessage?: string,
   queryResult: QueryResult<any, any>,
   objectOrArray: "object" | "array",
   debug?: boolean
}


/**
 * @example
 * return useQueryHookCreator<SlateUser | null>("users", GET_USER_BY_EMAIL, "object", {
      variables: { email: profile?.email },
      debug: false
   })
 * @param {string} table
 * @param {DocumentNode} query
 * @param objectOrArray
 * @param options
 * @returns {QueryHookCreatorReturn<T>}
 */
export function useQueryHookCreator<T>(
   table: string,
   query: DocumentNode,
   objectOrArray: "object" | "array",
   options: {
      variables?: { [key: string]: any },
      errorPolicy?: ErrorPolicy,
      fetchPolicy?: FetchPolicy
      onCompleted?: (data: T | {}) => void,
      debug?: boolean,
      errorMessage?: string,
      sendNotification?: any
   } & QueryHookOptions,
): QueryHookCreatorReturn<T> {
   
   const { sendNotification, ...rest } = options
   
   options.debug && console.log('[QueryHook]: Query started', '\n\tTable: ', table, '\n\tVariables: ', options.variables)
   
   const queryResult = useQuery(query, {
      variables: options.variables,
      onCompleted: (data) => {
         options.onCompleted && options.onCompleted(data)
         
         // TODO: Send notification
         if (sendNotification) {
         
         }
      },
      fetchPolicy: options.fetchPolicy ?? "cache-first",
      ...rest,
   })
   
   return getQueryHookReturn<T>({ table, queryResult, debug: options.debug, objectOrArray: objectOrArray, errorMessage: options.errorMessage })
   
}

type LoadingState = boolean
type EmptyState = boolean
export type QueryHookCreatorReturn<T> = [T, LoadingState, EmptyState, ApolloClient<any>]


/**
 * @example
 * const res = useQuery(GET_USER_BY_EMAIL, {
   variables: { email: profile?.email },
   fetchPolicy: 'cache-first',
})
 
 return getQueryHookReturn({ table: 'users', queryResult: res, objectOrArray: 'object' })
 * @param {string} table
 * @param {string | undefined} errorMessage
 * @param {QueryResult<any, any>} queryResult
 * @param {"object" | "array"} objectOrArray
 * @param {boolean | undefined} debug
 * @returns {QueryHookCreatorReturn<T>}
 */
export function getQueryHookReturn<T>(
   {
      table,
      errorMessage = "Internal Server Error",
      queryResult,
      objectOrArray,
      debug = false,
   }: QueryHookCreatorReturnProps): QueryHookCreatorReturn<T> {
   
   const { loading, error, data, client, ...resultProperties } = queryResult
   
   const toast = useToast()
   
   const [returnData, setReturnData] = useState<any>(null)
   const [isLoading, setIsLoading] = useState<any>(true)
   const [isEmpty, setIsEmpty] = useState<boolean>(false)
   
   useEffect(() => {
      debug && console.log('[QueryHook]: Query concluded', '\n\tTable: ', table, '\n\tRaw data: ', data, '\n\tData: ', returnData)
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
   
   return [returnData, isLoading, isEmpty, client]
   
}
