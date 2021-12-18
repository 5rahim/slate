import { DividedList } from 'chalkui/dist/cjs/Components/Layout'
import { ListProps } from 'chalkui/dist/cjs/Components/Layout/List'
import React from 'react'

export const SettingList = ({ children, ...rest }: ListProps) => {
   
   return (
      <DividedList spacing={2} width="full" {...rest}>
      
         {children}
   
      </DividedList>
   )
   
}
