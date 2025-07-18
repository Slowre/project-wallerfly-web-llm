import SubmitButton from "@/components/form/button"
import Input from "@/components/form/input"
import Select from "@/components/form/Select"
import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
export const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts()

export const { useAppForm } = createFormHook({

    fieldComponents: { Input, Select }, formComponents: { SubmitButton }, fieldContext, formContext
})