import { ZodError } from 'zod'

export type ActionState<T> = {
  [P in keyof T]:
    | {
        success: true
        data: T[P]
        error?: never
      }
    | {
        success: false
        error: ZodError
        data?: never
      }
}

export type Action<T> = (
  previousState: ActionState<T>,
  formData: FormData,
) => Promise<ActionState<T>>
