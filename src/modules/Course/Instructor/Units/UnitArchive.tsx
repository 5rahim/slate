import { BiArchive } from '@react-icons/all-files/bi/BiArchive'
import { BiArchiveOut } from '@react-icons/all-files/bi/BiArchiveOut'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { Empty } from '@slate/components/UI/Empty'
import { DataListModule } from '@slate/graphql/DataListModule'
import { getArchivedUnits, useMutateUnarchiveUnit } from '@slate/graphql/schemas/units/hooks'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useGlobalCache } from '@slate/hooks/useGlobalCache'
import { useLinkHref } from '@slate/hooks/useLinkHref'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox/IconBox'
import { Box, Flex, ListItem } from 'chalkui/dist/cjs/Components/Layout'
import { CelledList } from 'chalkui/dist/cjs/Components/Layout/List'
import {
   AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay,
} from 'chalkui/dist/cjs/Components/Modal/AlertDialog'
import { Text } from 'chalkui/dist/cjs/Components/Typography'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import Link from 'next/link'
import React, { useRef } from 'react'

interface UnitArchiveProps {

}

export const UnitArchive = (props: UnitArchiveProps) => {
   
   const t = useTypeSafeTranslation()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const cancelRef: any = useRef()
   const course = useCurrentCourse()
   const { linkToUnit } = useLinkHref()
   const cmf = useCMF()
   const cache = useGlobalCache()
   
   const [units, unitsLoading, empty] = getArchivedUnits(course.id)
   
   const [unarchiveUnit, mutationLoading] = useMutateUnarchiveUnit({
      onCompleted: data => {
         onClose()
      },
   })
   
   
   function handleUnarchive(unit_id: string) {
      unarchiveUnit({ id: unit_id, order: ( cache.readEntry('units')?.length ) ?? 0 })
   }
   
   return (
      <ComponentVisibility.InstructorOnly>
         
         <Button
            onClick={onOpen}
            variant="outline"
            borderRadius="3xl"
            colorScheme="primary"
            leftIcon={<BiArchive />}
         >
            {t('course:Archive')}
         </Button>
         
         <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            size="2xl"
            isCentered
         >
            <AlertDialogOverlay />
            
            <AlertDialogContent width="100%">
               <AlertDialogCloseButton />
               <Flex width="100%">
                  <IconBox fontSize="2xl" colorScheme="primary" isCircular icon={<BiArchive />} mt={4} ml={4} position="absolute" />
                  <Box pl="3.5rem" width="100%">
                     <AlertDialogHeader>{t('course:Archive')}</AlertDialogHeader>
                     <AlertDialogBody pb="6">
                        
                        <DataListModule
                           data={units}
                           dataIsLoading={unitsLoading}
                           dataIsEmpty={empty}
                           fallback={<></>}
                           empty={<Empty icon={BiArchive} text="No archived units" />}
                           displayData={({ list }) => (
                              <CelledList width="100%" overflow="hidden">
                                 {units?.map((unit) => (
                                    <ListItem bgColor={cmf("white", "gray.500")} key={unit.id} px={4} py={2}>
                                       <Flex alignItems="center" justifyContent="space-between">
                                          <Box>
                                             <Link href={linkToUnit(unit.id)}>
                                                <Flex cursor="pointer" _hover={{ color: 'brand.400' }}>
                                                   <Text fontSize="lg">{t('form:' + unit.type)}
                                                      &nbsp;{unit.number}</Text>
                                                   {!!unit.title && <Text fontSize="lg">: {unit.title}</Text>}
                                                </Flex>
                                             </Link>
                                          </Box>
                                          <Box>
                                             <Button
                                                onClick={() => handleUnarchive(unit.id)}
                                                size="sm"
                                                colorScheme="brand.100"
                                                isDisabled={mutationLoading}
                                                leftIcon={<BiArchiveOut />}
                                             >
                                                {t('course:Unarchive')}
                                             </Button>
                                          </Box>
                                       </Flex>
                                    </ListItem>
                                 ))}
                              </CelledList>
                           )}
                        />
                     
                     </AlertDialogBody>
                  </Box>
               </Flex>
            </AlertDialogContent>
         </AlertDialog>
      </ComponentVisibility.InstructorOnly>
   )
   
}
