import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { BiFolderOpen } from '@react-icons/all-files/bi/BiFolderOpen'
import { FcViewDetails } from '@react-icons/all-files/fc/FcViewDetails'
import { CourseLayout } from '@slate/components/Layout/CourseLayout'
import { MediaComponent } from '@slate/components/Layout/MediaQueries/MediaComponent'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withCourse } from '@slate/middlewares/dashboard/withCourse'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { StudentOptions } from '@slate/modules/Course/Instructor/Settings/StudentOptions'
import { UnitArchive } from '@slate/modules/Course/Instructor/Units/UnitArchive'
import { UnitCreation } from '@slate/modules/Course/Instructor/Units/UnitCreation'
import { CourseContextMenu } from '@slate/modules/Course/Shared/CourseContextMenu'
import { UnitList } from '@slate/modules/Course/Shared/Units/UnitList'
import { Compose } from '@slate/next/compose'
import { DashboardPage } from '@slate/types/Next'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { ButtonGroup } from 'chalkui/dist/cjs/Components/Button/ButtonGroup'
import { Icon } from 'chalkui/dist/cjs/Components/Icon/Icon'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Flex } from 'chalkui/dist/cjs/Components/Layout/Flex'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React from 'react'


const Page = React.memo(({ user, school, course }: DashboardPage) => {
   
   const t = useTypeSafeTranslation()
   
   return (
      <CourseLayout
         headerMenuIndex={1}
         pageTitle={course?.name}
         leftPanel={
            <>
               
               <CourseContextMenu index={1} />
               
               <StudentOptions />
            
            </>
         }
      >
         
         <>
            <Box>
               
               <MediaComponent.ShowOnTabletAndSmaller>
                  <Box mb="5">
                     <ButtonGroup width="100%" colorScheme="brand.100">
                        <Button borderRadius="xl" width="100%">{t('Quizzes')}</Button>
                        <Button borderRadius="xl" width="100%">{t('Assignments')}</Button>
                     </ButtonGroup>
                  </Box>
               </MediaComponent.ShowOnTabletAndSmaller>
               
               <ModuleBox headerText={t('Content')} headerIcon={<BiFolderOpen />} headerAction={
                  <Flex gridGap=".5rem">
                     <UnitArchive />
                     <UnitCreation />
                  </Flex>
               }>
                  
                  <Flex
                     height="50px"
                     borderRadius="xl"
                     bgColor="brand.300"
                     width="100%"
                     alignItems="center"
                     px="4"
                     color="#fff"
                     mb="4"
                     position="relative"
                     cursor="pointer"
                     sx={{
                        _hover: {
                           '& > .syllabus_icon': {
                              transform: 'scale(1.8) rotate(-8deg)'
                           }
                        }
                     }}
                  >
                     <Icon as={FcViewDetails} position="absolute" fontSize="3xl" className="syllabus_icon" transition="all .15s ease-in-out" />
                     <Text ml="10" fontSize="xl">Syllabus</Text>
                  </Flex>
                  
                  <UnitList />
               
               </ModuleBox>
            </Box>
         </>
      
      </CourseLayout>
   )
})

export default Compose(
   withApollo(),
   withPageAuthRequired,
   withAuth({ requireActiveAccount: true }),
   withDashboard(),
   withCourse(),
)(Page)

