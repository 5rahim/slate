import { ApolloClient, ApolloError, DocumentNode, ErrorPolicy, FetchPolicy, MutationFunctionOptions, MutationHookOptions, QueryHookOptions, QueryResult, QueryTuple, useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_USER_BY_EMAIL_QUERY } from 'slate/graphql/queries/users/queries'
import { InternalRefetchQueriesInclude } from '@apollo/client/core'
import { useDispatch } from 'react-redux'
import { AppActions } from 'slate/store/slices/appSlice'
import { toast, useToast } from 'chalkui/dist/cjs/React'
import { useTranslation } from 'react-i18next'
import { Utils } from 'slate/utils'

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
export const handleApolloErrors = (error: ApolloError | undefined, message: string, debug: boolean, toast: any) => {
   
   process.env.NODE_ENV === 'development' && console.error("[QueryHook Error]: ", error)
   
   const additionalDetails = process.env.NODE_ENV === 'development' ?  error?.message : "If the problem persists, contact Slate's support"
   
   toast({
      duration: 8000,
      title: message,
      status: "error",
      position: "top",
      description: additionalDetails
   })
   
   setTimeout(() => {
      if(error?.toString().includes("JWT")) {
   
         toast({
            duration: 5000,
            title: "Your session has expired",
            status: "error",
            isClosable: true,
            position: "top",
         })
   
         setTimeout(() => {
            window.location.href = Utils.Url.linkToLogout()
         }, 1000)
      }
   }, 1000)
   
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
         if(sendNotification) {
         
         }
      },
      fetchPolicy: options.fetchPolicy ?? "cache-first",
      ...rest,
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

type MutationHookCreatorFunction = (variables?: { [key: string]: any }, options?: MutationFunctionOptions) => any

type MutationHookCreatorReturn = [
   MutationHookCreatorFunction,
   boolean,
   string,
   any,
   ApolloClient<any>
]
/**
 * MUTATION HOOK
 */

/**
 * @example
 * return useMutationHookCreator(UPDATE_COURSE_BANNER_COLOR, {
      refetchQueries: [
         { query: GET_COURSE_BY_ID },
         'GetCourseById',
      ],
      successAlert: {
         type: "toast",
         title: "Banner color updated"
      }
   })
 * @param {DocumentNode} mutation
 * @param {{errorMessage?: string, successAlert?: {type: "notification" | "toast", title?: string, description?: string}, debug?: boolean} &
 *    MutationHookOptions} options
 * @returns {MutationHookCreatorReturn}
 */
export function useMutationHookCreator(
   mutation: DocumentNode,
   options: {
      errorMessage?: string,
      successAlert?: {
         type: "notification" | "toast",
         title?: string,
         description?: string,
      },
      sendNotification?: any // TODO: Notifications
      debug?: boolean
   } & MutationHookOptions
): MutationHookCreatorReturn {
   
   const {
      errorMessage = "Internal Server Error",
      successAlert,
      sendNotification,
      debug = false,
      variables,
      ...rest
   } = options
   
   const dispatch = useDispatch()
   const toast = useToast()
   const { t, i18n } = useTranslation(['alert'], { useSuspense: false })
   
   const [handleMutation, { loading, client, data }] = useMutation(mutation, {
      variables,
      onError: (error) => {
        handleApolloErrors(error, errorMessage, debug, toast)
      },
      onCompleted: (data) => {
         dispatch(AppActions.setMutationIsLoading(false))
         
         if(successAlert) {
            if(successAlert.type === "toast") {
               toast({
                  title: t(`alert:${successAlert.title}`) ?? "Success",
                  description: successAlert.description ? t(`alert:${successAlert.description}`) : null,
                  status: "success",
                  isClosable: true,
                  position: "top-right"
               })
            }
         }
         
         if(sendNotification) {
            // TODO: Send notification (query)
         }
         
      },
      ...rest
   })
   
   function commitMutation(variables: any, functionOptions: any) {
      dispatch(AppActions.setMutationIsLoading(true))
      handleMutation({ variables: variables, ...functionOptions })
   }
   
   return [
      (variables?, functionOptions?) => commitMutation(variables, functionOptions),
      loading,
      errorMessage,
      data,
      client
   ]
   
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
