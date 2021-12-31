import { useCurrentAssignment } from '@slate/hooks/useCurrentAssignment'
import { useCurrentUnit } from '@slate/hooks/useCurrentUnit'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { CacheActions, CacheSelectors } from '@slate/store/slices/cacheSlice'
import { CourseActions } from '@slate/store/slices/courseSlice'
import { UnitActions } from '@slate/store/slices/unitSlice'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/**
 * Manage cache behavior
 */
export const useStoreCacheConfig = () => {
   const dispatch = useDispatch()
   const router = useRouter()
   const { course_id, unit_id, assignment_id } = router.query
   const cachedCourseId = useSelector(CacheSelectors.readCourseId)
   const cache = useStoreCache()
   const unit = useCurrentUnit()
   const assignment = useCurrentAssignment()
   
   /**
    * This behavior happens when course changes
    */
   useEffect(() => {
      dispatch(CacheActions.writeCourseId(course_id ? course_id as string : null))
      /**
       * Empty the cache when we switch courses
       */
      if (!!course_id && cachedCourseId !== course_id) {
         dispatch(CacheActions.empty())
      }
      /**
       * Empty course course cache if there's no course_id
       */
      if(!course_id) {
         dispatch(CourseActions.empty())
      }
   }, [course_id, cachedCourseId])
   
   /**
    * This behavior happens when unit changes
    */
   useEffect(() => {
      if(!unit_id || unit_id !== unit?.id) {
         dispatch(CacheActions.writeModules(null))
         dispatch(UnitActions.setOpenedFolder(null))
      }
   }, [unit_id, unit])
   
   /**
    * This behavior happens when assignment changes
    */
   useEffect(() => {
      if(!assignment_id || assignment_id !== assignment?.id) {
         dispatch(CacheActions.writeAssignment(null))
      }
   }, [assignment_id, assignment])
}
