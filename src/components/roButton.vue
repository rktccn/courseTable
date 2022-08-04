<template>
    <div>
        <button
            class="relative px-3 py-1 rounded-md outline duration-150 ease-in-out"
            :class="stateClass[type]"
            @click="toggleState"
            @mouseleave="resetState"
        >
            <span
                class="duration-150 ease-in-out"
                :class="[changeFlag ? 'opacity-0' : 'opacity-100']"
            >
                <slot></slot>
            </span>
            <span
                class="absolute top-0 left-0 h-full w-full flex items-center justify-center"
            >
                <svg-icon
                    :name="iconName[type]"
                    size="24"
                    class="duration-150 ease-in-out"
                    :class="[changeFlag ? 'opacity-100' : 'opacity-0']"
                ></svg-icon
            ></span>
        </button>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

import SvgIcon from './svg-icon.vue'

enum stateClass {
    default = 'bg-primary text-secondary outline-0 hover:bg-secondary hover:text-primary hover:outline-2',
    success = 'bg-success text-success outline-2',
    warning = 'bg-warning text-warning outline-2',
    danger = 'bg-danger text-danger outline-2'
}

enum iconName {
    default = 'check',
    success = 'check',
    warning = 'warning',
    danger = 'warning'
}

export default defineComponent({
    name: 'RoButton',
    props: {
        type: {
            type: String,
            default: 'default',
            validator(value: string) {
                return ['default', 'success', 'warning', 'danger'].includes(
                    value
                )
            }
        }
    },
    setup() {
        const data = reactive({
            changeFlag: 0
        })

        const toggleState = () => {
            data.changeFlag = 1
        }

        let flag = 1
        const resetState = () => {
            if (flag) {
                flag = 0
                setTimeout(() => {
                    data.changeFlag = 0
                    flag = 1
                }, 1500)
            }
        }

        return {
            ...toRefs(data),
            resetState,
            toggleState,
            stateClass,
            iconName
        }
    },
    components: {
        SvgIcon
    }
})
</script>
<style lang="scss" scoped></style>
