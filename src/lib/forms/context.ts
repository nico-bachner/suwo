import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

import { PasswordInput } from '@/design_system/password_input'
import { SubmitButton } from '@/design_system/submit_button'

export const { fieldContext, formContext, useFormContext, useFieldContext } =
  createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    PasswordInput,
  },
  formComponents: {
    SubmitButton,
  },
})
