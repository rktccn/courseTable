<template>
    <div class="relative select-none" ref="roSelect">
        <header
            class="cursor-pointer flex justify-between items-center h-7 w-52 px-2 outline outline-2 rounded-md bg-base duration-150 ease-in-out"
            :class="isListShow ? 'text-muted-hover' : 'text-primary'"
            @click="isListShow = !isListShow"
        >
            <span
                v-if="curLabel === ''"
                class="placeholder text-sm opacity-60 grow overflow-hidden truncate"
                >{{ placeholder }}</span
            >
            <span v-else class="grow font-semibold overflow-hidden truncate">{{
                curLabel
            }}</span>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 shrink-0 text-muted-hover duration-150 ease-in-out"
                :class="{ 'rotate-180': isListShow }"
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

        <transition name="drop-b">
            <div
                v-if="isListShow"
                class="option-list z-10 absolute top-full left-0 w-full mt-1 py-1 bg-off-base shadow-md rounded-md overflow-hidden"
            >
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

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
        const isListShow = ref<boolean>(false)

        const pushOption: pushOption = ({ label, value }) => {
            options.value.push({ label, value })
        }

        const setCurrent = (value: string | number) => {
            curValue.value = value
            curLabel.value =
                options.value.find(item => item.value === value)?.label ?? ''
            isListShow.value = false
        }

        provide(pushOptionKey, pushOption)
        provide(setCurrentKey, setCurrent)
        provide(curValueKey, curValue)

        const roSelect = ref<HTMLDivElement | null>(null)
        onClickOutside(roSelect, () => {
            isListShow.value = false
        })

        return { curValue, curLabel, isListShow, roSelect }
    }
})
</script>

<style lang="scss" scoped></style>
