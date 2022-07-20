<template>
    <div
        class="h-7 w-52 px-2 flex items-center outline outline-2 outline-amber-300 rounded-md relative select-none"
    >
        <header class="cursor-pointer flex justify-between items-center w-full">
            <span
                v-if="curLabel === ''"
                class="placeholder text-sm opacity-60 grow overflow-hidden truncate"
                >{{ placeholder }}</span
            >
            <span v-else class="grow overflow-hidden truncate">{{
                curLabel
            }}</span>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 shrink-0 stroke-amber-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </header>
        <div class="option-list absolute top-full left-0 w-full pt-1 px-1">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, ref, toRefs } from 'vue'
import {
    Option,
    pushOption,
    pushOptionKey,
    setCurrentKey,
    curValueKey
} from './types'

export default defineComponent({
    name: 'RoSelect',
    props: {
        placeholder: {
            type: String,
            default: '请选择'
        },
        value: {
            type: String,
            required: false
        }
    },
    setup(props) {
        const options = ref<Option[]>([])
        const curValue = ref<String | number>('')
        const curLabel = ref<string>('')

        const pushOption: pushOption = ({ label, value }) => {
            options.value.push({ label, value })
        }

        const setCurrent = (value: string | number) => {
            curValue.value = value
            curLabel.value =
                options.value.find(item => item.value === value)?.label ?? ''
        }

        provide(pushOptionKey, pushOption)
        provide(setCurrentKey, setCurrent)
        provide(curValueKey, curValue)

        return { curValue, curLabel }
    }
})
</script>

<style lang="scss" scoped>
.option-list {
    // transform: translateY(5px);
}
</style>
