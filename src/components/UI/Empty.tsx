import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Center } from 'chalkui/dist/cjs/Components/Layout'
import { Box, Icon, Text } from 'chalkui/dist/cjs/React'
import React from 'react'
import { IconType } from 'react-icons'

interface EmptyProps {
   icon: IconType | undefined,
   text?: string
}

export function Empty({ text, icon }: EmptyProps) {
   const t = useTypeSafeTranslation()
   
   return (
      <Box opacity=".7" pointerEvents="none" userSelect="none">
         <Center>
            <Icon as={icon} fontSize="5rem" />
         </Center>
         <Center>
            <Text fontSize="2xl">{t('course:' + ( text ? text : 'No data' ))}</Text>
         </Center>
      </Box>
   )
}
