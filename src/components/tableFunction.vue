<template>
    <div class="text-right">
        <span class="relative mr-3" ref="addCourse">
            <button
                class="relative p-6 rounded-full inline-block leading-none bg-secondary hover:brightness-110"
                @click="showEditCourse = !showEditCourse"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 absolute font-bold text-3xl text-primary add-course ease-out duration-150"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="5"
                    :style="{
                        transform: showEditCourse
                            ? 'translate(-50%,-50%) rotate(45deg)'
                            : 'translate(-50%,-50%)'
                    }"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4v16m8-8H4"
                    />
                </svg>
            </button>
            <transition name="drop-b">
                <EditCourse
                    v-if="showEditCourse"
                    v-model:isShow="showEditCourse"
                ></EditCourse>
            </transition>
        </span>
        <router-link to="Setting">
            <button
                class="relative p-6 rounded-full inline-block leading-none bg-secondary hover:brightness-110"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-7 w-7 absolute font-bold text-3xl text-primary setting"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    :style="{
                        transform: 'translate(-50%,-50%)'
                    }"
                >
                    <path
                        fill-rule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </router-link>
    </div>
</template>
<script lang="ts">
import { onClickOutside } from '@vueuse/core'
import { defineComponent, reactive, ref, toRefs } from 'vue'

import EditCourse from './editCourse.vue'

export default defineComponent({
    name: 'TableFunction',

    setup(props, context) {
        const data = reactive({
            showEditCourse: false,
            cursorPosition: { x: 0, y: 0 }
        })

        const addCourse = ref<HTMLDivElement | null>(null)
        onClickOutside(addCourse, () => {
            data.showEditCourse = false
        })

        return { ...toRefs(data), addCourse }
    },
    components: { EditCourse }
})
</script>

<style lang="scss" scoped>
.add-course,
.setting {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45derg);
}
</style>
