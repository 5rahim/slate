import { useTestCreatorQuestion } from '@slate/components/TestCreator/Provider'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { TestEditorSelectors } from '@slate/store/slices/testEditorSlice'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import {
   NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
} from 'chalkui/dist/cjs/Components/NumberInput/NumberInput'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface QuestionPointsProps {
   isEditing: boolean
}

const QuestionPoints: React.FC<QuestionPointsProps> = (props) => {
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const { children, isEditing, ...rest } = props
   const { testQuestion, updatePoints } = useTestCreatorQuestion()
   const maxPoints = useSelector(TestEditorSelectors.getGradebookItem)?.max_points ?? 0
   const currentPointTotal = useSelector(TestEditorSelectors.getTestQuestionTotalPoints)
   const [points, setPoints] = useState(testQuestion?.question?.content?.points ?? 0)
   const [localMax, setLocalMax] = useState<number>(testQuestion?.question?.content?.points + ( maxPoints - currentPointTotal ))
   const field: any = React.useRef()

   useEffect(() => {
       setLocalMax(testQuestion?.question?.content?.points + ( maxPoints - currentPointTotal ))
   }, [testQuestion, maxPoints,currentPointTotal, points])
   
   useEffect(() => {
      setPoints(testQuestion?.question?.content?.points ?? 0)
   }, [testQuestion])
   
   function getWidth(points: number) {
      if (points > 9 && points <= 99) {
         return "20px"
      } else if (points > 99) {
         return "30px"
      } else {
         return "10px"
      }
   }
   
   function handleChangePoints(points: number) {
      setPoints(points)
   }
   
   useEffect(() => {
      
      updatePoints(points)
      
   }, [points])
   
   return (
      <AlignedFlex
         gridGap=".2rem"
         px="2"
         py="0"
         bgColor="#fff"
         cursor="pointer"
         border="1px solid"
         borderRadius="md"
         borderBottomColor={cmf('#d3d3d3', 'gray.500')}
         borderColor={cmf('#d3d3d3', 'gray.500')}
         sx={!isEditing ? {
            pointerEvents: 'none',
         } : {}}
         fontSize="lg"
         onClick={() => field.current?.focus()}
         position="relative"
      >
         <NumberInput
            onChange={(v) => handleChangePoints(Number(v))}
            value={String(points)}
            size="sm"
            step={1}
            min={0}
            keepWithinRange={true}
            max={localMax}
            allowMouseWheel
         >
            <NumberInputField
               ref={field}
               _focus={{ border: 'none' }}
               border="none"
               fontWeight="700"
               textAlign="right"
               p="0"
               width={getWidth(points)}
               fontSize="xl"
            />
            {
               isEditing && (
                  <Box position="absolute" left="-.5rem" top=".2rem">
                     <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                     </NumberInputStepper>
                  </Box>
               )
            }
         </NumberInput>
         {t('course:points')}
      </AlignedFlex>
   )
   
}

export default QuestionPoints
