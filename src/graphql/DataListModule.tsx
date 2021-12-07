import { Box, BoxProps } from 'chalkui/dist/cjs/Components/Layout/Box'

export type DataListItem<T> = (props: { data: T }) => JSX.Element

type DataListElement = (El: any, ...rest: any[]) => JSX.Element

type DataListModuleProps = {
   data: any
   dataIsLoading: boolean
   dataIsEmpty: boolean
   empty?: React.ReactNode
   fallback: React.ReactNode
   displayData: (props: { list: DataListElement }) => JSX.Element
} & BoxProps

/**
 * @example
 <DataListModule
   data={announcements}
   dataIsLoading={announcementsLoading}
   dataIsEmpty={isEmpty}
   fallback={
      <Stack>
         <Skeleton width="100px" height="10px" borderRadius="md" />
      </Stack>
   }
   displayData={({ list }) =>
      <DividedList>
         {list(Item)}
      </DividedList>
   }
 />
 * @param {DataListModuleProps} props
 * @returns {JSX.Element}
 * @constructor
 */
export function DataListModule(props: DataListModuleProps) {
   
   const { data, dataIsEmpty, dataIsLoading, empty, fallback, displayData, ...rest } = props
   
   return (
      <Box
         {...rest}
      >
         {( !dataIsLoading && !!data && data?.length > 0 )
         && displayData(
            {
               list: (El: any, ...rest) => {
                  return data.map((item: any) => {
                     return <El key={item.id} data={item} {...rest} />
                  })
               },
            },
         )}
         
         {( dataIsLoading ) && (
            fallback
         )}
         
         {( !dataIsLoading && (dataIsEmpty) ) && (
            empty
         )}
      </Box>
   )
   
}
