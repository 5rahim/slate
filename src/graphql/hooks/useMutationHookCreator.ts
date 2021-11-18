import { ApolloClient, DocumentNode, MutationFunctionOptions, MutationHookOptions, useMutation } from '@apollo/client'
import { handleApolloErrors } from '@slate/graphql/hooks/handleApolloErrors'
import { AppActions } from '@slate/store/slices/appSlice'
import { useToast } from 'chalkui/dist/cjs/React'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

export type SlateMutationHook = (options?: MutationFunctionOptions) => MutationHookCreatorReturn

type MutationHookCreatorFunction = (variables?: { [key: string]: any }, options?: MutationFunctionOptions) => any

type LoadingState = boolean
type EmptyState = boolean
type ErrorMessage = string
type ReturnData = any

type MutationHookCreatorReturn = [
   MutationHookCreatorFunction,
   LoadingState,
   ErrorMessage,
   ReturnData,
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
      onCompleted?: (data: any | {}) => void,
      sendNotification?: any // TODO: Notifications
      debug?: boolean
   } & MutationHookOptions,
): MutationHookCreatorReturn {
   
   const {
      errorMessage = "Internal Server Error",
      successAlert,
      sendNotification,
      debug = false,
      onCompleted,
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
         
         onCompleted && onCompleted(data)
         
         
         if (successAlert) {
            if (successAlert.type === "toast") {
               toast({
                  title: t(`alert:${successAlert.title}`) ?? "Success",
                  description: successAlert.description ? t(`alert:${successAlert.description}`) : null,
                  status: "success",
                  isClosable: true,
                  position: "top-right",
               })
            }
         }
         
         if (sendNotification) {
            // TODO: Send notification (query)
         }
         
      },
      ...rest,
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
      client,
   ]
   
}
