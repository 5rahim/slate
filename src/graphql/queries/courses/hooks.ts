import { useMutation } from '@apollo/client'
import { useMutationHookCreator, useQueryHookCreator } from '../../utils'
import { GET_COURSE_BY_ID, GET_COURSE_ENROLLMENTS_QUERY, GET_OWN_COURSES_QUERY } from './queries'
import { SlateCourse } from 'slate/graphql/types/Course'
import { UPDATE_COURSE_BANNER_COLOR } from 'slate/graphql/queries/courses/mutations'

export const useMutateCourseBannerColor = () => {
   
   return useMutationHookCreator(UPDATE_COURSE_BANNER_COLOR, {
      refetchQueries: [
         { query: GET_COURSE_BY_ID }, // DocumentNode object parsed with gql
         'GetCourseById', // Query name
      ],
   })
   
   // return useMutation(UPDATE_COURSE_BANNER_COLOR, {
   //    refetchQueries: [
   //       { query: GET_COURSE_BY_ID }, // DocumentNode object parsed with gql
   //       'GetCourseById' // Query name
   //    ],
   // })
   
}

export const getCourseById = (id: string) => {
   
   return useQueryHookCreator<SlateCourse>('courses', GET_COURSE_BY_ID, "object", { variables: { id }, nextFetchPolicy: 'cache-and-network' })
   
}

export const getStudentEnrollments = () => {
   
   return useQueryHookCreator<any>("course_enrollment", GET_COURSE_ENROLLMENTS_QUERY, "array", { fetchPolicy: "no-cache" })
   
}


export const getOwnCourses = () => {
   
   return useQueryHookCreator<SlateCourse[]>("courses", GET_OWN_COURSES_QUERY, "array", { fetchPolicy: "no-cache" })
   
}
