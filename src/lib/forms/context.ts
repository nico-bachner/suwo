import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

import { Email } from './components/email'
import { Password } from './components/password'
import { SubmitButton } from './components/submit_button'

export const { fieldContext, formContext, useFormContext, useFieldContext } =
  createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    Email,
    Password,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})
