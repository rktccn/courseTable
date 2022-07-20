import { InjectionKey, Ref } from 'vue'

export interface Option {
    value: string | number
    label: string
}

export type pushOption = (option: Option) => void

export const curValueKey: InjectionKey<Ref<string | number>> = Symbol('')
export const pushOptionKey: InjectionKey<pushOption> = Symbol('')
export const setCurrentKey: InjectionKey<(value: string | number) => void> =
    Symbol('')
