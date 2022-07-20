<template>
    <div class="w-full">
        <span
            class="w-full block cursor-pointer"
            :class="[curValue === value ? 'bg-amber-400' : 'bg-amber-200']"
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
