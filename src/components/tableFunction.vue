<template>
    <div class="text-right">
        <!-- <span class="relative mr-3">
            <button
                class="relative p-6 rounded-full inline-block leading-none bg-secondary hover:brightness-110"
                @click="loadFile"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="4"
                    stroke="currentColor"
                    class="h-6 w-6 absolute font-bold text-3xl text-primary add-course ease-out duration-150"
                    style="transform: translate(-50%, -50%)"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                </svg>
            </button>
        </span> -->

        <!-- 读取文件 -->
        <!-- <transition name="drop-b">
            <LoadFile></LoadFile>
        </transition> -->

        <span class="relative mr-3">
            <button
                class="relative p-6 rounded-full inline-block leading-none bg-secondary hover:brightness-110"
                @click="modelName = 'EditCourse'"
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

        <transition name="drop-b" mode="out-in">
            <div
                class="model z-20 text-left backdrop-blur-md backdrop-brightness-75"
                v-if="modelName !== null"
                @click.self="modelName = null"
            >
                <component
                    :is="modelName"
                    :closeFN="closeModel"
                    class="model__box"
                />
            </div>
        </transition>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import EditCourse from './editCourse.vue'
import LoadFile from './loadFile.vue'

export default defineComponent({
    name: 'TableFunction',

    setup(props, context) {
        const data = reactive({
            showEditCourse: false,
            cursorPosition: { x: 0, y: 0 },
            modelName: null as null | string
        })

        const loadFile = () => {
            data.modelName = 'LoadFile'
        }

        const closeModel = () => {
            data.modelName = null
        }

        return { ...toRefs(data), loadFile, closeModel }
    },
    components: { EditCourse, LoadFile }
})
</script>

<style lang="scss" scoped>
.add-course,
.setting {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45derg);
}

.model {
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: calc(100vh + 10px);

    &__box {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
