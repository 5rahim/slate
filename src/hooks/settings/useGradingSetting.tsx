import { BiTask } from '@react-icons/all-files/bi/BiTask'
import { SettingSection } from '@slate/components/UI/Course/SettingSection'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { Box, Stack } from 'chalkui/dist/cjs/Components/Layout'
import {
   NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
} from 'chalkui/dist/cjs/Components/NumberInput/NumberInput'
import { Radio } from 'chalkui/dist/cjs/Components/Radio/Radio'
import { RadioGroup } from 'chalkui/dist/cjs/Components/Radio/RadioGroup'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React, { useState } from 'react'

enum ScoringTypes {
   Percentage = 'percentage',
   Points = 'points'
}

type ScoringType = "percentage" | "points"


/**
 * Fields: scoring_type, max_points
 */
export const useGradingSetting = (defaultValue?: {
   scoringType: ScoringType,
   maxPoints: number
}) => {
   
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   
   
   const [error, setError] = useState<boolean>(false)
   const [scoringType, setScoringType] = useState<ScoringType>(defaultValue?.scoringType ?? ScoringTypes.Points)
   const [maxPoints, setMaxPoints] = useState<number>(defaultValue?.scoringType === ScoringTypes.Percentage
      ? 100
      : ( defaultValue?.maxPoints ?? 100 ))
   
   const summary = scoringType === ScoringTypes.Points ? ( maxPoints + ' ' + t(`course:maximum points`) ) : t(`course:${scoringType}`)
   
   return {
      
      gradingValues: {
         scoring_type: scoringType,
         max_points: scoringType === ScoringTypes.Percentage ? 100 : maxPoints,
      },
      
      gradingFields: {
         
         isValid: () => {
            if (!!scoringType && !!maxPoints) {
               setError(false)
               return true
            } else {
               setError(true)
               return false
            }
         },
         
         render: () => {
            return (
               <>
                  <SettingSection
                     icon={BiTask}
                     title={t('Grading')}
                     summary={summary}
                     settingEdit={
                        <>
                           
                           <RadioGroup mt="4" size="lg" onChange={(v) => setScoringType(v as ScoringType)} value={scoringType}>
                              <Stack direction="row">
                                 <Radio value={ScoringTypes.Points}>{t(`course:points`)}</Radio>
                                 <Radio value={ScoringTypes.Percentage}>{t(`course:percentage`)}</Radio>
                              </Stack>
                           </RadioGroup>
                           
                           <Box mt="4" width="100%" display={scoringType === ScoringTypes.Points ? "block" : "none"}>
                              
                              <Text mb="2">{t('course:Points possible')}</Text>
                              
                              <NumberInput
                                 onChange={(v) => setMaxPoints(Number(v))}
                                 value={String(maxPoints)}
                                 size="md"
                                 step={1}
                                 min={0}
                                 max={100}
                                 allowMouseWheel
                              >
                                 <NumberInputField />
                                 <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                 </NumberInputStepper>
                              </NumberInput>
                           
                           </Box>
                        </>
                     }
                  >
                     
                     {error && (
                        <Text
                           color={cmf("red.500", "red.300")}
                           fontStyle="italic"
                           mt="1"
                           mb="2"
                        >
                           {t('form:' + FormErrors.RequiredField)}
                        </Text>
                     )}
                  </SettingSection>
               </>
            )
         },
         
      },
      
      gradingHelpers: {},
      
   }
}
