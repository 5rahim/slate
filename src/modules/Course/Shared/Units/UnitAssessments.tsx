import { AiOutlineSnippets } from '@react-icons/all-files/ai/AiOutlineSnippets'
import { BiTrash } from '@react-icons/all-files/bi/BiTrash'
import { VscChecklist } from '@react-icons/all-files/vsc/VscChecklist'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { MenuCelledList, MenuCelledListItem } from '@slate/components/UI/MenuCelledList'
import { Assignments } from '@slate/generated/graphql'
import { useRemoveAssessmentFromUnitMutation } from '@slate/graphql/schemas/units/hooks'
import { usePublishDateSetting } from '@slate/hooks/settings/usePublishDateSetting'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentUnit } from '@slate/hooks/useCurrentUnit'
import { useGradebookItemHelpers } from '@slate/hooks/useGradebookItemHelpers'
import { useLinkHref } from '@slate/hooks/useLinkHref'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { IconButton } from 'chalkui/dist/cjs/Components/Button/IconButton'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox/IconBox'
import { Badge, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export function UnitAssessments() {
   
   const t = useTypeSafeTranslation()
   const cmf = useCMF()
   const unit = useCurrentUnit()
   const { publishDateHelpers } = usePublishDateSetting()
   const router = useRouter()
   const { linkToAssignment } = useLinkHref()
   const {
      gbi_isAssigned,
      gbi_hasSubmittedAttempt,
   } = useGradebookItemHelpers()
   
   const [removeAssessment, mutationLoading] = useRemoveAssessmentFromUnitMutation({
      onCompleted: () => {
         // router.reload()
      },
   })
   
   
   function handleRemoveAssessment(unit_assessment_id: string) {
      removeAssessment({
         id: unit_assessment_id,
      })
   }
   
   const assignments = unit.assessments.filter((assessment) => assessment.assignment && gbi_isAssigned(assessment.assignment.gradebook_item))
   const tests = unit.assessments.filter((assessment) => assessment.test && gbi_isAssigned(assessment.test.gradebook_item))
   
   
   return (
      <>
         
         <Flex
            flexDirection={['column', 'column', 'row', 'row', 'row']}
            gridGap="1rem"
            placeItems="flex-start"
            mb="1rem"
         >
            <Flex
               p={[3, 3, 4, 4, 4]}
               width="100%"
               border="2px solid"
               borderColor={cmf("gray.200", 'gray.700')}
               borderRadius="xl"
               transition="all .15s linear"
               flexDirection="column"
               _hover={{
                  boxShadow: 'md',
               }}
            >
               <Flex>
                  <Box mr="3">
                     <IconBox size="lg" p="3" colorScheme="teal.500" variant="secondary" as={AiOutlineSnippets} />
                  </Box>
                  <Box width="100%">
                     <Text fontSize="2xl" fontWeight="bold">{t('Assignments')}</Text>
                     <Box width="100%">
                        <Text>{assignments.length} {t('course:assignments due this week')}</Text>
                     </Box>
                  </Box>
               </Flex>
               <Box>
                  {assignments.length > 0 && <MenuCelledList mt="2" width="100%">
                     
                     {assignments.map((assessment) => {
                        const assignment = assessment.assignment
                        if (!assignment) return
                        return (
                           <>
                              <MenuCelledListItem cursor="default" key={assignment.id}>
                                 <Flex justifyContent="space-between">
                                    <ComponentVisibility.StudentOnly>
                                       <Link href={linkToAssignment(assignment.id)}>
                                          <Text cursor="pointer">{assignment.name}</Text>
                                       </Link>
                                    </ComponentVisibility.StudentOnly>
                                    <ComponentVisibility.AssistantAndHigher>
                                       <Text>{assignment.name}</Text>
                                    </ComponentVisibility.AssistantAndHigher>
                                    <AlignedFlex>
                                       <ComponentVisibility.RealStudentOnly>
                                          <Badge
                                             fontSize=".75rem"
                                             pill
                                             colorScheme={gbi_hasSubmittedAttempt(assignment?.gradebook_item) ? 'green.500' : 'gray.500'}
                                          >
                                             {t(gbi_hasSubmittedAttempt(assignment?.gradebook_item) ? 'Completed' : 'Not completed')}
                                          </Badge>
                                       </ComponentVisibility.RealStudentOnly>
                                       <ComponentVisibility.AssistantAndHigher>
                                          {publishDateHelpers.icons({
                                             status: assignment?.gradebook_item?.status, availableFrom: assignment?.gradebook_item?.available_from,
                                          })}
                                          <IconButton
                                             size="xs"
                                             colorScheme="red.500"
                                             variant="secondary"
                                             p=".125rem"
                                             aria-label="Delete"
                                             as={BiTrash}
                                             onClick={() => handleRemoveAssessment(assessment.id)}
                                          />
                                       </ComponentVisibility.AssistantAndHigher>
                                    </AlignedFlex>
                                 </Flex>
                              </MenuCelledListItem>
                           </>
                        )
                     })}


                  </MenuCelledList>}
               </Box>
            </Flex>
            <Flex
               p={[3, 3, 4, 4, 4]}
               width="100%"
               border="2px solid"
               borderColor={cmf("gray.200", 'gray.700')}
               borderRadius="xl"
               transition="all .15s linear"
               flexDirection="column"
               _hover={{
                  boxShadow: 'md',
               }}
            >
               <Flex>
                  <Box mr="3">
                     <IconBox size="lg" p="3" colorScheme="blue.500" variant="secondary" as={VscChecklist} />
                  </Box>
                  <Box width="100%">
                     <Text fontSize="2xl" fontWeight="bold">{t('Tests')}</Text>
                     <Box width="100%">
                        <Text>{tests.length} {t('course:tests due this week')}</Text>
                     </Box>
                  </Box>
               </Flex>
               <Box>
                  {tests.length > 0 && <MenuCelledList mt="2" width="100%">
                     
                     {tests.map((assessment) => {
                        const test = assessment.test
                        if (!test) return
                        return <MenuCelledListItem key={test.id}>
                           <Flex justifyContent="space-between">
                              <Text>{test.name}</Text>
                              <AlignedFlex>
                                 <ComponentVisibility.RealStudentOnly>
                                    <Badge
                                       fontSize=".75rem"
                                       pill
                                       colorScheme={gbi_hasSubmittedAttempt(test?.gradebook_item) ? 'green.500' : 'gray.500'}
                                    >
                                       {t(gbi_hasSubmittedAttempt(test?.gradebook_item) ? 'Completed' : 'Not completed')}
                                    </Badge>
                                 </ComponentVisibility.RealStudentOnly>
                                 <ComponentVisibility.AssistantAndHigher>
                                    {publishDateHelpers.icons({
                                       status: test?.gradebook_item?.status, availableFrom: test?.gradebook_item?.available_from,
                                    })}
                                    <IconButton
                                       size="xs"
                                       colorScheme="red.500"
                                       variant="secondary"
                                       p=".125rem"
                                       aria-label="Delete"
                                       as={BiTrash}
                                       onClick={() => handleRemoveAssessment(assessment.id)}
                                    />
                                 </ComponentVisibility.AssistantAndHigher>
                              </AlignedFlex>
                           </Flex>
                        </MenuCelledListItem>
                     })}
                  </MenuCelledList>}
               </Box>
            </Flex>
         </Flex>
      
      </>
   )
   
}
