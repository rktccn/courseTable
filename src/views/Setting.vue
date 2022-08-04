<template>
    <div class="max-w-3xl px-12 pt-8 mx-auto text-base">
        <button class="outlined">
            <router-link to="Home"> 返回 </router-link>
        </button>

        <h3 class="font-semibold text-4xl">
            {{ $t('setting.title') }}
        </h3>

        <article class="p-5 my-5 rounded-xl shadow-xl bg-off-base">
            <header>
                <h6 class="text-xl">{{ $t('setting.base.title') }}</h6>
            </header>
            <div class="flex flex-col">
                <section class="mt-2 flex justify-between items-center">
                    <span class=""> {{ $t('setting.base.color') }} </span>
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
                </section>

                <section class="mt-2 flex justify-between items-center">
                    <span class="float-left">
                        {{ $t('setting.base.lang') }}
                    </span>
                    <RoSelect class="float-left">
                        <RoOption
                            v-for="item in languageOptionList"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        ></RoOption>
                    </RoSelect>
                </section>

                <!-- <section class="mt-2 flex justify-between items-center">
                    <span> 地区 </span>
                    <RoSelect class="float-left">
                        <RoOption
                            v-for="item in regionList"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        ></RoOption>
                    </RoSelect>
                </section> -->
            </div>
        </article>

        <article class="p-5 my-5 rounded-xl shadow-xl bg-off-base">
            <header>
                <h6 class="text-xl">{{ $t('setting.table.title') }}</h6>
            </header>
            <div class="flex flex-col">
                <section class="mt-2 flex justify-between items-center">
                    <span class=""> {{ $t('setting.table.startTime') }} </span>
                    <input
                        class="h-7 px-2 outline outline-2 bg-base rounded-md text-primary font-semibold"
                        type="date"
                        name=""
                        id=""
                        v-model="firstWeekTime"
                    />
                </section>

                <section class="mt-2 flex justify-between items-center">
                    <span class=""> {{ $t('setting.table.weekLength') }} </span>
                    <input
                        class="h-7 px-2 w-10 outline outline-2 bg-base rounded-md text-center text-primary font-semibold"
                        type="number"
                        name=""
                        id=""
                        v-model="totalWeeks"
                    />
                </section>

                <section class="mt-2 flex justify-between items-center">
                    <span class="mb-2">
                        {{ $t('setting.table.section') }}
                        <p class="text-xs text-muted opacity-80">
                            {{ $t('setting.table.sectionTip') }}
                        </p>
                    </span>
                    <div class="flex">
                        <span class="mr-3 flex flex-col items-center">
                            <input
                                class="w-7 h-7 px-1 outline outline-2 bg-base rounded-md text-center text-primary font-semibold"
                                type="number"
                                name=""
                                id=""
                                v-model="sections[0]"
                            />
                            <p class="mt-1 text-xs opacity-70">
                                {{ $t('setting.table.sectionMor') }}
                            </p>
                        </span>
                        <span class="flex flex-col items-center">
                            <input
                                class="w-7 h-7 px-1 outline outline-2 bg-base rounded-md text-center text-primary font-semibold"
                                type="number"
                                name=""
                                id=""
                                v-model="sections[1]"
                            />
                            <p class="mt-1 text-xs opacity-70">
                                {{ $t('setting.table.sectionAft') }}
                            </p>
                        </span>
                    </div>
                </section>

                <section class="mt-2 flex justify-between items-center">
                    <span class="">
                        {{ $t('setting.table.sectionTime') }}
                    </span>
                    <button
                        class="px-3 py-1 rounded-md outline outline-0 duration-150 ease-in-out bg-primary text-secondary hover:bg-base hover:text-primary hover:outline-2"
                        @click="isTimeShow = true"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </button>
                </section>
            </div>
        </article>

        <article>
            <section class="control float-right flex mt-4 font-semibold">
                <button
                    class="control__item px-3 py-1 rounded-md outline outline-0 duration-150 ease-in-out text-base hover:text-base hover:outline-2"
                    @click="cancel"
                >
                    {{ $t('cancel') }}
                </button>
                <RoButton class="control__item  ml-8" type="default" @click="submit">
                    {{ $t('confirm') }}
                </RoButton>
                <!-- <button
                    class="control__item px-3 py-1 ml-8 rounded-md outline outline-0 duration-150 ease-in-out bg-primary text-secondary hover:bg-secondary hover:text-primary hover:outline-2"
                ></button> -->
            </section>
        </article>

        <transition name="drop-b">
            <EditTime
                v-if="isTimeShow"
                v-model:isShow="isTimeShow"
                class="edit-time fixed"
            ></EditTime>
        </transition>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { themeKey } from '@/types/course'
import { onClickOutside } from '@vueuse/core'

import RoSelect from '@/components/select/roSelect.vue'
import RoOption from '@/components/select/roOption.vue'
import EditTime from '@/components/editTime.vue'
import { useCourseStore } from '@/store/course'
import RoButton from '@/components/roButton.vue'

export default defineComponent({
    name: 'Setting',
    setup() {
        const courseStore = useCourseStore()

        const languageOptionList = [
            {
                value: 'zh-CN',
                label: '中文'
            }
            // {
            //     value: 'en-US',
            //     label: '英文'
            // }
        ]

        const regionList = [
            {
                value: '+8',
                label: '中国，北京'
            }
        ]

        const data = reactive({
            isThemeShow: false,
            isTimeShow: false,
            firstWeekTime: '',
            totalWeeks: '',
            sections: [0, 0, 0]
        })

        const initData = () => {
            data.firstWeekTime = courseStore.firstWeekDate

            data.totalWeeks = courseStore.totalWeeks
            data.sections[0] = courseStore._getCourseSection[0]
            data.sections[1] = courseStore._getCourseSection[1]
            data.sections[2] = courseStore._getCourseSection[2]
        }

        const colorList = ref<HTMLDivElement | null>(null)
        onClickOutside(colorList, () => {
            data.isThemeShow = false
        })

        const toggleTheme = (val: string) => {
            document.documentElement.classList.value = `theme-${val}`
        }

        initData()

        const cancel = () => {
            initData()
        }

        const submit = () => {
            courseStore.setStartDate(data.firstWeekTime)
            courseStore.setCourseSection(data.sections)
            courseStore.setTotalWeeks(data.totalWeeks)
        }

        return {
            ...toRefs(data),
            languageOptionList,
            regionList,
            themeKey,
            colorList,
            toggleTheme,
            cancel,
            submit
        }
    },
    components: {
        RoSelect,
        RoOption,
        EditTime,
        RoButton
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

.edit-time {
    top: 0;
    left: 0;
}
</style>
