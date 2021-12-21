import { BiDuplicate } from '@react-icons/all-files/bi/BiDuplicate'
import { SettingSection } from '@slate/components/UI/Course/SettingSection'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { FormLabel } from 'chalkui/dist/cjs/Components/FormControl/FormLabel'
import { Box, Stack } from 'chalkui/dist/cjs/Components/Layout'
import {
   NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
} from 'chalkui/dist/cjs/Components/NumberInput/NumberInput'
import { Radio } from 'chalkui/dist/cjs/Components/Radio/Radio'
import { RadioGroup } from 'chalkui/dist/cjs/Components/Radio/RadioGroup'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React, { useState } from 'react'

enum AttemptsGrading {
   Last = 'last',
   Highest = 'highest',
}

/*
 * Fields: attempts
 */
export const useAttemptSetting = (defaultValue?: { attemptsAllowed: number, attemptsGrading: string }) => {
   
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   
   
   const [error, setError] = useState<boolean>(false)
   const [isUnlimited, setIsUnliminited] = useState<boolean>(defaultValue?.attemptsAllowed === 999)
   const [attempts, setAttempts] = useState<number>(defaultValue?.attemptsAllowed ?? 1)
   const [attemptsGrading, setAttemptsGrading] = useState<string>(defaultValue?.attemptsGrading ?? 'last')
   
   const summary = (!isUnlimited ? attempts + ' ' + t(`course:attempts`) : t('course:Unlimited attempts')) + ' | ' + t(`course:${attemptsGrading} attempt`)
   
   return {
      
      attemptValues: {
         attempts_allowed: isUnlimited ? 999 : attempts,
         attempts_grading: attemptsGrading
      },
      
      attemptFields: {
         
         isValid: () => {
            if (!!attempts) {
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
                     icon={BiDuplicate}
                     title={t('Attempts')}
                     summary={summary}
                     settingEdit={
                        <>
                           
                           <RadioGroup
                              mt="4"
                              size="lg"
                              onChange={(v) => setIsUnliminited(v === 'unlimited')}
                              value={isUnlimited ? 'unlimited' : 'limited'}
                           >
                              <Stack direction="row">
                                 <Radio value="limited">{t(`Limited`)}</Radio>
                                 <Radio value="unlimited">{t(`Unlimited`)}</Radio>
                              </Stack>
                           </RadioGroup>
                           
                           <Box mt="4" width="100%" display={!isUnlimited ? "block" : "none"}>
                              
                              <FormLabel mb="2">{t('course:Choose the number of attempts allowed')}</FormLabel>
                              
                              <NumberInput
                                 onChange={(v) => setAttempts(Number(v))}
                                 value={String(attempts)}
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
                           
                           <Box mt="4">
   
                              <FormLabel mb="2">{t('course:Which attempt should be graded')}</FormLabel>
   
   
                              <RadioGroup
                                 size="lg"
                                 onChange={setAttemptsGrading}
                                 value={attemptsGrading}
                              >
                                 <Stack direction="row">
                                    <Radio value="last">{t(`course:Last attempt`)}</Radio>
                                    <Radio value="highest">{t(`course:Highest score`)}</Radio>
                                 </Stack>
                              </RadioGroup>
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
      
      attemptHelpers: {},
      
   }
}
