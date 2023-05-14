import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useNameFormatter } from '@slate/hooks/useNameFormatter'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { Avatar } from 'chalkui/dist/cjs/Components/Avatar/Avatar'
import { Button } from 'chalkui/dist/cjs/Components/Button/Button'
import {
   Dropdown, DropdownButton, DropdownDivider, DropdownItemOption, DropdownList, DropdownOptionGroup,
} from 'chalkui/dist/cjs/Components/Dropdown/Dropdown'
import { Box, Flex, Wrap, WrapItem } from 'chalkui/dist/cjs/Components/Layout'
import { BoxProps } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Spinner } from 'chalkui/dist/cjs/Components/Spinner/Spinner'
import { Tag, TagLabel } from 'chalkui/dist/cjs/Components/Tag/Tag'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'


import React, { useEffect, useState } from 'react'

type StudentPickerProps = {
   defaultValue?: number[],
   onSelected?: (value: number[]) => any
   onSelectedStudentNames?: (value: string) => any
   selected?: number[]
   isAssignTo?: boolean
} & BoxProps

export const StudentPicker = (props: StudentPickerProps) => {
   
   const { defaultValue = [], onSelected, onSelectedStudentNames, isAssignTo = false, ...rest } = props
   const { formatFullName } = useNameFormatter()
   const t = useTypeSafeTranslation()
   const course = useCurrentCourse()
   const cache = useStoreCache()
   const [selected, setSelected] = useState<number[]>(defaultValue)
   const [selectedStudentNames, setSelectedStudentNames] = useState<string | null>(null)
   const [studentIds, setStudentIds] = useState<number[]>([])
   const [option, setOption] = useState<"everyone" | "some">(selected.length === studentIds.length ? "everyone" : "some")
   
   const enrollments = course.enrollments
   
   useEffect(() => {
      console.log(enrollments)
      if(onSelectedStudentNames) {
         onSelectedStudentNames(option === 'everyone' ? t('Everyone') : selected.length > 0 ? selected?.map((id) => {
            try {
               const e = enrollments?.filter((e) => e.student?.id === id)
               return formatFullName(e[0]?.student)
            } catch (e) {
            
            }
         }).join(', ') : '')
      }
   }, [selected, option])
   
   useEffect(() => {
      if (enrollments) {
         const ids = enrollments?.map((e) => e.student?.id ?? 0)
         if(selected.length === 0 && isAssignTo) {
            setSelected(ids)
            onSelected && onSelected(ids)
         }
         setStudentIds(ids)
      }
   }, [])
   
   useEffect(() => {
      if (selected.length === studentIds.length) {
         setOption("everyone")
      } else {
         setOption("some")
      }
   }, [option, studentIds, selected])
   
   if (!enrollments) return (
      <Flex alignItems="center" gridGap=".5rem">
         <Spinner size="md" />
      </Flex>
   )
   
   // useEffect(() => {
   //    if (onSelected && !!selected) {
   //       onSelected(selected)
   //    }
   // }, [selected])
   
   function handleDeselect() {
      onSelected && onSelected([])
      setSelected([])
   }
   
   function handleSelectEveryone() {
      onSelected && onSelected(studentIds)
      setSelected(studentIds)
   }
   
   function handleToggleStudent(id: number | undefined) {
      if (id) {
         setSelected((selected: number[]) => {
            if (selected.includes(Number(id))) {
               onSelected && onSelected(selected.filter(e => e !== id))
               return selected.filter(e => e !== id)
            } else {
               onSelected && onSelected([...selected, id])
               return [...selected, id]
            }
         })
      }
   }
   
   return (
      <Box {...rest}>
         
         <Flex fontSize="lg" gridGap=".5rem" mb="2">
            
            <Text fontWeight="bold">{t('Assign to')}: </Text>
            
            <Dropdown closeOnSelect={false}>
               <DropdownButton as={Button} size="lg" variant="link" colorScheme="messenger.500">
                  <Text>{
                     option === 'everyone' ? t('Everyone') : (
                        <>
                           {selected.length > 0 && selected?.map((id) => {
                              const e = enrollments?.filter((e) => e.student?.id === id)
                              return e ? formatFullName(e[0].student) : 'N/A'
                           }).join(', ')}
                           {selected.length === 0 && t('Select')}
                        </>
                     )
                  }</Text>
               </DropdownButton>
               <DropdownList minWidth="240px">
                  <DropdownOptionGroup value={option} title={t("To")} type="radio">
                     <DropdownItemOption value="everyone" onClick={handleSelectEveryone}>{t('Everyone')}</DropdownItemOption>
                     <DropdownItemOption value="some" onClick={handleDeselect}>{t('course:Specific students')}</DropdownItemOption>
                  </DropdownOptionGroup>
                  <DropdownDivider />
                  
                  
                  <Box
                     maxHeight="120px"
                     overflowY="scroll"
                  >
                     <DropdownOptionGroup
                        value={String(selected)}
                        title={t("Students")}
                        type="checkbox"
                     >
                        {enrollments?.map((enrollment) => {
                           return (
                              <DropdownItemOption
                                 key={enrollment?.id}
                                 value={enrollment?.student?.id.toString()}
                                 onClick={() => handleToggleStudent(enrollment?.student?.id)}
                              >
                                 <AlignedFlex>
                                    <Avatar size="xs" src={enrollment?.student?.image as string} />
                                    <Text>{formatFullName(enrollment?.student)}</Text>
                                 </AlignedFlex>
                              </DropdownItemOption>
                           )
                        })}
                     </DropdownOptionGroup>
                  </Box>
               
               </DropdownList>
            </Dropdown>
         
         </Flex>
         
         <Box>
            {
               option === 'some' && (
                  <Wrap mb="2" gridGap=".5rem">
                     {selected?.map((id) => {
                        const e = enrollments.filter((e) => e.student?.id === id)
                        return <WrapItem key={e[0].id}>
                           <Tag display="flex" size='lg' colorScheme='gray.500' borderRadius='full'>
                              <Avatar
                                 src={e[0]?.student?.image as string}
                                 size='xs'
                                 ml={-1}
                                 mr={2}
                              />
                              <TagLabel>{formatFullName(e[0].student)}</TagLabel>
                           </Tag>
                        </WrapItem>
                        
                     })}
                  </Wrap>
               )
            }
         </Box>
      
      </Box>
   )
   
}

export default StudentPicker
