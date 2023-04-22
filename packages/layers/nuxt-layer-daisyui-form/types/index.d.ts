export type LazyRule = boolean | 'ondemand';


export type RuleCb = (val: string, testPattern?: TestPattern) => boolean | string | Promise<boolean | string> | string

export interface UseValidateProps {
    modelValue?: any,
    disabled?: boolean
    error?: boolean,
    errorMessage?: String,
    noErrorIcon?: Boolean,
    rules?: Array<RuleCb>,
    reactiveRules?: Boolean,
    lazyRules?: LazyRule
}

export interface UseValidate {

    isDirtyModel: Ref<boolean | null>
    hasRules: ComputedRef<boolean>
    hasError: ComputedRef<boolean>
    errorMessage: ComputedRef<string | boolean | null>
    formIsDisabled: Ref<boolean>
    innerLoading: Ref<boolean>
    focused: Ref<boolean>

    handleFormDisableState: (disabled: boolean) => void
    validate: (val?: any) => boolean | Promise<boolean>
    resetValidation: () => void
}
