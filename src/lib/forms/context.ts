import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

import { Email } from './components/email'
import { Password } from './components/password'
import { SubmitButton } from './components/submit_button'
import { Text } from './components/text'

export const { fieldContext, formContext, useFormContext, useFieldContext } =
  createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    Email,
    Password,
    Text,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})
