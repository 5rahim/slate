import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Box, Text } from 'chalkui/dist/cjs/React'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { DefaultHead } from '@slate/components/Layout/DefaultHead'
import UserDashboardLayout from '@slate/components/Layout/UserDashboard/UserDashboardLayout'
import { PermissionComponent } from '@slate/components/Permissions'
import { withApollo } from '@slate/graphql/withApollo'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { Compose } from '@slate/next/compose'
import { DashboardPage } from '@slate/types/Next'


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
   withPageAuthRequired,
   withApollo({ ssr: true }),
   withAuth({ requireActiveAccount: true }),
   withDashboard(),
)(Page)

