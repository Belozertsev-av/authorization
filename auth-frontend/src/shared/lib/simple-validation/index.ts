import { Ref, ref, toRef, watch } from "vue"
import { getFromStringUnderObject, hasProperties } from "/~/shared/utils"

export type ValidationRule<T> = {
  validator: (value: T) => boolean | Promise<boolean>
  message: (value: T) => string
}

export type ValidationRules<T extends object> = {
  [K in keyof T]?: T[K] extends object
    ? ValidationRules<T[K]> | ValidationRule<T[K]>[]
    : ValidationRule<T[K]>[]
}

export type ValidatorErrors<T extends object> = {
  [K in keyof T]?: T[K] extends object ? ValidatorErrors<T[K]> : string[]
}

export type UseFormValidation<T extends object> = {
  formValues: Ref<T>
  formErrors: Ref<ValidatorErrors<T>>
  hasErrors: Ref<boolean>
  cleanError: (key: keyof ValidatorErrors<T>) => void
  cleanErrors: () => void
  addWatcherToValidators: <V extends object>(
    values: V,
    validations: ValidationRules<V>,
    errors: ValidatorErrors<V>,
    prefix?: string,
  ) => void
}

const instanceOfValidationRule = <T>(object: any): object is ValidationRule<T>[] =>
  Array.isArray(object)

export const useFormValidation = <T extends object>(
  initialValues: T,
  validationRules: ValidationRules<T>,
): UseFormValidation<T> => {
  const formValues = toRef<T>(initialValues) as Ref<T>
  const formErrors = ref({}) as Ref<ValidatorErrors<T>>
  const hasErrors = ref(false)

  const validateField = async <V>(value: V, rules: ValidationRule<V>[], errors: string[]) => {
    const validationPromises = rules.map(async (rule) => {
      const isValid = await rule.validator(value)
      if (!isValid) {
        if (!errors.includes(rule.message(value))) {
          errors.push(rule.message(value))
        }
      } else {
        const index = errors.indexOf(rule.message(value))
        if (index !== -1) {
          errors.splice(index, 1)
        }
      }
    })

    await Promise.all(validationPromises)
  }

  const addWatcherToValidators = <V extends object>(
    values: V,
    validations: ValidationRules<V>,
    errors: ValidatorErrors<V>,
    prefix: string = "",
  ) => {
    for (const key in validations) {
      if (Object.hasOwn(validations, key)) {
        const rules = validations[key]
        const value = values[key]

        if (instanceOfValidationRule(rules)) {
          const path = prefix !== "" ? `${prefix}.${key}` : key
          watch(
            () => getFromStringUnderObject(path, formValues.value),
            async (val) => {
              if (!Array.isArray(errors[key])) {
                errors[key] = [] as V[Extract<keyof V, string>] extends object
                  ? ValidatorErrors<V[Extract<keyof V, string>]>
                  : string[]
              }

              await validateField(val, rules, errors[key] as string[])
            },
            { immediate: true, deep: true },
          )
        } else if (typeof rules === "object") {
          if (typeof value === "object" && value !== null) {
            errors[key] = {} as V[Extract<keyof V, string>] extends object
              ? ValidatorErrors<V[Extract<keyof V, string>]>
              : string[]

            if (prefix === "") {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              addWatcherToValidators(value, rules, errors[key]!, `${key}`)
            } else {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              addWatcherToValidators(value, rules, errors[key]!, `${prefix}.${key}`)
            }
          } else {
            console.warn(
              `Validation rule for property '${key}' is defined as an object, but the corresponding form value is not an object.`,
            )
          }
        } else {
          console.warn(`Validation rule for property '${key}' is defined as an object and array.`)
        }
      }
    }
  }

  const cleanError = (key: keyof ValidatorErrors<T>) => {
    if (key in formErrors.value) {
      formErrors.value[key] = [] as unknown as any
    }
  }

  const cleanErrors = () => {
    for (const key in formErrors.value) {
      formErrors.value[key as keyof ValidatorErrors<T>] = [] as unknown as any
    }
  }

  watch(
    formErrors,
    (value) => {
      formErrors.value = value
      hasErrors.value = hasProperties(formErrors.value)
    },
    { deep: true },
  )

  addWatcherToValidators(formValues.value, validationRules, formErrors.value)

  return {
    formValues,
    formErrors,
    hasErrors,
    cleanError,
    cleanErrors,
    addWatcherToValidators,
  }
}

export const Required = {
  validator: (value: unknown) => {
    if (typeof value === "string") {
      return value.trim() !== "" && value.trim() !== null
    } else {
      return Boolean(value)
    }
  },
  message: () => "warnings.required",
}

export const MaxSymbols100 = {
  validator: (value: string) => value.length <= 100,
  message: () => "warnings.maxSymbols100",
}
