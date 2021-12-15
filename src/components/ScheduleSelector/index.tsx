import { TimePicker } from '@slate/components/TimePicker'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { Checkbox } from 'chalkui/dist/cjs/Components/Checkbox'
import { Box, HStack, Wrap, WrapItem } from 'chalkui/dist/cjs/Components/Layout'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'


interface Schedule {
   [day: string]: { from: number, to: number } | null
}

interface ScheduleSelectorProps {
   defaultSchedule?: Schedule
}

export function ScheduleSelector(props: ScheduleSelectorProps) {
   
   const {
      defaultSchedule = {
         monday: { from: 100, to: 250 },
         tuesday: null,
         wednesday: null,
         thursday: null,
         friday: null,
         saturday: null,
         sunday: null,
      },
   } = props
   
   /**
    * Populate default chosen days
    */
   let defaultChosenDays: string[] = []
   // for (const day in defaultSchedule) {
   //    if (!!defaultSchedule[day]) {
   //       defaultChosenDays.push(day)
   //    }
   // }
   
   const cmf = useCMF()
   const { t } = useTranslation(['common'], { useSuspense: false })
   const [chosenDays, setChosenDays] = useState<string[]>(defaultChosenDays)
   
   const [schedule, setSchedule] = useState<Schedule>(defaultSchedule)
   
   useEffect(() => {
      for (const day in schedule) {
         if (!chosenDays.includes(day)) {
            const newSchedule = schedule
            newSchedule[day] = null
            setSchedule(newSchedule)
         } else if (chosenDays.includes(day) && schedule[day] === null) {
            const newSchedule = schedule
            newSchedule[day] = { from: 0, to: 0 }
            setSchedule(newSchedule)
         }
      }
   }, [chosenDays])
   
   useEffect(() => {
      console.log(schedule)
   }, [schedule])
   
   function dayIsSelected(schedule: Schedule, day: string) {
      return schedule[day] !== null
   }
   
   function getDefaultTime(day: string): any {
      if (defaultChosenDays?.includes(day)) {
         return defaultSchedule[day] ?? 0
      } else {
         return 0
      }
   }
   
   return (
      <Box>
         
         <Wrap
            border="1px solid"
            borderColor={cmf('gray.200', 'gray.700')}
            borderRadius="md"
            p={[0, 0, 3]}
            justifyContent="center"
            spacing={5}
            direction="row"
            fontSize="lg"
            mb="4"
         >
            <WrapItem>
               <DayCheckbox
                  defaultSchedule={defaultSchedule}
                  day="monday"
                  setChosenDays={setChosenDays}
                  chosenDays={chosenDays}
               />
            </WrapItem>
            <WrapItem>
               <DayCheckbox
                  defaultSchedule={defaultSchedule}
                  day="tuesday"
                  setChosenDays={setChosenDays}
                  chosenDays={chosenDays}
               />
            </WrapItem>
            <WrapItem>
               <DayCheckbox
                  defaultSchedule={defaultSchedule}
                  day="wednesday"
                  setChosenDays={setChosenDays}
                  chosenDays={chosenDays}
               />
            </WrapItem>
            <WrapItem>
               <DayCheckbox
                  defaultSchedule={defaultSchedule}
                  day="thursday"
                  setChosenDays={setChosenDays}
                  chosenDays={chosenDays}
               />
            </WrapItem>
            <WrapItem>
               <DayCheckbox
                  defaultSchedule={defaultSchedule}
                  day="friday"
                  setChosenDays={setChosenDays}
                  chosenDays={chosenDays}
               />
            </WrapItem>
            <WrapItem>
               <DayCheckbox
                  defaultSchedule={defaultSchedule}
                  day="saturday"
                  setChosenDays={setChosenDays}
                  chosenDays={chosenDays}
               />
            </WrapItem>
            <WrapItem>
               <DayCheckbox
                  defaultSchedule={defaultSchedule}
                  day="sunday"
                  setChosenDays={setChosenDays}
                  chosenDays={chosenDays}
               />
            </WrapItem>
         </Wrap>
         
         {chosenDays.map((day) => {
            
            return (
               <Box key={day} mb="4">
                  <Text fontSize="xl" mb="3">{t(`date.${day.charAt(0).toUpperCase() + day.slice(1)}`)}</Text>
                  <HStack justifyContent="center">
                     <Text>From:</Text>
                     <TimePicker defaultTime={getDefaultTime(day).from} />
                     
                     <Text>To:</Text>
                     <TimePicker defaultTime={getDefaultTime(day).to} />
                  </HStack>
               </Box>
            )
            
         })}
      </Box>
   )
   
}


function DayCheckbox(props: { day: string, defaultSchedule: Schedule, setChosenDays: any, chosenDays: string[] }) {
   const { t } = useTranslation(['common'], { useSuspense: false })
   const { day, setChosenDays, chosenDays, defaultSchedule } = props
   return (
      <Checkbox
         size="lg"
         defaultChecked={!!defaultSchedule[day]}
         onChange={(e) =>
            e.target.checked ? setChosenDays([...chosenDays, day]) : setChosenDays(chosenDays.filter((d) => d !== day))}
      >
         {t(`date.${day.charAt(0).toUpperCase() + day.slice(1)}`)}
      </Checkbox>
   )
}
