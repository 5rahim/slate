import { FcEmptyTrash } from '@react-icons/all-files/fc/FcEmptyTrash'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Center } from 'chalkui/dist/cjs/Components/Layout'
import { Box, Icon, Text } from 'chalkui/dist/cjs/React'
import React from 'react'

interface EmptyProps {
   icon?: any | undefined,
   text?: string
}

export function Empty({ text, icon }: EmptyProps) {
   const t = useTypeSafeTranslation()
   
   return (
      <Box opacity=".6" pointerEvents="none" userSelect="none">
         <Center>
            <Icon as={icon ? icon : FcEmptyTrash} fontSize="4rem" />
         </Center>
         <Center>
            <Text fontSize="xl">{t('course:' + ( text ? text : 'No data' ))}</Text>
         </Center>
      </Box>
   )
}
