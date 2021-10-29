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
import { withPageAuthRequired } from '@auth0/nextjs-auth0'


const Page = () => {
   
   const { t, i18n } = useTranslation(['common'], { useSuspense: false })
   
   
   return (
      <>
         <DefaultHead pageTitle={t('Dashboard')} />
         
            {/*<IndexHeader />*/}
            
            <Box>
               <Flex fontSize="1.6rem">
                  <Text fontWeight="700">Hello, </Text>&nbsp;Welcome back
               </Flex>
            </Box>
         
      </>
   )
}

export default Compose(
   withPageAuthRequired
)(Page)

