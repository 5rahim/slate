export function isEmpty(obj: any) {
   if (!obj)
      return true
   if (typeof obj === 'object') {
      return !obj ? true : Object.keys(obj).length === 0
   } else if (Array.isArray(obj)) {
      return !!obj ? obj.length > 0 : true
   } else {
      return true
   }
}

export function hasObject(cachedObject: any, fetchedObject: any) {
   return !isEmpty(isEmpty(cachedObject) ? fetchedObject : cachedObject)
}

export function isDataEmpty(empty: boolean, loading: boolean) {
   if (!loading) {
      return empty
   }
   return false
}
