<template>
    <div class="w-full">
        <span
            class="w-full px-2 py-1 h-8 block cursor-pointer font-semibold text-base hover:backdrop-brightness-110"
            :class="{
                'text-muted-hover backdrop-brightness-110': curValue === value
            }"
            @click="setCurrent?.(value)"
            >{{ label }}</span
        >
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { pushOptionKey, setCurrentKey, curValueKey } from './types'

export default defineComponent({
    name: 'RoOption',
    props: {
        value: {
            type: [String, Number],
            required: true
        },
        label: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const pushOption = inject(pushOptionKey)
        const setCurrent = inject(setCurrentKey)
        const curValue = inject(curValueKey)

        pushOption?.({
            value: props.value,
            label: props.label
        })

        return { curValue, setCurrent }
    }
})
</script>
