<template>
    <div class="max-w-3xl px-12 pt-8 mx-auto">
        <button class="outlined">
            <router-link to="Home"> 返回 </router-link>
        </button>

        <h3 class="font-semibold text-4xl">设置</h3>

        <section class="p-5 my-5 rounded-xl shadow-xl bg-white">
            <header>
                <h6 class="text-xl">基础设置</h6>
            </header>
            <div class="flex flex-col">
                <div class="mt-2 flex justify-between items-center">
                    <span> 颜色 </span>
                    <span
                        class="h-5 rounded bg-amber-400 aspect-square block cursor-pointer"
                    ></span>
                </div>
                <div class="mt-2 flex justify-between items-center">
                    <span class="float-left"> 语言 </span>
                    <RoSelect class="float-left">
                        <RoOption
                            v-for="(item, index) in languageOptionList"
                            :value="item.value"
                            :label="item.label"
                        ></RoOption>
                    </RoSelect>
                    <!-- <select name="" id="">
                        <option value=""></option>
                    </select> -->
                </div>
                <div class="mt-2"><span> 地区 </span></div>
            </div>
        </section>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'

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

        onMounted(() => {
            document.body.classList.add('bg-zinc-100')
        })

        onUnmounted(() => {
            document.body.classList.remove('bg-zinc-100')
        })

        return { languageOptionList }
    },
    components: {
        RoSelect,
        RoOption
    }
})
</script>

<style lang="scss" scoped></style>
