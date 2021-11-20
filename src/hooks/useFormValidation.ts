import { zodResolver } from '@hookform/resolvers/zod'
import { z as zod, ZodSchema } from 'zod'

export type UseFormValidationSchema = (({ z, errorMessage }: { z: typeof zod, errorMessage: string }) => ZodSchema<any>) | undefined

/**
 * Returns form validation schema resolver
 * @param {UseFormValidationSchema} schema
 * @returns {{formValidationSchema: (<TFieldValues extends FieldValues, TContext>(values: UnpackNestedValue<TFieldValues>, context: (TContext |
 *    undefined), options: ResolverOptions<TFieldValues>) => Promise<ResolverResult<TFieldValues>>) | undefined}}
 */
export const useFormValidation = (schema: UseFormValidationSchema) => {
   
   return {
      schemaResolver: schema ? zodResolver(schema({ z: zod, errorMessage: 'Invalid field' })) : undefined
   }
   
}
