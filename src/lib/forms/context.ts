import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

import { SubmitButton } from '@/design_system/submit_button'

export const { fieldContext, formContext, useFormContext, useFieldContext } =
  createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {},
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})
