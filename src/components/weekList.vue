<template>
    <div class="w-full" @scroll="scrollList">
        <div
            class="week flex justify-between pt-1 items-center snap-proximity snap-x overflow-scroll scroll-smooth"
            id="weekList"
        >
            <div
                class="flex flex-col px-4 snap-start"
                v-for="week in totalWeeks"
                :key="week"
                :class="{
                    grayscale: week < currentWeek,
                    ' brightness-90': week > currentWeek
                }"
                @click="setToCenter(week)"
            >
                <div
                    class="relative bg-secondary rounded-full p-6 outline outline-2 duration-150 ease-in-out hover:brightness-110 hover:cursor-pointer text-primary"
                    :class="[
                        selectedWeek === week ? '' : 'outline-transparent'
                    ]"
                >
                    <span class="week-info flex flex-col items-center absolute">
                        <p class="font-semibold brightness-70">
                            {{ week }}
                        </p>
                        <p class="text-xs leading-3">
                            {{ $t(`base.week`) }}
                        </p>
                    </span>
                </div>

                <ul class="day-list flex justify-between w-full mt-1">
                    <li
                        class="rounded-full"
                        v-for="(hasCourse, index) in getDaysHasCourse(week)"
                        :key="index"
                        :class="[hasCourse ? 'bg-primary' : 'bg-secondary']"
                    ></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useAppStore } from '@/store/app'
import { useCourseStore } from '@/store/course'
import { storeToRefs } from 'pinia'

export default defineComponent({
    name: 'WeekTable',
    setup() {
        const appStore = useAppStore()
        const courseStore = useCourseStore()
        let EList: Element | null = null

        let currentWeek = computed<number>(() => {
            return courseStore.getWeekAndDay(new Date())[0]
        })

        let selectedWeek = computed<number>({
            get: (): number => {
                return appStore.currentWeek
            },
            set: (value: number) => {
                appStore.setCurrentWeek(value)
            }
        })

        selectedWeek.value = currentWeek.value
        const getDaysHasCourse: (week: any) => Boolean[] =
            courseStore.getDaysHasCourse

        const { totalWeeks } = storeToRefs(courseStore)

        const setToCenter = (index: number) => {
            let el = EList?.children[index - 1]

            if (!el) return
            selectedWeek.value = index

            el.scrollIntoView({
                behavior: 'smooth',
                inline: 'center'
            })
        }

        const scrollList = (e: any) => {
            e.preventDefault()
        }

        onMounted(() => {
            EList = document.querySelector('#weekList')
        })

        return {
            currentWeek,
            selectedWeek,
            totalWeeks,
            setToCenter,
            scrollList,
            getDaysHasCourse
        }
    }
})
</script>

<style lang="scss" scoped>
.week {
    width: 100%;
    height: 100%;

    -webkit-overflow-scrolling: touch;
    user-select: none;

    &::-webkit-scrollbar {
        display: none;
    }

    &-info {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

.day-list {
    li {
        padding: 3px;
    }
}
</style>
