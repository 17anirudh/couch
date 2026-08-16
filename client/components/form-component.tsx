"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm, Controller, type ControllerRenderProps, type ControllerFieldState, FieldValues, Path } from "react-hook-form";
import { GenericSchema, InferInput, ObjectSchema } from "valibot";
import { toast } from "./ui/toast";
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { Key } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type FieldDef<T extends FieldValues> = {
  name: Path<T>,
  render: 'text' | 'email' | 'checkbox' | 'select' | 'textarea' | 'password' | 'file' | 'number',
  values?: {
    value: string,
    label: string,
  }[],
  label?: string,
  description?: string,
  errorMsg?: string,
  placeholder?: string
}

type Props<T extends ObjectSchema<any, any>> = {
  identifier: string;
  field: ControllerRenderProps;
  fieldState: ControllerFieldState;
  item: FieldDef<InferInput<T>>;
}

type ParentProps<T extends ObjectSchema<any, any>> = {
  identifier: string;
  key?: Key;
  schema: T;
  fields: FieldDef<InferInput<T>>;
  submitFunc: () => Promise<void>;
  mutateKey: unknown[];
  successPath: AppRouterInstance
}

export default function<T extends ObjectSchema<any, any>>({ 
  key, schema, fields, identifier, submitFunc, mutateKey, successPath 
}: ParentProps<T>) {
    type FormType = InferInput<T>

    const form = useForm<FormType>({ resolver: valibotResolver(schema) })
    const router = useRouter()
    function onSubmit(data: FormType) {
      try {
        const {  } = useMutation({
          mutationKey: mutateKey, 
          mutationFn: submitFunc,
          onMutate: () => {
            toast.add({
              id: "submitting",
              title: "Submitting...",
              type: "warning",
            })
          },
          onSuccess: () => {
            toast.close("submitting")
            toast.add({
              id: "success",
              title: "Success registering user",
              type: "success",
            })
            successPath ?? form.reset()
          },
          onError: () => {
            toast.close("submitting")
            toast.add({
              id: "error",
              title: "Error registering user",
              type: "error",
            })
          }
        })
      }
      catch (err) {

      }
    }
  return (
    <form key={key ?? undefined} id={identifier} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {fields.map((item, _index) => (
          <Controller
            name={item.name}
            control={form.control}
            render={({ field, fieldState }) => (
              <RenderInput 
                identifier={identifier}
                item={item} 
                field={field} 
                fieldState={fieldState}   
              />
            )}
          />
        ))}
      </FieldGroup>
      <Field orientation="horizontal">
        <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
        <Button type="submit" form={identifier}>Submit</Button>
      </Field>
    </form>
  )
}

function RenderInput({ item, field, fieldState, identifier }: Props) {
  if (item.render === 'textarea') {
   return (
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={`${identifier}-${item.name}`}>{item.label ?? item.name}</FieldLabel>
        <Textarea
          {...field}
          id={`${identifier}-${item.name}`}
          aria-invalid={fieldState.invalid}
          placeholder={item.placeholder ?? undefined}
          className="min-h-[120px]"
        />
        {item.description && ( <FieldDescription>{item.description}</FieldDescription> )}
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    ) 
  }
  else if (item.render === 'checkbox') {
    return (
      <FieldSet>
        <FieldLegend variant="label">Tasks</FieldLegend>
        {item.description && ( <FieldDescription>{item.description}</FieldDescription> )}
        <FieldGroup data-slot="checkbox-group">
          {item.values!.map((value, index) => (
            <Field
              key={index}
              orientation="horizontal"
              data-invalid={fieldState.invalid}
            >
              <Checkbox
                id={`${identifier}-${value.value}`}
                name={field.name}
                aria-invalid={fieldState.invalid}
                checked={field.value.includes(value.value)}
                onCheckedChange={(checked) => {
                  const newValue = checked
                    ? [...field.value, value.value]
                    : field.value.filter((v: string) => v !== value.value)
                  field.onChange(newValue)
                }}
              />
              <FieldLabel
                htmlFor={`${identifier}-${value.value}`}
                className="font-normal"
              >
                {value.label}
              </FieldLabel>
            </Field>
          ))}
        </FieldGroup>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldSet>
    )
  }
  else if (item.render === 'select') {
    return (
      <Field orientation="responsive" data-invalid={fieldState.invalid}>
      <FieldContent>
        <FieldLabel htmlFor={`${identifier}-${item.name}`}>{item.label ?? item.name}</FieldLabel>
        {item.description && ( <FieldDescription>{item.description}</FieldDescription> )}
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldContent>
      <Select
        name={field.name}
        value={field.value}
        onValueChange={field.onChange}
      >
        <SelectTrigger
          id={`${identifier}-${item.name}`}
          aria-invalid={fieldState.invalid}
          className="min-w-[120px]"
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {item.values?.map((value, index) => (
            <SelectItem key={index} value={value.value}>
              {value.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
    )
  }
  else {
    return (
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={`${identifier}-${item.name}`}>{item.label ?? item.name}</FieldLabel>
        <Input
          {...field}
          id={`${identifier}-${item.name}`}
          aria-invalid={fieldState.invalid}
          placeholder={item.placeholder ?? undefined}
          type={item.render}
        />
        {item.description && ( <FieldDescription>{item.description}</FieldDescription> )}
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    )
  }
}