import { BiArrowBack } from '@react-icons/all-files/bi/BiArrowBack'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentUnit, useCurrentUnitName } from '@slate/hooks/useCurrentUnit'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
import { useLinkHref } from '@slate/hooks/useLinkHref'
import { useModuleFolder } from '@slate/hooks/useModuleFolder'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { ModuleList } from '@slate/modules/Course/Shared/Units/Modules/ModuleList'
import { UnitAssessments } from '@slate/modules/Course/Shared/Units/UnitAssessments'
import { Alert, AlertDescription, AlertIcon } from 'chalkui/dist/cjs/Components/Alert'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from 'chalkui/dist/cjs/Components/Breadcrumb'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Flex } from 'chalkui/dist/cjs/Components/Layout/Flex'
import { Text } from 'chalkui/dist/cjs/Components/Typography'
import { IconButton } from 'chalkui/dist/cjs/React'
import Link from 'next/link'
import React from 'react'

export const UnitContent = () => {
   
   const { getCourseHref } = useLinkHref()
   const unit = useCurrentUnit()
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const unitName = useCurrentUnitName()
   const { formatDate } = useDateFormatter()
   
   const {isFolderOpen, openedFolder, closeFolder} = useModuleFolder()
   
   return (
      <>
         
         <Box>
   
            <Breadcrumb
               bgColor={cmf('gray.100', 'gray.700')}
               padding="2"
               borderRadius="md"
               mb="3"
            >
               <BreadcrumbItem>
                  <Link href={getCourseHref('/content')}>
                     <BreadcrumbLink>{t('course:Course Content')}</BreadcrumbLink>
                  </Link>
               </BreadcrumbItem>
      
               <BreadcrumbItem isCurrentPage={!isFolderOpen}>
                  <BreadcrumbLink onClick={closeFolder} >{unitName}</BreadcrumbLink>
               </BreadcrumbItem>
               
               {isFolderOpen && (
                  <BreadcrumbItem isCurrentPage={isFolderOpen}>
                     <BreadcrumbLink>{openedFolder?.content}</BreadcrumbLink>
                  </BreadcrumbItem>
               )}
   
            </Breadcrumb>
   
            {unit.archived && <Alert mb="3" status="warning" variant="secondary">
                <AlertIcon />
                <AlertDescription>{t('course:options.unit.is archived')}</AlertDescription>
            </Alert>}
   
            {!unit.archived && !unit.available && !unit.is_scheduled && <Alert mb="3" status="warning" variant="secondary">
                <AlertIcon />
                <AlertDescription>{t('course:options.unit.not available')}</AlertDescription>
            </Alert>}
   
            {!unit.archived && !unit.available && unit.is_scheduled && <Alert mb="3" status="info" variant="secondary">
                <AlertIcon />
                <AlertDescription>{t('course:options.unit.will be available')} {formatDate(unit.publish_on, 'short with hours')}</AlertDescription>
            </Alert>}
            
            
            { !isFolderOpen && <UnitAssessments /> }
            
            { isFolderOpen && (
               <Flex alignItems="center" gridGap=".5rem" mb="2">
                  <IconButton aria-label="" as={BiArrowBack} p="2" colorScheme="brand.100" size="sm" onClick={closeFolder} />
                  <Text textDecoration="underline" fontSize="xl" fontWeight="bold">{openedFolder?.content}</Text>
               </Flex>
            ) }
            
            <ModuleList />
         
         </Box>
      
      </>
   )
   
}
