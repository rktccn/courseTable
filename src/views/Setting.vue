<template>
    <div class="max-w-3xl px-12 pt-8 mx-auto text-base">
        <button class="outlined">
            <router-link to="Home"> 返回 </router-link>
        </button>

        <h3 class="font-semibold text-4xl">设置</h3>

        <section class="p-5 my-5 rounded-xl shadow-xl bg-off-base">
            <header>
                <h6 class="text-xl">基础设置</h6>
            </header>
            <div class="flex flex-col">
                <div class="mt-2 flex justify-between items-center">
                    <span class=""> 颜色 </span>
                    <div class="relative" ref="colorList">
                        <button
                            class="h-5 rounded outline outline-2 text-primary bg-off-bases aspect-square block"
                            @click.self="isThemeShow = !isThemeShow"
                        ></button>

                        <transition name="drop-b">
                            <div
                                v-if="isThemeShow"
                                class="color-list z-10 absolute mt-1 px-3 py-2 bg-off-base shadow-md rounded-md"
                            >
                                <button
                                    v-for="item in themeKey"
                                    :class="`theme-${item}`"
                                    class="h-5 rounded outline outline-2 text-primary bg-off-base aspect-square block hover:brightness-110"
                                    @click="toggleTheme(item)"
                                ></button>
                            </div>
                        </transition>
                    </div>
                </div>
                <div class="mt-2 flex justify-between items-center">
                    <span class="float-left"> 语言 </span>
                    <RoSelect class="float-left">
                        <RoOption
                            v-for="item in languageOptionList"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        ></RoOption>
                    </RoSelect>
                </div>
                <div class="mt-2"><span> 地区 </span></div>
            </div>
        </section>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { themeKey } from '@/types/course'
import { onClickOutside } from '@vueuse/core'

import RoSelect from '@/components/select/roSelect.vue'
import RoOption from '@/components/select/roOption.vue'

export default defineComponent({
    name: 'Setting',
    setup() {
        const languageOptionList = [
            {
                value: 'zh-CN',
                label: '中文'
            },
            {
                value: 'en-US',
                label: '英文'
            }
        ]

        const data = reactive({
            isThemeShow: false
        })

        const colorList = ref<HTMLDivElement | null>(null)
        onClickOutside(colorList, () => {
            data.isThemeShow = false
        })

        const toggleTheme = (val: string) => {
            document.documentElement.classList.value = `theme-${val}`
        }

        return {
            ...toRefs(data),
            languageOptionList,
            themeKey,
            colorList,
            toggleTheme
        }
    },
    components: {
        RoSelect,
        RoOption
    }
})
</script>

<style lang="scss" scoped>
.color-list {
    top: 100%;
    right: 0;

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 8px;
    justify-content: center;
    align-items: center;
}
</style>
