import { CelledList, ListLinkItem, ListLinkItemProps, ListProps } from 'chalkui/dist/cjs/Components/Layout/List'
import React from 'react'

export const MenuCelledList = (props: ListProps) => {
   
   const { children, ...rest } = props
   
   return (
      <CelledList boxShadow="none" width="full" gridGap={0} {...rest}>
         {children}
      </CelledList>
   )
   
}


export const MenuCelledListItem = (props: ListLinkItemProps) => {
   
   const { children, ...rest } = props
   
   return (
      <ListLinkItem px={4} py={2} {...rest}>
         {children}
      </ListLinkItem>
   )
   
}
