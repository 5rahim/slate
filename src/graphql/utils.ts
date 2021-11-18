import { QueryResult, QueryTuple } from '@apollo/client'

export const getData = (data: any) => {
   
   if (data === undefined || data.length === 0 || !data) {
      return null
   }
   
   return data
   
}

/**
 * | [{...}] -> {...}
 * | undefined || [] -> null
 */
export const getSingleObject = (data: any) => {
   
   if (data === undefined || data.length === 0 || !data) {
      return null
   }
   
   return data[0] ?? null
   
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
   return [load, {
      loading, error,
      data: ( data && data[data_id] ? ( size === "single" ? getSingleObject(data[data_id]) : getData(data[data_id]) ) : null ) as any, ...rest,
   }]
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
   
   return {
      loading, error,
      data: ( data && data[data_id] ? ( size === "single" ? getSingleObject(data[data_id]) : getData(data[data_id]) ) : null ) as any, ...rest,
   }
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
