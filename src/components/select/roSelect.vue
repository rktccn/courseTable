<template>
    <div class="relative select-none" ref="roSelect">
        <header
            class="cursor-pointer flex justify-between items-center h-7 w-52 px-2 outline outline-2 rounded-md bg-base duration-150 ease-in-out"
            :class="isListShow ? 'text-muted-hover' : 'text-primary'"
            @click="toggleListShow"
        >
            <span
                v-if="curLabel === ''"
                class="placeholder text-sm opacity-60 grow overflow-hidden truncate"
                >{{ $t('base.selecter.placeHolder') }}</span
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

        <transition :name="optionListPos ? 'drop-t' : 'drop-b'">
            <div
                v-show="isListShow"
                class="option-list z-10 absolute left-0 w-full py-1 bg-off-base shadow-md rounded-md overflow-hidden"
                ref="optionList"
                :class="[optionListPos ? 'bottom-full mb-1' : 'top-full mt-1']"
            >
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import { onClickOutside, useElementBounding, useWindowSize } from '@vueuse/core'

import {
    Option,
    pushOption,
    pushOptionKey,
    setCurrentKey,
    curValueKey
} from './types'

const OPTION_HEIGHT = 32

export default defineComponent({
    name: 'RoSelect',
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        value: {
            type: [String, Number],
            required: false
        }
    },
    emits: ['update:value'],
    setup(props, context) {
        const optionList = ref<HTMLDivElement | null>(null)
        const options = ref<Option[]>([])
        const curValue = ref<String | number>('')
        const curLabel = ref<string>('')
        const isListShow = ref<boolean>(false)
        const optionListPos = ref<boolean>(false) // 列表显示位置 true: 在上方, false: 在下方

        const pushOption: pushOption = ({ label, value }) => {
            options.value.push({ label, value })

            if (props.value === value) {
                curValue.value = value
                curLabel.value = label
            }
        }

        const setCurrent = (value: string | number) => {
            curValue.value = value
            curLabel.value =
                options.value.find(item => item.value === value)?.label ?? ''

            isListShow.value = false
            context.emit('update:value', value)
        }

        const toggleListShow = () => {
            isListShow.value = !isListShow.value
            const { bottom } = useElementBounding(roSelect)
            const { height } = useWindowSize()

            let offset =
                (optionList.value?.children.length ?? 0) * OPTION_HEIGHT +
                bottom.value -
                height.value

            optionListPos.value = offset > -OPTION_HEIGHT
        }

        provide(pushOptionKey, pushOption)
        provide(setCurrentKey, setCurrent)
        provide(curValueKey, curValue)

        const roSelect = ref<HTMLDivElement | null>(null)
        onClickOutside(roSelect, () => {
            isListShow.value = false
        })

        return {
            curValue,
            curLabel,
            optionListPos,
            isListShow,
            toggleListShow,
            roSelect,
            optionList
        }
    }
})
</script>

<style lang="scss" scoped></style>
