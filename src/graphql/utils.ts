import { QueryResult, QueryTuple } from '@apollo/client'

export const getData = (data: any) => {
   
   if(data === undefined || data === [] || data.length === 0 || !data) {
      return null
   }
   
   return data
   
}

export const getSingleObject = (data: any) => {
   
   if(data === undefined || data === [] || data.length === 0 || !data) {
      return null
   }

   return data[0] ?? null
   
   // return data === undefined ? (data?.length === 0 ? data : data[0]) : null
   
}

export const lazyQueryReturn = (data_id: string, res: QueryTuple<any, any>, size: "single" | "multiple" = "multiple"): QueryTuple<any, any> => {
   const [load, { loading, error, data, networkStatus, refetch, called, client, previousData, fetchMore, startPolling, stopPolling, updateQuery, subscribeToMore, variables }] = res
   
   // @ts-ignore
   return [load, { loading, error, data: (data && data[data_id] ? (size === "single" ? getSingleObject(data[data_id]) : getData(data[data_id])) : null) as any, networkStatus, refetch, called, client, previousData, fetchMore, startPolling, stopPolling, updateQuery, subscribeToMore, variables }]
}


export const queryReturn = (data_id: string, res: QueryResult<any, any>, size: "single" | "multiple" = "multiple"): QueryResult => {
   const { loading, error, data, networkStatus, refetch, called, client, previousData, fetchMore, startPolling, stopPolling, updateQuery, subscribeToMore, variables } = res
   
   return { loading, error, data: (data && data[data_id] ? (size === "single" ? getSingleObject(data[data_id]) : getData(data[data_id])) : null) as any, networkStatus, refetch, called, client, previousData, fetchMore, startPolling, stopPolling, updateQuery, subscribeToMore, variables }
}

export const useQueryReturn = (options: { id: string, error_message: string }, result: QueryResult<any, any>, object: boolean): any => {
   
   // returns [{ user, queryLoading, error }, apolloHelpers]
   
}

export const handleQueryError = (res: QueryResult) => {
   if(process.env.NODE_ENV === "development") {
      if(res.error) {
         console.log('----------------[HANDLE QUERY ERROR]-------------------')
         console.error("[HASURA QUERY ERROR]: ", res.error)
         console.log('----------------[HANDLE QUERY ERROR]-------------------')
      }
   }
}

export const handleLazyQueryError = (res: QueryTuple<any, any>) => {
   if(process.env.NODE_ENV === "development") {
      if(res[1].error) console.error("[HASURA QUERY ERROR]: ", res[1].error)
   }
}
