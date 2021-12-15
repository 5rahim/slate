import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { AppActions, AppSelectors } from '@slate/store/slices/appSlice'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Flex } from 'chalkui/dist/cjs/Components/Layout/Flex'
import { Portal } from 'chalkui/dist/cjs/Portal/Portal'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const StudentViewPortal = () => {
   const dispatch = useDispatch()
   const studentView = useSelector(AppSelectors.studentView)
   const t = useTypeSafeTranslation()
   
   return (
      <>
         <Portal>
            {studentView && (
               <>
                  <Box
                     zIndex="9999"
                     width="5px"
                     height="100%"
                     position="fixed"
                     bgColor="brand.400"
                     left="0"
                     top="0"
                  />
                  <Box
                     zIndex="9999"
                     width="5px"
                     height="100%"
                     position="fixed"
                     bgColor="brand.400"
                     right="0"
                     top="0"
                  />
                  <Box
                     zIndex="9999"
                     width="100%"
                     height="5px"
                     position="fixed"
                     bgColor="brand.400"
                     left="0"
                     top="0"
                  />
                  <Flex
                     zIndex="9999"
                     width="100%"
                     height="50px"
                     p={4}
                     position="fixed"
                     bgColor="brand.400"
                     left="0"
                     bottom="0"
                     color="white"
                     gridGap="1rem"
                     alignItems="center"
                     justifyContent="center"
                  >
                     {t('You are currently in Student View')}
                     <Button size="sm" onClick={() => dispatch(AppActions.toggleStudentView())}>{t('Turn off Student View')}</Button>
                  </Flex>
               </>
            )}
         </Portal>
      </>
   )
   
}
