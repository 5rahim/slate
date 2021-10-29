import { withApollo } from 'slate/graphql/withApollo'
import UserDashboardLayout from 'slate/components/Layout/UserDashboard/UserDashboardLayout'
import React from 'react'
import { Compose } from 'slate/next/compose'
import { withAuth } from 'slate/middlewares/auth/withAuth'
import { DefaultHead } from 'slate/components/Layout/DefaultHead'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'chalkui/dist/cjs/React'
import { Flex } from 'chalkui/dist/cjs/Components/Layout'
import { DashboardPage } from 'slate/next/types'
import { PermissionComponent } from 'slate/components/Permissions'
import { withDashboard } from 'slate/middlewares/dashboard/withDashboard'


const Page = ({ user, school }: DashboardPage) => {
   
   const { t, i18n } = useTranslation(['common'], { useSuspense: false })

   
   return (
      <>
         <DefaultHead pageTitle={t('Dashboard')} />
   
         <UserDashboardLayout width="full" mx="auto" p={3}>
            {/*<IndexHeader />*/}
      
            <Box>
               <Flex fontSize="1.6rem">
                  <Text fontWeight="700">Hello, {user?.first_name}.</Text>&nbsp;Welcome back
               </Flex>
            </Box>
            
            <Box>
               <PermissionComponent.StudentOnly>
                  Join a course
               </PermissionComponent.StudentOnly>
            </Box>
            
         </UserDashboardLayout>
      </>
   )
}

export default Compose(
   withApollo({ ssr: true }),
   withAuth({ requireAuth: true, requireActiveAccount: true }),
   withDashboard()
)(Page)

