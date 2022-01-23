import { RiDashboardLine } from '@react-icons/all-files/ri/RiDashboardLine'
import { SettingSection } from '@slate/components/UI/Course/SettingSection'
import { useFormSwitch } from '@slate/hooks/settings/useFormSwitch'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormErrors } from '@slate/types/FormErrors'
import { Divider } from 'chalkui/dist/cjs/Components/Layout'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React, { useRef, useState } from 'react'


/**
 * Fields:
 */
export const useQuestionSetting = (defaultValue?: {
   automaticGrading: boolean,
   shuffleQuestions: boolean,
   shuffleAnswers: boolean,
   showIncorrectAnswers: boolean,
   showCorrectAnswers: boolean,
   showAnswerScores: boolean,
   standaloneTestPage: boolean,
   showProgressBar: boolean,
   disableTabSwitching: boolean,
   oneQuestionAtATime: boolean
}) => {
   
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   
   const gradingType: any = useRef()
   
   const [error, setError] = useState<boolean>(false)
   
   const [automaticGrading] = useFormSwitch('Automatic grading', defaultValue?.automaticGrading ?? true)
   const [shuffleQuestions] = useFormSwitch('Shuffle questions', defaultValue?.shuffleQuestions ?? false)
   const [shuffleAnswers] = useFormSwitch('Shuffle answers', defaultValue?.shuffleAnswers ?? true)
   const [showIncorrectAnswers] = useFormSwitch('Show incorrect answers', defaultValue?.showIncorrectAnswers ?? true)
   const [showCorrectAnswers] = useFormSwitch('Show correct answers', defaultValue?.showCorrectAnswers ?? true)
   const [showAnswerScores] = useFormSwitch('Show answer scores', defaultValue?.showAnswerScores ?? true)
   const [oneQuestionAtATime] = useFormSwitch('One question at a time', defaultValue?.oneQuestionAtATime ?? false)
   const [standaloneTestPage] = useFormSwitch('Standalone test page', defaultValue?.standaloneTestPage ?? true)
   const [showProgressBar] = useFormSwitch('Show progress bar', defaultValue?.showProgressBar ?? true)
   const [disableTabSwitching] = useFormSwitch('Disable tab switching', defaultValue?.disableTabSwitching ?? true)
   
   const { onFormSubmit, fields, formState } = useFormCreator({
      defaultValues: {
         automatic_grading: true,
      },
      schema: ({ z }) => z.object({
         automatic_grading: z.boolean(),
      }),
      onSubmit: data => {
      
      
      },
   })
   
   // const summary = 'Shuffle questions | One question at a time | Show correct answers after submissions | Allow backtracking'
   
   const summary =
      [automaticGrading.getSummary(`Manual grading`)
         , shuffleQuestions.getSummary(``)
         , shuffleAnswers.getSummary(``)
         , showIncorrectAnswers.getSummary(``)
         , showCorrectAnswers.getSummary(``)
         , standaloneTestPage.getSummary(``)
         , showProgressBar.getSummary(``)
         , disableTabSwitching.getSummary(``)
         , oneQuestionAtATime.getSummary(``)].join(``).slice(0, -2)
   
   return {
      
      questionSettingValues: {
         settings: {
            automaticGrading: automaticGrading.isChecked(),
            shuffleQuestions: shuffleQuestions.isChecked(),
            shuffleAnswers: shuffleAnswers.isChecked(),
            showIncorrectAnswers: showIncorrectAnswers.isChecked(),
            showCorrectAnswers: showCorrectAnswers.isChecked(),
            standaloneTestPage: standaloneTestPage.isChecked(),
            showProgressBar: showProgressBar.isChecked(),
            disableTabSwitching: disableTabSwitching.isChecked(),
            oneQuestionAtATime: oneQuestionAtATime.isChecked(),
         },
      },
      
      questionSettingFields: {
         
         isValid: () => {
            if (true) {
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
                     icon={RiDashboardLine}
                     title={t('Options')}
                     summary={summary}
                     settingEdit={
                        <>
                           
                           {automaticGrading.getSwitch()}
                           
                           <Text opacity=".6" fontStyle="italic">
                              Publish the grade after a submission only when all the questions can be automatically
                              graded
                           </Text>
                           
                           <Divider my="4" />
                           
                           <Text textTransform="uppercase" mb="2">{t('Questions')}</Text>
                           
                           {shuffleQuestions.getSwitch()}
                           
                           {shuffleAnswers.getSwitch()}
                           
                           <Divider my="4" />
                           
                           <Text textTransform="uppercase" mb="2">{t('Responses')}</Text>
                           
                           {showIncorrectAnswers.getSwitch()}
                           
                           {showCorrectAnswers.getSwitch()}
                           
                           {showAnswerScores.getSwitch()}
                           
                           <Divider my="4" />
                           
                           <Text textTransform="uppercase" mb="2">{t('Options')}</Text>
                           
                           {oneQuestionAtATime.getSwitch()}
                           
                           {standaloneTestPage.getSwitch()}
                           
                           {showProgressBar.getSwitch()}
                           
                           {disableTabSwitching.getSwitch()}
                        
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
      
      questionSettingHelpers: {}
      ,
      
   }
}
