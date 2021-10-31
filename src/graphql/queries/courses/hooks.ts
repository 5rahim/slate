import { QueryResult, useQuery } from '@apollo/client'
import { legacyHandleQueryError, legacyQueryReturn, useQueryHookCreator } from '../../utils'
import { GET_COURSE_BY_ID, GET_COURSE_ENROLLMENTS_QUERY, GET_OWN_COURSES_QUERY } from './queries'
import { SlateCourse } from 'slate/graphql/types/Course'


export const getCourseById = (id: string) => {
   
   return useQueryHookCreator<SlateCourse>('courses', GET_COURSE_BY_ID, "object", { variables: { id }, fetchPolicy: 'no-cache' })
   
}

export const getStudentEnrollments = () => {
   
   return useQueryHookCreator<any>("course_enrollment", GET_COURSE_ENROLLMENTS_QUERY, "array", { fetchPolicy: "no-cache" })
   
}


export const getOwnCourses = () => {
   
   return useQueryHookCreator<SlateCourse[]>("courses", GET_OWN_COURSES_QUERY, "array", { fetchPolicy: "no-cache" })
   
}
