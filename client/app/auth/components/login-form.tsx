"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type LoginType, loginSchema } from "@/types/auth";
import { login as LoginFn } from "@api/auth";
import { keyRef } from "@/lib/query";
import { routeRef } from "@/lib/routes";

const identifier: string = "form-login" as const

export default function() {
    const form = useForm<LoginType>({ resolver: valibotResolver(loginSchema) })
    const router = useRouter()
    const { mutate, isPending, error } = useMutation({
      mutationKey: keyRef.register,
      mutationFn: LoginFn,
      onMutate: () => { toast.loading("Submitting...") },
      onSuccess: () => {
        toast.dismiss()
        toast.success("Success registering user")
        router.replace(routeRef.dashboard, { transitionTypes: ['slide-up'] })
      },
      onError: () => {
        toast.dismiss()
        toast.error("Error registering user")
      }
    })
    function onSubmit(data: LoginType) {
      mutate(data)
    }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-4">
      <FieldGroup>
        <Controller
          name="combined"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${identifier}-username`}>Enter Username</FieldLabel>
              <Input
                {...field}
                id={`${identifier}-username`}
                aria-invalid={fieldState.invalid}
                placeholder="example"
                className="max-w-lg"
                type="text"
              />
              <FieldDescription>Enter username you want to use</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${identifier}-password`}>Enter password</FieldLabel>
              <Input
                {...field}
                id={`${identifier}-password`}
                aria-invalid={fieldState.invalid}
                type="password"
                className="max-w-lg"
              />
              <FieldDescription>Enter a strong password</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Field orientation="horizontal">
        <Button type="button" variant="outline" onClick={() => form.reset()} disabled={isPending}>Reset</Button>
        <Button type="submit" form={identifier} disabled={isPending}>Submit</Button>
      </Field>
      {process.env.NODE_ENV === 'development' && (
        <pre>{JSON.stringify(error, null, 2)}</pre>
      )}
    </form>
    
  )
}