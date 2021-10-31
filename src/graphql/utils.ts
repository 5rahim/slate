import { ApolloClient, ApolloError, DocumentNode, ErrorPolicy, FetchPolicy, QueryResult, QueryTuple, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_USER_BY_EMAIL_QUERY } from 'slate/graphql/queries/users/queries'

export const getData = (data: any) => {
   
   if (data === undefined || data === [] || data.length === 0 || !data) {
      return null
   }
   
   return data
   
}

/**
 * | [{...}] -> {...}
 * | undefined || [] -> null
 */
export const getSingleObject = (data: any) => {
   
   if (data === undefined || data === [] || data.length === 0 || !data) {
      return null
   }
   
   return data[0] ?? null
   
}

/**
 *
 * @param {ApolloError | undefined} error
 * @param {string} message
 * @param {boolean} debug
 */
export const handleQueryHookErrors = (error: ApolloError | undefined, message: string, debug: boolean) => {
   
   debug && console.error("[QueryHook Error]: ", error)
   
   // TODO: ErrorSlice.setNewInternalError(message)
   
}


/**
 * QUERY HOOK CREATOR
 */


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
 * return useQueryHookCreator<SlateUser | null>("users", GET_USER_BY_EMAIL_QUERY, "object", {
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
      errorMessage?: string
   },
): QueryHookCreatorReturn<T> {
   
   options.debug && console.log('[QueryHook]: Query started', '\n\tTable: ', table, '\n\tVariables: ', options.variables)
   const queryResult = useQuery(query, {
      variables: options.variables,
      onCompleted: options.onCompleted,
      fetchPolicy: options.fetchPolicy ?? "cache-first",
   })
   
   return getQueryHookReturn<T>({ table, queryResult, debug: options.debug, objectOrArray: objectOrArray, errorMessage: options.errorMessage })
   
}

export type QueryHookCreatorReturn<T> = [T, boolean, boolean, ApolloClient<any>]


/**
 * @example
 * const res = useQuery(GET_USER_BY_EMAIL_QUERY, {
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
         handleQueryHookErrors(error, errorMessage, debug)
         setReturnData(null)
      }
      
   }, [loading, error, data])
   
   return [returnData, isLoading, isEmpty, client]
   
}


/**
 * Legacy utils
 */

/**
 * @deprecated
 * @param {string} data_id
 * @param {QueryTuple<any, any>} res
 * @param {"single" | "multiple"} size
 * @returns {QueryTuple<any, any>}
 */

export const legacyLazyQueryReturn = (data_id: string, res: QueryTuple<any, any>, size: "single" | "multiple" = "multiple"): QueryTuple<any, any> => {
   const [load, { loading, error, data, ...rest }] = res
   
   // @ts-ignore
   return [load, { loading, error, data: (data && data[data_id] ? (size === "single" ? getSingleObject(data[data_id]) : getData(data[data_id])) : null) as any, ...rest }]
}

/**
 * @deprecated
 * @param {string} data_id
 * @param {QueryResult<any, any>} res
 * @param {"single" | "multiple"} size
 * @returns {QueryResult}
 */
export const legacyQueryReturn = (data_id: string, res: QueryResult<any, any>, size: "single" | "multiple" = "multiple"): QueryResult => {
   const { loading, error, data, ...rest } = res
   
   return { loading, error, data: (data && data[data_id] ? (size === "single" ? getSingleObject(data[data_id]) : getData(data[data_id])) : null) as any, ...rest }
}

/**
 * @deprecated
 * @param {QueryResult} res
 */
export const legacyHandleQueryError = (res: QueryResult) => {
   if (process.env.NODE_ENV === "development") {
      if (res.error) {
         console.log('----------------[HANDLE QUERY ERROR]-------------------')
         console.error("[HASURA QUERY ERROR]: ", res.error)
         console.log('----------------[HANDLE QUERY ERROR]-------------------')
      }
   }
}

/**
 * @deprecated
 * @param {QueryTuple<any, any>} res
 */
export const legacyHangleQueryError = (res: QueryTuple<any, any>) => {
   if (process.env.NODE_ENV === "development") {
      if (res[1].error) console.error("[HASURA QUERY ERROR]: ", res[1].error)
   }
}
