import { RiTimerLine } from '@react-icons/all-files/ri/RiTimerLine'
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
   Unlimited = 'unlimited',
   Limited = 'points'
}

type ScoringType = "unlimited" | "points"


/**
 * Fields: scoring_type, max_points
 */
export const useTimeLimitSetting = (defaultValue?: number) => {
   
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   
   
   const [error, setError] = useState<boolean>(false)
   const [type, setType] = useState<string>(defaultValue === 999 ? ScoringTypes.Unlimited : ScoringTypes.Limited)
   const [minutes, setMaxPoints] = useState<number>(defaultValue === 999 ? 60 : (defaultValue ?? 60))
   
   const summary = type === ScoringTypes.Limited ? ( minutes + ' ' + t(`course:minutes`) ) : t(`course:${type}`)
   
   return {
      
      timeLimitValues: {
         scoring_type: type,
         max_points: type === ScoringTypes.Unlimited ? 100 : minutes,
      },
      
      timeLimitFields: {
         
         isValid: () => {
            if (!!type && !!minutes) {
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
                     icon={RiTimerLine}
                     title={t('course:Time limit')}
                     summary={summary}
                     settingEdit={
                        <>
                           
                           <RadioGroup mt="4" size="lg" onChange={(v) => setType(v as ScoringType)} value={type}>
                              <Stack direction="row">
                                 <Radio value={ScoringTypes.Limited}>{t(`course:Limited`)}</Radio>
                                 <Radio value={ScoringTypes.Unlimited}>{t(`course:Unlimited`)}</Radio>
                              </Stack>
                           </RadioGroup>
                           
                           <Box mt="4" width="100%" display={type === ScoringTypes.Limited ? "block" : "none"}>
                              
                              <Text mb="2">{t('course:Time limit (minutes)')}</Text>
                              
                              <NumberInput
                                 onChange={(v) => setMaxPoints(Number(v))}
                                 value={String(minutes)}
                                 size="md"
                                 step={1}
                                 min={0}
                                 max={360}
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
      
      timeLimitHelpers: {},
      
   }
}
